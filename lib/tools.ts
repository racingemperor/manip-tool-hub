import type { Tool } from "@/data/tools";

export function categoryShortLabel(category: Tool["category"], task?: string) {
  if (category === "Perception and Grounding") {
    if (task?.toLowerCase().includes("grasp")) return "Grasping";
    if (task?.toLowerCase().includes("depth")) return "Depth";
    if (task?.toLowerCase().includes("segment")) return "Segmentation";
    if (task?.toLowerCase().includes("video")) return "VOS";
    return "Grounding";
  }
  if (category === "Cognition and State Modeling") {
    if (task?.toLowerCase().includes("odometry")) return "Odometry";
    if (task?.toLowerCase().includes("mapping")) return "Mapping";
    if (task?.toLowerCase().includes("reconstruction")) return "3D Reconstruction";
    return "State Modeling";
  }
  if (category === "Reasoning and Planning") return "Planning";
  return "Control";
}

export function getToolResources(tool: Tool) {
  return [
    tool.paperTitle ? "Paper" : "",
    tool.demos?.length ? "Demo images" : "",
    tool.apiExample ? "API docs" : "",
    tool.benchmarkMetric ? "Benchmark" : ""
  ].filter(Boolean);
}

export function venueLabel(tool: Tool) {
  if (!tool.paperVenue) return tool.status;
  return tool.paperVenue.split("/")[0].split(";")[0].trim();
}

export function searchHaystack(tool: Tool) {
  return [
    tool.slug,
    tool.title,
    tool.category,
    tool.task,
    tool.summary,
    tool.input,
    tool.output,
    tool.runtime,
    tool.status,
    tool.paperTitle,
    tool.paperAuthors,
    tool.paperVenue,
    tool.paperContribution,
    tool.benchmarkDataset,
    tool.benchmarkMetric,
    tool.benchmarkLatency,
    tool.benchmarkArtifacts,
    tool.owner,
    tool.license,
    getToolResources(tool).join(" ")
  ].filter(Boolean).join(" ").toLowerCase();
}
