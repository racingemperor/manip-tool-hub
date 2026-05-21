import { realTools, type Tool, type ToolBenchmarkRow, type ToolCategory } from "./tools";

export type LeaderboardCategory = {
  name: ToolCategory;
  primary: string;
  note: string;
};

export type LeaderboardRow = {
  slug: string;
  name: string;
  category: ToolCategory;
  task: string;
  dataset: string;
  metric: string;
  scoreLabel: string;
  speed: string;
  size: string;
  artifacts: string[];
  rankOrder: number;
  completeness: number;
  speedRank: number;
  sizeRank: number;
  href: string;
};

export const leaderboardCategories: LeaderboardCategory[] = [
  {
    "name": "Perception and Grounding",
    "primary": "Task-specific perception metric",
    "note": "Detection, depth, segmentation, video masks, and spatial grounding are ranked only within their comparable task scope."
  },
  {
    "name": "Cognition and State Modeling",
    "primary": "State quality / reconstruction / memory metric",
    "note": "State tools use map quality, reconstruction quality, trajectory accuracy, memory retrieval, and relation modeling as primary evidence."
  },
  {
    "name": "Reasoning and Planning",
    "primary": "Task success / plan quality",
    "note": "Reasoning tools are compared by task success, plan quality, safety validation, and action-selection evidence."
  },
  {
    "name": "Execution and Control",
    "primary": "Success rate / control quality",
    "note": "Execution tools are compared by grasp success, trajectory feasibility, control stability, runtime, and monitoring quality."
  }
];

type LeaderboardRankConfig = {
  row: LeaderboardRow;
  hasNumericBenchmark: boolean;
  primaryScore: number;
  speedScore: number;
};

const higherIsBetterMetricPattern = /accuracy|acc|success|completion|score|ap\b|map|ar@|recall|r@|f1|j&f|delta|psnr|ssim|throughput|fps|faster|performance|overall|precision/i;
const lowerIsBetterMetricPattern = /rel\b|absrel|rmse|error|whdr|drift|ape|rpe|latency|runtime|time|cost|ms|microsecond|us|second|cm|m\b|mae|objective/i;
const benchmarkValuePattern = /[-+]?\d*\.?\d+(?:e[-+]?\d+)?/gi;

function numbersFrom(text: string) {
  return [...text.matchAll(benchmarkValuePattern)].map((match) => Number(match[0])).filter(Number.isFinite);
}

function hasNumber(text?: string) {
  return Boolean(text && benchmarkValuePattern.test(text));
}

function resetNumberPattern() {
  benchmarkValuePattern.lastIndex = 0;
}

function benchmarkQuality(row: ToolBenchmarkRow) {
  const text = `${row.metric} ${row.value}`;
  resetNumberPattern();
  const hasValue = hasNumber(row.value);
  resetNumberPattern();
  if (!hasValue) return -1;

  let quality = 0;
  if (higherIsBetterMetricPattern.test(text)) quality += 4;
  if (lowerIsBetterMetricPattern.test(text)) quality += 2;
  if (/dataset scale|coverage|demonstration count|training time|setup|annotation/i.test(text)) quality -= 3;
  if (/baseline|reflexxes|opt_control|tap-net|pips/i.test(text)) quality -= 6;
  if (/%|fps|ms|microsecond|us|cm|m\b|ap\b|map|ar@|r@|f1|j&f|delta|psnr|ssim|rel\b|rmse|whdr/i.test(text)) quality += 1;
  return quality;
}

function scoreDirection(row: ToolBenchmarkRow) {
  const text = `${row.metric} ${row.value}`;
  if (lowerIsBetterMetricPattern.test(text) && !higherIsBetterMetricPattern.test(text)) return "asc";
  return "desc";
}

function primaryScore(row?: ToolBenchmarkRow) {
  if (!row) return Number.NEGATIVE_INFINITY;
  resetNumberPattern();
  const numbers = numbersFrom(row.value.replace(/@[0-9]+/g, ""));
  if (!numbers.length) return Number.NEGATIVE_INFINITY;
  return scoreDirection(row) === "asc" ? -Math.min(...numbers) : Math.max(...numbers);
}

function speedScore(tool: Tool, row?: ToolBenchmarkRow) {
  const text = `${row?.runtime ?? ""} ${tool.benchmarkLatency ?? ""}`;
  const fps = [...text.matchAll(/(\d*\.?\d+)\s*fps/gi)].map((match) => Number(match[1]));
  if (fps.length) return Math.max(...fps);
  const milliseconds = [...text.matchAll(/(\d*\.?\d+)\s*ms/gi)].map((match) => Number(match[1]));
  if (milliseconds.length) return -Math.min(...milliseconds);
  const microseconds = [...text.matchAll(/(\d*\.?\d+)\s*(?:us|microseconds?)/gi)].map((match) => Number(match[1]) / 1000);
  if (microseconds.length) return -Math.min(...microseconds);
  const seconds = [...text.matchAll(/(\d*\.?\d+)\s*s(?:\/|ec|econd|\b)/gi)].map((match) => Number(match[1]) * 1000);
  if (seconds.length) return -Math.min(...seconds);
  return Number.NEGATIVE_INFINITY;
}

function benchmarkRowFor(tool: Tool): ToolBenchmarkRow | undefined {
  if (!tool.benchmarkRows?.length) return undefined;
  return [...tool.benchmarkRows].sort((a, b) => {
    return benchmarkQuality(b) - benchmarkQuality(a) || primaryScore(b) - primaryScore(a);
  })[0];
}

function inferScoreLabel(row?: ToolBenchmarkRow) {
  if (!row) return "No numeric benchmark";
  resetNumberPattern();
  const match = row.value.replace(/@[0-9]+/g, "").match(benchmarkValuePattern)?.[0];
  resetNumberPattern();
  if (!match) return "No numeric benchmark";
  const metricToken = row.metric.match(/(accuracy|acc|success|completion|score|ap|mAP|AR@\d+|R@\d+|F1@\d+|F1|J&F|delta\d?|PSNR|SSIM|AbsRel|REL|RMSE|WHDR|drift|APE|runtime|time|FPS|ms|us)/i)?.[0];
  return metricToken ? `${match} ${metricToken}` : match;
}

function inferArtifacts(tool: Tool, row?: ToolBenchmarkRow) {
  const artifacts: string[] = [];
  const links = tool.paperLinks ?? [];
  if (links.some((link) => /paper|arxiv|pmlr|openreview|doi/i.test(link.label) || /arxiv|openreview|proceedings|paper|doi/i.test(link.url))) artifacts.push("Paper");
  if (links.some((link) => /github|repo|code/i.test(link.label) || /github\.com/i.test(link.url))) artifacts.push("Repo");
  if (tool.modelLinks?.length) artifacts.push("Weights");
  if (tool.demos?.length) artifacts.push("Demo");
  if (row) artifacts.push("Benchmark");
  if (!artifacts.length && tool.deploymentNotes?.length) artifacts.push("Docs");
  return [...new Set(artifacts)].slice(0, 4);
}

function buildLeaderboardRow(tool: Tool): LeaderboardRankConfig {
  const row = benchmarkRowFor(tool);
  const artifacts = inferArtifacts(tool, row);
  const hasNumericBenchmark = Boolean(row && primaryScore(row) !== Number.NEGATIVE_INFINITY);
  return {
    hasNumericBenchmark,
    primaryScore: primaryScore(row),
    speedScore: speedScore(tool, row),
    row: {
    slug: tool.slug,
    name: tool.title,
    category: tool.category,
    task: tool.task,
    dataset: row?.dataset ?? tool.benchmarkDataset ?? "No source-reported numeric benchmark",
    metric: row ? `${row.metric}: ${row.value}` : tool.benchmarkMetric ?? "No single numeric benchmark reported.",
    scoreLabel: inferScoreLabel(row),
    speed: row?.runtime ?? tool.benchmarkLatency ?? "Not reported",
    size: tool.runtime,
    artifacts,
    rankOrder: 99,
    completeness: artifacts.length + (row ? 2 : 0),
    speedRank: 99,
    sizeRank: 99,
    href: `/tools/${tool.slug}`
    }
  };
}

const categoryIndex = new Map(leaderboardCategories.map((category, index) => [category.name, index]));

const rankedRows = leaderboardCategories.flatMap((category) => {
  const rows = realTools
    .filter((tool) => tool.category === category.name)
    .map(buildLeaderboardRow)
    .sort((a, b) => {
      if (a.hasNumericBenchmark !== b.hasNumericBenchmark) return a.hasNumericBenchmark ? -1 : 1;
      return b.primaryScore - a.primaryScore || a.row.name.localeCompare(b.row.name);
    });

  const speedRows = [...rows].sort((a, b) => {
    if (a.speedScore !== b.speedScore) return b.speedScore - a.speedScore;
    return b.primaryScore - a.primaryScore || a.row.name.localeCompare(b.row.name);
  });
  const speedRankBySlug = new Map(speedRows.map((item, index) => [item.row.slug, index + 1]));

  return rows.map((item, index) => ({
    ...item.row,
    rankOrder: index + 1,
    speedRank: speedRankBySlug.get(item.row.slug) ?? index + 1,
    sizeRank: index + 1
  }));
});

export const leaderboardRows: LeaderboardRow[] = rankedRows.sort((a, b) => {
  return (
    (categoryIndex.get(a.category) ?? 99) - (categoryIndex.get(b.category) ?? 99) ||
    a.rankOrder - b.rankOrder ||
    a.name.localeCompare(b.name)
  );
});
