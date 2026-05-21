import type { Tool } from "@/data/tools";

export function categoryShortLabel(category: Tool["category"], task?: string) {
  const normalizedTask = task?.toLowerCase() || "";

  if (category === "Perception and Grounding") {
    if (normalizedTask.includes("depth")) return "Depth";
    if (normalizedTask.includes("segment")) return "Segmentation";
    if (normalizedTask.includes("video")) return "VOS";
    if (normalizedTask.includes("spatial")) return "Spatial Grounding";
    return "Grounding";
  }
  if (category === "Cognition and State Modeling") {
    if (normalizedTask.includes("odometry")) return "Odometry";
    if (normalizedTask.includes("mapping")) return "Mapping";
    if (normalizedTask.includes("reconstruction")) return "3D Reconstruction";
    if (normalizedTask.includes("memory")) return "Memory";
    if (normalizedTask.includes("scene graph")) return "Scene Graph";
    return "State Modeling";
  }
  if (category === "Reasoning and Planning") {
    if (normalizedTask.includes("motion")) return "Motion Planning";
    if (normalizedTask.includes("verification") || normalizedTask.includes("validation")) return "Verification";
    if (normalizedTask.includes("reasoning")) return "Reasoning";
    return "Planning";
  }
  if (normalizedTask.includes("grasp")) return "Grasping";
  if (normalizedTask.includes("trajectory")) return "Trajectory";
  if (normalizedTask.includes("monitor")) return "Monitoring";
  if (normalizedTask.includes("tracking")) return "Tracking";
  if (normalizedTask.includes("navigation")) return "Navigation";
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

export function toolHeroPosition(tool: Tool) {
  if (tool.heroPosition) return tool.heroPosition;
  if (tool.demos?.[0]?.position) return tool.demos[0].position;
  return "center center";
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
