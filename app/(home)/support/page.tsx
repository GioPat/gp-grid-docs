import type { Metadata } from "next";
import Image from "next/image";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Support gp-grid",
  description:
    "Support the development of gp-grid through donations and contributions.",
};

const BITCOIN_ADDRESS = "bc1qcukwmzver59eyqq442xyzscmxavqjt568kkc9m";
const LIGHTNING_ADDRESS =
  "lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhhx6rpvanhjetdvfjhyvf4xs0xu5p7";

export default function SupportPage() {
  return (
    <main className="flex flex-col flex-1 items-center px-4 py-16 md:py-24">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-center">
          Support gp-grid
        </h1>
        <p className="text-lg text-fd-muted-foreground mb-12 text-center">
          gp-grid is maintained as a passion project alongside full-time
          employment. Your support helps keep the project alive and growing.
        </p>

        <div className="space-y-8">
          <section className="p-6 rounded-lg border border-fd-border bg-fd-card">
            <h2 className="text-2xl font-semibold mb-4">Donations</h2>
            <p className="text-fd-muted-foreground mb-6">
              If you find gp-grid useful in your projects, consider supporting
              its development through one of the following methods:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-fd-border">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/paypal.svg"
                    alt="PayPal"
                    width={100}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <span className="font-medium">PayPal</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.paypal.com/donate/?hosted_button_id=XCNMG6BR4ZMLY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-2 rounded bg-fd-background text-xs break-all text-fd-primary hover:underline"
                  >
                    https://www.paypal.com/donate/?hosted_button_id=XCNMG6BR4ZMLY
                  </a>
                  <CopyButton text="https://www.paypal.com/donate/?hosted_button_id=XCNMG6BR4ZMLY" />
                </div>
                <div className="flex justify-center mt-3">
                  <a
                    href="https://www.paypal.com/donate/?hosted_button_id=XCNMG6BR4ZMLY"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/images/donazione_paypal.png"
                      alt="PayPal donation QR code"
                      width={180}
                      height={180}
                      className="rounded-lg"
                    />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-fd-border">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/bitcoin.svg"
                    alt="Bitcoin"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <span className="font-medium">Bitcoin</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 rounded bg-fd-background text-xs break-all">
                    {BITCOIN_ADDRESS}
                  </code>
                  <CopyButton text={BITCOIN_ADDRESS} />
                </div>
                <div className="flex justify-center mt-3">
                  <Image
                    src="/images/bc1qcukwmzver59eyqq442xyzscmxavqjt568kkc9m.png"
                    alt="Bitcoin donation QR code"
                    width={180}
                    height={180}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg border border-fd-border">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/lightning-network.svg"
                    alt="Lightning Network"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <span className="font-medium">Lightning Network</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 rounded bg-fd-background text-xs break-all">
                    {LIGHTNING_ADDRESS}
                  </code>
                  <CopyButton text={LIGHTNING_ADDRESS} />
                </div>
                <div className="flex justify-center mt-3">
                  <Image
                    src="/images/lightning.png"
                    alt="Lightning Network donation QR code"
                    width={180}
                    height={180}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-lg border border-fd-border bg-fd-card">
            <h2 className="text-2xl font-semibold mb-4">Other Ways to Help</h2>
            <ul className="space-y-3 text-fd-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-fd-primary">*</span>
                <span>
                  Star the{" "}
                  <a
                    href="https://github.com/GioPat/gp-grid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fd-primary hover:underline"
                  >
                    GitHub repository
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-fd-primary">*</span>
                <span>Report bugs and suggest features via GitHub Issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-fd-primary">*</span>
                <span>Contribute code or documentation improvements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-fd-primary">*</span>
                <span>Share gp-grid with others who might find it useful</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
