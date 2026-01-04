import { execSync } from "node:child_process";
import {
  writeFileSync,
  readdirSync,
  statSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { join, relative } from "node:path";

function getBaseUrl(): string {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const config = {
  baseUrl: getBaseUrl(),
  contentDir: process.env.CONTENT_DIR ?? "./content/docs",
  outputDir: process.env.OUTPUT_DIR ?? "./public",
  robots: {
    allowIndexing: process.env.ROBOTS_ALLOW_INDEXING !== "false",
    disallowPaths: (process.env.ROBOTS_DISALLOW_PATHS || "/api/,/_next/")
      .split(",")
      .map((p) => p.trim()),
  },
  sitemap: {
    defaultChangeFreq: process.env.SITEMAP_DEFAULT_CHANGEFREQ || "weekly",
    defaultPriority: parseFloat(process.env.SITEMAP_DEFAULT_PRIORITY || "0.8"),
  },
  // Additional static routes to include
  staticRoutes: [
    { path: "/", changeFreq: "monthly", priority: 1.0 },
    { path: "/docs", changeFreq: "weekly", priority: 0.9 },
  ],
};

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

function getGitLastModified(filePath: string): string {
  try {
    const timestamp = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
    return timestamp ?? new Date().toISOString();
  } catch {
    // Fallback to file mtime if git fails (e.g., new uncommitted file)
    try {
      return statSync(filePath).mtime.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }
}

function getContentFiles(dir: string, files: string[] = []): string[] {
  if (!existsSync(dir)) {
    console.warn(`⚠️  Content directory not found: ${dir}`);
    return files;
  }

  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      getContentFiles(fullPath, files);
    } else if (/\.(mdx?|md)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function filePathToSlug(filePath: string): string | null {
  const relativePath = relative(config.contentDir, filePath);
  const slug = relativePath.replace(/\.(mdx?|md)$/, "").replace(/\\+/g, "/"); // Windows compatibility

  // Skip index files - they're covered by their parent directory
  if (slug === "index" || slug.endsWith("/index")) {
    return null;
  }

  return slug;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ─────────────────────────────────────────────────────────────
// Generators
// ─────────────────────────────────────────────────────────────

function generateSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateRobotsTxt(): string {
  const { allowIndexing, disallowPaths } = config.robots;

  if (!allowIndexing) {
    // Block all indexing (useful for staging/preview)
    return `# Indexing disabled via ROBOTS_ALLOW_INDEXING=false
User-agent: *
Disallow: /
`;
  }

  const disallowRules = disallowPaths
    .filter(Boolean)
    .map((path) => `Disallow: ${path}`)
    .join("\n");

  return `User-agent: *
Allow: /
${disallowRules}

# Sitemaps
Sitemap: ${config.baseUrl}/sitemap.xml
`;
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 SEO Files Generator\n");
  console.log(`   Base URL:    ${config.baseUrl}`);
  console.log(`   Content:     ${config.contentDir}`);
  console.log(`   Output:      ${config.outputDir}`);
  console.log(
    `   Indexing:    ${config.robots.allowIndexing ? "enabled" : "DISABLED"}\n`,
  );

  // Ensure output directory exists
  if (!existsSync(config.outputDir)) {
    mkdirSync(config.outputDir, { recursive: true });
  }

  // Collect sitemap entries
  const entries: SitemapEntry[] = [];

  // Add static routes
  for (const route of config.staticRoutes) {
    entries.push({
      url: `${config.baseUrl}${route.path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: route.changeFreq,
      priority: route.priority,
    });
  }

  // Add content pages
  console.log("🔍 Scanning content files...");
  const files = getContentFiles(config.contentDir);
  console.log(`   Found ${files.length} content files`);

  if (files.length > 0) {
    console.log("📅 Extracting git timestamps...");
    for (const file of files) {
      const slug = filePathToSlug(file);

      // Skip index files (already covered by static routes or parent paths)
      if (slug === null) continue;

      entries.push({
        url: `${config.baseUrl}/docs/${slug}`,
        lastModified: getGitLastModified(file),
        changeFrequency: config.sitemap.defaultChangeFreq,
        priority: config.sitemap.defaultPriority,
      });
    }
  }
  // Generate sitemap.xml
  console.log("\n📝 Generating sitemap.xml...");
  const sitemapPath = join(config.outputDir, "sitemap.xml");
  writeFileSync(sitemapPath, generateSitemapXml(entries));
  console.log(`   Written: ${sitemapPath} (${entries.length} URLs)`);

  // Generate robots.txt
  console.log("\n🤖 Generating robots.txt...");
  const robotsPath = join(config.outputDir, "robots.txt");
  writeFileSync(robotsPath, generateRobotsTxt());
  console.log(`   Written: ${robotsPath}`);

  console.log("\n✅ SEO files generated successfully!");
}

main().catch((error) => {
  console.error("❌ Failed to generate SEO files:", error);
  process.exit(1);
});
