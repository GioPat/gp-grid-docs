export interface ScrollBenchmarkRow {
  grid: string;
  avgFps: number;
  minFps: number;
  frameDrops: number;
  p95Fps: number;
}

export interface RenderBenchmarkRow {
  grid: string;
  firstPaint: string;
  fullRender: string;
  lcp: string;
  tbt: string;
}

export interface SortFilterBenchmarkRow {
  grid: string;
  sortAsc: string;
  sortDesc: string;
  textFilter: string;
  numberFilter: string;
}

export interface MemoryBenchmarkRow {
  grid: string;
  afterLoad: string;
  peak: string;
  growth: number;
  retained: string;
}

// Scroll Performance Data
export const scrollPerformance10k: ScrollBenchmarkRow[] = [
  { grid: "ag-grid", avgFps: 87.08265322258761, minFps: 58.479532163623254, frameDrops: 0, p95Fps: 78.37438790032886 },
  { grid: "gp-grid", avgFps: 73.39931365677035, minFps: 55.24861875723972, frameDrops: 0, p95Fps: 66.05938229109331 },
  { grid: "handsontable", avgFps: 285.7, minFps: 60, frameDrops: 0, p95Fps: 60 },
  { grid: "tanstack-table", avgFps: 80.05803776116485, minFps: 57.47126436658565, frameDrops: 0, p95Fps: 72.05223398504837 },
];

export const scrollPerformance100k: ScrollBenchmarkRow[] = [
  { grid: "ag-grid", avgFps: 87.02196708852313, minFps: 58.13953488368158, frameDrops: 0, p95Fps: 78.31977037967081 },
  { grid: "gp-grid", avgFps: 80.08334497124598, minFps: 58.139534873647136, frameDrops: 0, p95Fps: 72.07501047412138 },
  { grid: "handsontable", avgFps: 333.1, minFps: 60, frameDrops: 0, p95Fps: 60 },
  { grid: "tanstack-table", avgFps: 73.51809587801158, minFps: 57.142857142857146, frameDrops: 0, p95Fps: 66.16628629021042 },
];

export const scrollPerformance1m: ScrollBenchmarkRow[] = [
  { grid: "ag-grid", avgFps: 60.12655564823211, minFps: 58.8235294117647, frameDrops: 0, p95Fps: 54.1139000834089 },
  { grid: "gp-grid", avgFps: 71.38808826388417, minFps: 54.644808752068535, frameDrops: 0, p95Fps: 64.24927943749576 },
  { grid: "handsontable", avgFps: 70.48941461287924, minFps: 56.497175140648395, frameDrops: 0, p95Fps: 63.44047315159132 },
  { grid: "tanstack-table", avgFps: 87.05713617634078, minFps: 57.80346820560307, frameDrops: 0, p95Fps: 78.3514225587067 },
];

// Initial Render Data
export const renderPerformance10k: RenderBenchmarkRow[] = [
  { grid: "ag-grid", firstPaint: "512ms", fullRender: "369ms", lcp: "512ms", tbt: "165ms" },
  { grid: "gp-grid", firstPaint: "208ms", fullRender: "113ms", lcp: "248ms", tbt: "0ms" },
  { grid: "handsontable", firstPaint: "400ms", fullRender: "300ms", lcp: "400ms", tbt: "42ms" },
  { grid: "tanstack-table", firstPaint: "184ms", fullRender: "343ms", lcp: "356ms", tbt: "69ms" },
];

export const renderPerformance100k: RenderBenchmarkRow[] = [
  { grid: "ag-grid", firstPaint: "664ms", fullRender: "600ms", lcp: "664ms", tbt: "371ms" },
  { grid: "gp-grid", firstPaint: "92ms", fullRender: "270ms", lcp: "312ms", tbt: "111ms" },
  { grid: "handsontable", firstPaint: "192ms", fullRender: "452ms", lcp: "192ms", tbt: "175ms" },
  { grid: "tanstack-table", firstPaint: "76ms", fullRender: "678ms", lcp: "612ms", tbt: "410ms" },
];

export const renderPerformance1m: RenderBenchmarkRow[] = [
  { grid: "ag-grid", firstPaint: "3220ms", fullRender: "3161ms", lcp: "3220ms", tbt: "2928ms" },
  { grid: "gp-grid", firstPaint: "100ms", fullRender: "1718ms", lcp: "1764ms", tbt: "1511ms" },
  { grid: "handsontable", firstPaint: "188ms", fullRender: "1897ms", lcp: "188ms", tbt: "1633ms" },
  { grid: "tanstack-table", firstPaint: "76ms", fullRender: "5111ms", lcp: "5040ms", tbt: "4839ms" },
];

// Sort/Filter Performance Data
export const sortFilterPerformance10k: SortFilterBenchmarkRow[] = [
  { grid: "ag-grid", sortAsc: "250ms", sortDesc: "277ms", textFilter: "119ms", numberFilter: "188ms" },
  { grid: "gp-grid", sortAsc: "115ms", sortDesc: "98ms", textFilter: "85ms", numberFilter: "93ms" },
  { grid: "handsontable", sortAsc: "109ms", sortDesc: "90ms", textFilter: "113ms", numberFilter: "92ms" },
  { grid: "tanstack-table", sortAsc: "142ms", sortDesc: "134ms", textFilter: "93ms", numberFilter: "74ms" },
];

export const sortFilterPerformance100k: SortFilterBenchmarkRow[] = [
  { grid: "ag-grid", sortAsc: "449ms", sortDesc: "318ms", textFilter: "159ms", numberFilter: "168ms" },
  { grid: "gp-grid", sortAsc: "231ms", sortDesc: "209ms", textFilter: "96ms", numberFilter: "90ms" },
  { grid: "handsontable", sortAsc: "163ms", sortDesc: "162ms", textFilter: "352ms", numberFilter: "209ms" },
  { grid: "tanstack-table", sortAsc: "341ms", sortDesc: "332ms", textFilter: "142ms", numberFilter: "72ms" },
];

export const sortFilterPerformance1m: SortFilterBenchmarkRow[] = [
  { grid: "ag-grid", sortAsc: "1940ms", sortDesc: "1829ms", textFilter: "384ms", numberFilter: "351ms" },
  { grid: "gp-grid", sortAsc: "690ms", sortDesc: "703ms", textFilter: "197ms", numberFilter: "178ms" },
  { grid: "handsontable", sortAsc: "1222ms", sortDesc: "1120ms", textFilter: "3024ms", numberFilter: "1529ms" },
  { grid: "tanstack-table", sortAsc: "2759ms", sortDesc: "3915ms", textFilter: "484ms", numberFilter: "192ms" },
];

// Memory Usage Data
export const memoryUsage10k: MemoryBenchmarkRow[] = [
  { grid: "ag-grid", afterLoad: "18.37MB", peak: "99.82MB", growth: 1.241, retained: "2.57MB" },
  { grid: "gp-grid", afterLoad: "7.52MB", peak: "39.17MB", growth: 0.418, retained: "1.75MB" },
  { grid: "handsontable", afterLoad: "9.3MB", peak: "14.91MB", growth: 0.409, retained: "2.02MB" },
  { grid: "tanstack-table", afterLoad: "35.44MB", peak: "143.43MB", growth: 3.314, retained: "1.8MB" },
];

export const memoryUsage100k: MemoryBenchmarkRow[] = [
  { grid: "ag-grid", afterLoad: "57.77MB", peak: "201.16MB", growth: 0.518, retained: "2.76MB" },
  { grid: "gp-grid", afterLoad: "30.44MB", peak: "71.43MB", growth: 0.271, retained: "1.79MB" },
  { grid: "handsontable", afterLoad: "37.41MB", peak: "43.62MB", growth: 0.322, retained: "2.28MB" },
  { grid: "tanstack-table", afterLoad: "295.41MB", peak: "397.84MB", growth: 2.931, retained: "289.67MB" },
];

export const memoryUsage1m: MemoryBenchmarkRow[] = [
  { grid: "ag-grid", afterLoad: "451.81MB", peak: "642.09MB", growth: 0.446, retained: "2.81MB" },
  { grid: "gp-grid", afterLoad: "257.07MB", peak: "315.76MB", growth: 0.254, retained: "1.8MB" },
  { grid: "handsontable", afterLoad: "316.21MB", peak: "324.41MB", growth: 0.311, retained: "2.29MB" },
  { grid: "tanstack-table", afterLoad: "2896.87MB", peak: "2996.4MB", growth: 2.895, retained: "1.81MB" },
];
