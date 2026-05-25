import type { Tool } from "@/data/tools";

export type CapabilityIconName =
  | "box"
  | "tag"
  | "mask"
  | "keypoint"
  | "layers"
  | "depth"
  | "image"
  | "map"
  | "graph"
  | "memory"
  | "route"
  | "shield"
  | "robot"
  | "trajectory"
  | "control";

export type CapabilityLabelInfo = {
  label: string;
  icon: CapabilityIconName;
};

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

export function capabilityLabelForCategory(category: Tool["category"]): CapabilityLabelInfo {
  if (category === "Perception and Grounding") return { label: "Perception and Grounding", icon: "box" };
  if (category === "Cognition and State Modeling") return { label: "Cognition and State Modeling", icon: "memory" };
  if (category === "Reasoning and Planning") return { label: "Reasoning and Planning", icon: "graph" };
  return { label: "Execution and Control", icon: "control" };
}

export function capabilityLabelForTool(category: Tool["category"], task?: string): CapabilityLabelInfo {
  const normalizedTask = task?.toLowerCase() || "";

  if (normalizedTask.includes("classification")) return { label: "Classification", icon: "tag" };
  if (normalizedTask.includes("segment") || normalizedTask.includes("mask") || normalizedTask.includes("vos")) {
    return { label: "Instance Segmentation", icon: "mask" };
  }
  if (normalizedTask.includes("tracking") || normalizedTask.includes("keypoint") || normalizedTask.includes("monitor")) {
    return { label: "Keypoint Detection", icon: "keypoint" };
  }
  if (normalizedTask.includes("depth")) return { label: "Depth Estimation", icon: "depth" };
  if (normalizedTask.includes("restoration") || normalizedTask.includes("enhancement") || normalizedTask.includes("deblur") || normalizedTask.includes("contrast")) {
    return { label: "Image Enhancement", icon: "image" };
  }

  if (category === "Perception and Grounding") {
    if (normalizedTask.includes("spatial") || normalizedTask.includes("language")) return { label: "Multimodal", icon: "layers" };
    return { label: "Object Detection", icon: "box" };
  }

  if (category === "Cognition and State Modeling") {
    if (normalizedTask.includes("odometry")) return { label: "Odometry", icon: "route" };
    if (normalizedTask.includes("reconstruction")) return { label: "3D Reconstruction", icon: "layers" };
    if (normalizedTask.includes("scene graph") || normalizedTask.includes("relationship")) return { label: "Scene Graph", icon: "graph" };
    if (normalizedTask.includes("memory") || normalizedTask.includes("retrieval") || normalizedTask.includes("timeline") || normalizedTask.includes("state")) {
      return { label: "State Memory", icon: "memory" };
    }
    if (normalizedTask.includes("embedding")) return { label: "Text Embedding", icon: "tag" };
    return { label: "Mapping", icon: "map" };
  }

  if (category === "Reasoning and Planning") {
    if (normalizedTask.includes("motion")) return { label: "Motion Planning", icon: "route" };
    if (normalizedTask.includes("verification") || normalizedTask.includes("validation") || normalizedTask.includes("safety")) {
      return { label: "Verification", icon: "shield" };
    }
    if (normalizedTask.includes("simulate") || normalizedTask.includes("materialize")) return { label: "Simulation Planning", icon: "layers" };
    if (normalizedTask.includes("language") || normalizedTask.includes("temporal")) return { label: "Task Planning", icon: "graph" };
    return { label: "Visual Reasoning", icon: "layers" };
  }

  if (normalizedTask.includes("grasp")) return { label: "Grasping", icon: "robot" };
  if (normalizedTask.includes("trajectory")) return { label: "Trajectory", icon: "trajectory" };
  if (normalizedTask.includes("navigation")) return { label: "Navigation", icon: "route" };
  if (normalizedTask.includes("verification")) return { label: "Success Check", icon: "shield" };
  return { label: "Robot Control", icon: "control" };
}

export function getToolResources(tool: Tool) {
  return [
    tool.paperTitle ? "Paper" : "",
    tool.demos?.length ? "Demo images" : "",
    tool.apiExample ? "API docs" : "",
    tool.benchmarkRows?.length ? "Benchmark" : ""
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
