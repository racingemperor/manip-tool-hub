import type { Tool, ToolParameter } from "@/data/tools";

function lower(value: string) {
  return value.toLowerCase();
}

export function inferParameters(tool: Tool): ToolParameter[] {
  const task = lower(`${tool.task} ${tool.input} ${tool.output}`);

  if (task.includes("depth")) {
    return [
      { name: "image", type: "relative path | file", required: true, description: "Project-relative RGB image path used for metric depth estimation." },
      { name: "model", type: "string", required: false, description: "Depth model variant or checkpoint name, such as ZoeD_N." },
      { name: "output", type: "relative path", required: false, description: "Destination path for the predicted depth map or visualization." }
    ];
  }

  if (task.includes("video") || task.includes("mask")) {
    return [
      { name: "video", type: "relative path | frame folder", required: true, description: "Video file or image sequence used as the segmentation input." },
      { name: "initial_mask", type: "relative path | mask", required: false, description: "Optional first-frame mask, prompt, or object seed." },
      { name: "output_dir", type: "relative path", required: false, description: "Folder for tracked masks, overlays, and logs." }
    ];
  }

  if (task.includes("grasp") || task.includes("rgb-d") || task.includes("point cloud")) {
    return [
      { name: "color_image", type: "relative path | file", required: true, description: "RGB image or color frame for grasp perception." },
      { name: "depth_image", type: "relative path | file", required: true, description: "Depth image or point cloud aligned with the color input." },
      { name: "max_gripper_width", type: "number", required: false, description: "Maximum gripper width used to filter feasible grasp poses." }
    ];
  }

  if (task.includes("odometry") || task.includes("mapping") || task.includes("scene graph") || task.includes("reconstruction")) {
    return [
      { name: "config", type: "relative path", required: true, description: "Repository-relative YAML or config file for the mapping pipeline." },
      { name: "input_sequence", type: "relative path | dataset", required: true, description: "Sensor sequence, bag file, image set, or dataset folder." },
      { name: "output_dir", type: "relative path", required: false, description: "Folder for trajectory, maps, point clouds, graphs, and logs." }
    ];
  }

  if (task.includes("detection") || task.includes("grounding")) {
    return [
      { name: "image", type: "relative path | file", required: true, description: "Project-relative image or scene path to run open-vocabulary detection on." },
      { name: "prompts", type: "string | string[]", required: true, description: "Object vocabulary to detect, such as person,bus,car or robot arm,gripper,red cube." },
      { name: "threshold", type: "number", required: false, description: "Confidence threshold for retaining detections." },
      { name: "topk", type: "integer", required: false, description: "Maximum number of detections to keep before visualization or export." }
    ];
  }

  return [
    { name: "input", type: "relative path | JSON", required: true, description: "Repository-relative input file, request JSON, or scene state." },
    { name: "config", type: "relative path", required: false, description: "Optional tool configuration file." },
    { name: "output_dir", type: "relative path", required: false, description: "Folder for result files, logs, metrics, and traces." }
  ];
}

export function buildReturnSchema(tool: Tool) {
  const task = lower(`${tool.task} ${tool.output}`);
  const primaryKey = task.includes("depth")
    ? "depth_map"
    : task.includes("grasp")
      ? "grasps"
      : task.includes("mask") || task.includes("segment") || task.includes("video")
        ? "masks"
        : task.includes("odometry") || task.includes("mapping")
          ? "trajectory"
          : task.includes("reconstruction") || task.includes("scene graph")
            ? "scene_state"
            : "results";

  return {
    tool: tool.slug,
    status: "ok",
    [primaryKey]: [
      {
        label: tool.task,
        score: 0.87,
        output: tool.output
      }
    ],
    timing: {
      runtime: tool.benchmarkLatency || tool.runtime,
      device: "documented in source benchmark when available"
    },
    artifacts: {
      visualization: `tools/${tool.slug}/runs/visualization.png`,
      raw_predictions: `tools/${tool.slug}/runs/predictions.json`
    }
  };
}

export function buildErrorSchema(tool: Tool) {
  return {
    tool: tool.slug,
    status: "error",
    error: {
      code: "INPUT_VALIDATION_ERROR",
      message: "Required input path, prompt, or config is missing.",
      recoverable: true
    }
  };
}

export function buildToolJson(tool: Tool) {
  return {
    name: tool.title,
    slug: tool.slug,
    toolType: "Local Model",
    category: tool.category,
    source: tool.owner || "Add owner",
    status: tool.status,
    description: tool.summary,
    inputSchema: {
      type: "object",
      parameters: Object.fromEntries(
        inferParameters(tool).map((parameter) => [
          parameter.name,
          {
            type: parameter.type,
            required: parameter.required,
            description: parameter.description
          }
        ])
      )
    },
    returnSchema: {
      type: "object",
      properties: {
        status: { type: "string" },
        timing: { type: "object" },
        artifacts: { type: "object" },
        error: { type: "object" }
      }
    },
    links: tool.paperLinks || []
  };
}

export function buildCodePaths(tool: Tool) {
  return [
    `tools/${tool.slug}/README.md`,
    `tools/${tool.slug}/configs/default.yaml`,
    `tools/${tool.slug}/examples/`,
    `tools/${tool.slug}/runs/`,
    tool.paperLinks?.find((link) => link.label.toLowerCase().includes("github"))?.url || "source repository link"
  ].join("\n");
}

export function buildTestExamples(tool: Tool) {
  const parameters = inferParameters(tool);
  const request = Object.fromEntries(
    parameters.map((parameter) => {
      if (parameter.name.includes("image")) return [parameter.name, `tools/${tool.slug}/examples/input.jpg`];
      if (parameter.name.includes("video")) return [parameter.name, `tools/${tool.slug}/examples/input.mp4`];
      if (parameter.name.includes("mask")) return [parameter.name, `tools/${tool.slug}/examples/mask.png`];
      if (parameter.name.includes("config")) return [parameter.name, `tools/${tool.slug}/configs/default.yaml`];
      if (parameter.name.includes("sequence")) return [parameter.name, `tools/${tool.slug}/examples/sample_sequence`];
      if (parameter.name.includes("output")) return [parameter.name, `tools/${tool.slug}/runs/example`];
      if (parameter.name === "prompts") return [parameter.name, "robot arm,gripper,red cube,table"];
      if (parameter.name === "threshold") return [parameter.name, 0.1];
      if (parameter.name === "topk") return [parameter.name, 50];
      return [parameter.name, `tools/${tool.slug}/examples/input`];
    })
  );

  return [
    {
      title: "Example 1: local request",
      code: JSON.stringify(request, null, 2)
    },
    {
      title: "Example 2: minimal command",
      code: tool.apiExample || `python tools/${tool.slug}/demo/run_example.py --input tools/${tool.slug}/examples/input`
    },
    {
      title: "Example 3: expected artifact paths",
      code: JSON.stringify({
        output_dir: `tools/${tool.slug}/runs/example`,
        visualization: `tools/${tool.slug}/runs/visualization.png`,
        raw_predictions: `tools/${tool.slug}/runs/predictions.json`
      }, null, 2)
    }
  ];
}
