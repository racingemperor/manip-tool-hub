export type ToolCategory = "Perception and Grounding" | "Cognition and State Modeling" | "Reasoning and Planning" | "Execution and Control";

export type ToolStatus = "Draft" | "Docs Ready" | "Code Linked" | "Runnable" | "Verified";

export type ToolDemo = {
  label: string;
  image?: string;
  position?: string;
};

export type ToolLink = {
  label: string;
  url: string;
};

export type ToolPresetExample = {
  title: string;
  input: string;
  prompt?: string;
  runLabel?: string;
  expectedOutput: string;
  image?: string;
};

export type ToolParameterNote = {
  name: string;
  control: "file" | "text" | "slider" | "select" | "toggle" | "number" | "path";
  defaultValue?: string;
  meaning: string;
};

export type ToolOutputNote = {
  name: string;
  meaning: string;
};

export type ToolBenchmarkRow = {
  dataset: string;
  metric: string;
  value: string;
  runtime?: string;
  source?: string;
};

export type Tool = {
  slug: string;
  title: string;
  category: ToolCategory;
  task: string;
  summary: string;
  input: string;
  output: string;
  runtime: string;
  status: ToolStatus;
  paperTitle?: string;
  paperAuthors?: string;
  paperVenue?: string;
  paperContribution?: string;
  paperLinks?: ToolLink[];
  heroImage?: string;
  demos?: ToolDemo[];
  apiExample?: string;
  shortExplanation?: string;
  presetExample?: ToolPresetExample;
  parameterNotes?: ToolParameterNote[];
  outputNotes?: ToolOutputNote[];
  deploymentNotes?: string[];
  modelLinks?: ToolLink[];
  benchmarkRows?: ToolBenchmarkRow[];
  benchmarkDataset?: string;
  benchmarkMetric?: string;
  benchmarkLatency?: string;
  benchmarkArtifacts?: string;
  license?: string;
  owner?: string;
  version?: string;
};

export type ToolParameter = {
  name: string;
  type: string;
  required: boolean;
  description: string;
};

export const toolCategories: ToolCategory[] = [
  "Perception and Grounding",
  "Cognition and State Modeling",
  "Reasoning and Planning",
  "Execution and Control"
];

export const tools: Tool[] = [
  {
    "slug": "yolo-world",
    "title": "YOLO-World",
    "category": "Perception and Grounding",
    "task": "Open-vocabulary detection",
    "summary": "YOLO-World is a real-time open-vocabulary object detector that uses image inputs and text prompts to localize arbitrary object categories.",
    "input": "Image + text prompts",
    "output": "Bounding boxes, labels, scores",
    "runtime": "Python / ONNX / demo",
    "status": "Code Linked",
    "paperTitle": "YOLO-World: Real-Time Open-Vocabulary Object Detection",
    "paperAuthors": "Tianheng Cheng, Lin Song, Yixiao Ge, Wenyu Liu, Xinggang Wang, Ying Shan",
    "paperVenue": "CVPR 2024 / arXiv:2401.17270",
    "paperContribution": "Connects YOLO-style real-time detection with open-vocabulary text conditioning, making prompt-driven detection practical for fast perception and grounding workflows.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/AILab-CVC/YOLO-World"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2401.17270"
      },
      {
        "label": "Hugging Face Demo",
        "url": "https://huggingface.co/spaces/stevengrove/YOLO-World"
      }
    ],
    "heroImage": "assets/tools/yolo-world/vis-lvis.png",
    "demos": [
      {
        "label": "LVIS indoor objects",
        "image": "assets/tools/yolo-world/vis-lvis.png",
        "position": "left top"
      },
      {
        "label": "User vocabulary: people",
        "image": "assets/tools/yolo-world/user-vocab.png",
        "position": "left center"
      },
      {
        "label": "Referring detection: people",
        "image": "assets/tools/yolo-world/vis-referring.png",
        "position": "left top"
      },
      {
        "label": "Speed / accuracy benchmark",
        "image": "assets/tools/yolo-world/speed-acc.png",
        "position": "center center"
      }
    ],
    "apiExample": "# Relative-path local entry for the YOLO-World tool folder\npython tools/yolo-world/demo/image_demo.py tools/yolo-world/demo/sample_images/bus.jpg   tools/yolo-world/configs/pretrain/yolo_world_v2_xl.py   tools/yolo-world/weights/yolo_world_v2_xl_obj365v1_goldg_pretrain-5daf1395.pth   \"person,bus,car\"   --topk 100   --threshold 0.05   --output-dir tools/yolo-world/runs/detect\n\n# Use this as a documentation path. The static page does not execute the model.",
    "shortExplanation": "Upload an image, provide the object vocabulary you want to find, and YOLO-World returns labeled bounding boxes with confidence scores.",
    "presetExample": {
      "title": "Open-vocabulary object detection",
      "input": "tools/yolo-world/demo/sample_images/bus.jpg",
      "prompt": "person,bus,car",
      "runLabel": "Run detection",
      "expectedOutput": "An annotated image plus JSON-style detections containing boxes, labels, and scores.",
      "image": "assets/tools/yolo-world/user-vocab.png"
    },
    "parameterNotes": [
      {
        "name": "image",
        "control": "file",
        "meaning": "The RGB image that will be scanned for the requested object names."
      },
      {
        "name": "prompts",
        "control": "text",
        "defaultValue": "person,bus,car",
        "meaning": "Comma-separated vocabulary. The detector only reports objects matching this user vocabulary."
      },
      {
        "name": "threshold",
        "control": "slider",
        "defaultValue": "0.05",
        "meaning": "Minimum confidence score retained in the visualization. Raising it removes weak detections."
      },
      {
        "name": "topk",
        "control": "number",
        "defaultValue": "100",
        "meaning": "Maximum number of boxes kept before visualization or export."
      }
    ],
    "outputNotes": [
      {
        "name": "bbox",
        "meaning": "The predicted box coordinates around each detected object."
      },
      {
        "name": "label",
        "meaning": "The matched text category from the prompt vocabulary."
      },
      {
        "name": "score",
        "meaning": "Detection confidence; higher values indicate stronger text-image matching."
      }
    ],
    "deploymentNotes": [
      "Clone the official repository with submodules, then install the editable package and MMYOLO/MMSeg-style dependencies.",
      "Download one of the official YOLO-World weights from the model card or Hugging Face links.",
      "Run the image demo with a relative image path, config path, checkpoint path, and comma-separated vocabulary.",
      "Export annotated images and prediction JSON under tools/yolo-world/runs/ for the catalog workflow."
    ],
    "modelLinks": [
      {
        "label": "YOLO-World Model Card",
        "url": "https://github.com/AILab-CVC/YOLO-World#model-card"
      },
      {
        "label": "YOLO-World Hugging Face",
        "url": "https://huggingface.co/wondervictor/YOLO-World"
      }
    ],
    "benchmarkRows": [
      {
        "dataset": "LVIS minival zero-shot",
        "metric": "Fixed AP / AP_r / AP_c / AP_f",
        "value": "35.4 / 27.6 / 34.1 / 38.0",
        "runtime": "52.0 FPS on V100",
        "source": "CVPR 2024 paper"
      },
      {
        "dataset": "COCO val2017 fine-tuning",
        "metric": "Box AP",
        "value": "44.9 AP for YOLO-World-L 640",
        "runtime": "YOLO-style real-time inference",
        "source": "Official repository model card"
      }
    ],
    "benchmarkDataset": "LVIS minival zero-shot evaluation with 1,203 categories; COCO val2017 for fine-tuned detector tests.",
    "benchmarkMetric": "YOLO-World-L reports 35.4 Fixed AP on LVIS minival, with AP_r 27.6, AP_c 34.1, and AP_f 38.0. The paper also reports 35.0 AP without pseudo-labeled CC3M.",
    "benchmarkLatency": "52.0 FPS on one NVIDIA V100 without TensorRT for the re-parameterized YOLO-World-L; the original non-re-parameterized version is reported at 17.6 FPS.",
    "benchmarkArtifacts": "Official paper, speed-accuracy figure, LVIS/COCO evaluation tables, weights, configs, demo scripts, and ONNX export notes.",
    "license": "GPL-3.0",
    "owner": "AILab-CVC",
    "version": "YOLO-World v2"
  },
  {
    "slug": "hydra",
    "title": "Hydra",
    "category": "Cognition and State Modeling",
    "task": "3D scene graph construction",
    "summary": "Hydra is a real-time spatial perception system that incrementally builds 3D scene graphs for robots from sensor streams, semantics, and geometric mapping signals.",
    "input": "Sensor data + semantic/geometric cues",
    "output": "Layered 3D scene graph",
    "runtime": "Ubuntu 24.04 / ROS2 Jazzy / Python bindings",
    "status": "Code Linked",
    "paperTitle": "Hydra: A Real-time Spatial Perception System for 3D Scene Graph Construction and Optimization",
    "paperAuthors": "Nathan Hughes, Yun Chang, Luca Carlone",
    "paperVenue": "RSS 2022; Foundations of Spatial Perception for Robotics, IJRR 2024",
    "paperContribution": "Builds and optimizes dynamic 3D scene graphs online, giving robotics systems a structured representation of places, objects, rooms, agents, and metric-semantic spatial context.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/MIT-SPARK/Hydra"
      },
      {
        "label": "RSS 2022 Paper",
        "url": "https://arxiv.org/abs/2201.13360"
      },
      {
        "label": "IJRR 2024 Foundations Paper",
        "url": "https://arxiv.org/abs/2304.02246"
      },
      {
        "label": "Installation Docs",
        "url": "https://github.com/MIT-SPARK/Hydra?tab=readme-ov-file#installation"
      }
    ],
    "heroImage": "assets/tools/hydra/hydra.gif",
    "demos": [
      {
        "label": "Online 3D scene graph playback",
        "image": "assets/tools/hydra/hydra.gif",
        "position": "center center"
      }
    ],
    "apiExample": "# Relative-path local entry for the Hydra tool folder\npython tools/hydra/examples/run_hydra.py   --config tools/hydra/configs/default.yaml   --input tools/hydra/examples/sample_sequence   --output tools/hydra/runs/scene_graph\n\n# Suggested repository layout when adding local files:\n# tools/hydra/README.md\n# tools/hydra/configs/default.yaml\n# tools/hydra/examples/sample_sequence/\n# tools/hydra/runs/scene_graph/\n\n# This page documents the path. It does not execute Hydra.",
    "shortExplanation": "Feed synchronized robot sensor streams into Hydra and it incrementally builds a layered 3D scene graph of objects, places, rooms, and buildings.",
    "presetExample": {
      "title": "Build a 3D scene graph",
      "input": "tools/hydra/examples/sample_sequence",
      "prompt": "Use the default indoor mapping configuration",
      "runLabel": "Build scene graph",
      "expectedOutput": "A dynamic scene graph with geometry, semantic objects, places, room nodes, and optimized graph artifacts.",
      "image": "assets/tools/hydra/hydra.gif"
    },
    "parameterNotes": [
      {
        "name": "config",
        "control": "path",
        "defaultValue": "tools/hydra/configs/default.yaml",
        "meaning": "Controls graph layers, front-end settings, semantic inputs, and back-end optimization behavior."
      },
      {
        "name": "input_sequence",
        "control": "path",
        "meaning": "A sensor sequence or simulator output containing the geometric and semantic observations Hydra consumes."
      },
      {
        "name": "semantic_source",
        "control": "select",
        "defaultValue": "configured model or labels",
        "meaning": "Selects whether labels come from an existing semantic model, logged annotations, or a simulator."
      },
      {
        "name": "output_dir",
        "control": "path",
        "meaning": "Destination for graph files, mesh outputs, logs, and visualizations."
      }
    ],
    "outputNotes": [
      {
        "name": "objects",
        "meaning": "Object nodes with poses, bounding boxes, labels, and relations to the surrounding scene."
      },
      {
        "name": "places",
        "meaning": "Topological free-space nodes that support navigation and spatial reasoning."
      },
      {
        "name": "rooms/building",
        "meaning": "Higher-level hierarchical nodes used to summarize indoor structure."
      }
    ],
    "deploymentNotes": [
      "Use Ubuntu 24.04 with ROS2 Jazzy for the current default branch.",
      "Install the dependencies from the official installation guide before building Hydra.",
      "Prepare semantic/geometric sensor data or a simulator sequence in the expected repository format.",
      "Run the example script or ROS2 launch flow, then inspect graph outputs with the visualizer."
    ],
    "modelLinks": [
      {
        "label": "Hydra Installation Guide",
        "url": "https://github.com/MIT-SPARK/Hydra#installation-and-running"
      },
      {
        "label": "Hydra Evaluation Docs",
        "url": "https://github.com/MIT-SPARK/Hydra#hydra-evaluation"
      }
    ],
    "benchmarkRows": [
      {
        "dataset": "uHumans2 Office",
        "metric": "Component timing",
        "value": "Objects 24.1+/-12.8 ms, places 8.1+/-1.3 ms, rooms 19.0+/-12.3 ms",
        "runtime": "5 Hz keyframe target",
        "source": "Hydra paper"
      },
      {
        "dataset": "SidPac Floor 3-4",
        "metric": "Component timing",
        "value": "Objects 75.3+/-37.0 ms, places 4.2+/-2.1 ms, rooms 15.0+/-14.6 ms",
        "runtime": "Online graph construction",
        "source": "Hydra paper"
      }
    ],
    "benchmarkDataset": "uHumans2 Apartment, Office, Subway and SidPac Floor 1-3 / Floor 3-4 scene-graph construction sequences.",
    "benchmarkMetric": "Timing breakdown includes Office objects 24.1+/-12.8 ms, places 8.1+/-1.3 ms, rooms 19.0+/-12.3 ms; SidPac Floor 3-4 objects 75.3+/-37.0 ms, places 4.2+/-2.1 ms, rooms 15.0+/-14.6 ms.",
    "benchmarkLatency": "On NVIDIA Xavier NX for uHumans2 Office, Hydra reports objects 75+/-35 ms, places 33+/-6 ms, and rooms 55+/-41 ms, targeting a 5 Hz keyframe rate.",
    "benchmarkArtifacts": "RSS 2022 paper, component timing table, room precision/recall evaluation, loop-closure ablation, scene graph outputs, config files, logs, and visualization GIFs.",
    "license": "BSD-2-Clause",
    "owner": "MIT-SPARK",
    "version": "main branch"
  },
  {
    "slug": "anygrasp",
    "title": "AnyGrasp",
    "category": "Perception and Grounding",
    "task": "6-DoF grasp perception",
    "summary": "AnyGrasp is a robust grasp perception tool for predicting and tracking 6-DoF robotic grasps from RGB-D observations and point clouds.",
    "input": "RGB-D image / point cloud",
    "output": "6-DoF grasp poses, scores, widths",
    "runtime": "Python / PyTorch / MinkowskiEngine / SDK demo",
    "status": "Code Linked",
    "paperTitle": "AnyGrasp: Robust and Efficient Grasp Perception in Spatial and Temporal Domains",
    "paperAuthors": "Hao-Shu Fang, Chenxi Wang, Hongjie Fang, Minghao Gou, Jirong Liu, Hengxu Yan, Wenhai Liu, Yichen Xie, Cewu Lu",
    "paperVenue": "IEEE Transactions on Robotics, 2023 / arXiv:2212.08333",
    "paperContribution": "Provides a grasp perception pipeline that detects robust 6-DoF grasp candidates and supports temporal tracking, enabling robotic manipulation in cluttered and dynamic scenes.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/graspnet/anygrasp_sdk"
      },
      {
        "label": "Project Page",
        "url": "https://graspnet.net/anygrasp.html"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2212.08333"
      },
      {
        "label": "Dataset",
        "url": "https://graspnet.net/datasets.html"
      }
    ],
    "heroImage": "assets/tools/anygrasp/anygrasp-1-small.gif",
    "demos": [
      {
        "label": "Cluttered scene grasping",
        "image": "assets/tools/anygrasp/anygrasp-1-small.gif",
        "position": "center center"
      },
      {
        "label": "Fish catching demo",
        "image": "assets/tools/anygrasp/anygrasp-fish.gif",
        "position": "center center"
      },
      {
        "label": "Broken pot fragments",
        "image": "assets/tools/anygrasp/broken.gif",
        "position": "center center"
      },
      {
        "label": "Human comparison sequence",
        "image": "assets/tools/anygrasp/vshuman.gif",
        "position": "center center"
      },
      {
        "label": "Grasp pose visualization",
        "image": "assets/tools/anygrasp/grasppose.gif",
        "position": "center center"
      },
      {
        "label": "Prediction variance view",
        "image": "assets/tools/anygrasp/variance.gif",
        "position": "center center"
      },
      {
        "label": "RGB-D demo color input",
        "image": "assets/tools/anygrasp/example-color.png",
        "position": "center center"
      },
      {
        "label": "Depth input example",
        "image": "assets/tools/anygrasp/example-depth.png",
        "position": "center center"
      }
    ],
    "apiExample": "# Relative-path local entry for the AnyGrasp tool folder\npython tools/anygrasp/grasp_detection/demo.py   --checkpoint_path tools/anygrasp/log/checkpoint_detection.tar   --max_gripper_width 0.1   --gripper_height 0.03   --debug\n\n# Optional temporal tracking entry:\npython tools/anygrasp/grasp_tracking/demo.py   --checkpoint_path tools/anygrasp/log/checkpoint_tracking.tar   -filter oneeuro   --debug\n\n# Suggested repository layout when adding local files:\n# tools/anygrasp/README.md\n# tools/anygrasp/grasp_detection/demo.py\n# tools/anygrasp/grasp_tracking/demo.py\n# tools/anygrasp/grasp_detection/example_data/color.png\n# tools/anygrasp/grasp_detection/example_data/depth.png\n# tools/anygrasp/log/\n\n# This page documents the path. The static page does not execute AnyGrasp.\n# The official implementation requires the licensed AnyGrasp SDK binaries and model weights.",
    "shortExplanation": "Provide an RGB-D observation or point cloud, and AnyGrasp predicts feasible 6-DoF grasp poses with scores and gripper widths for robotic manipulation.",
    "presetExample": {
      "title": "Detect grasp poses from RGB-D",
      "input": "tools/anygrasp/grasp_detection/example_data/color.png + depth.png",
      "prompt": "Find stable grasps within the gripper width limit",
      "runLabel": "Predict grasps",
      "expectedOutput": "Ranked 6-DoF grasp poses with visualization, score, width, and optional temporal tracking output.",
      "image": "assets/tools/anygrasp/grasppose.gif"
    },
    "parameterNotes": [
      {
        "name": "color_image",
        "control": "file",
        "meaning": "RGB frame aligned with the depth input."
      },
      {
        "name": "depth_image",
        "control": "file",
        "meaning": "Metric depth image used to recover 3D geometry for grasp candidates."
      },
      {
        "name": "max_gripper_width",
        "control": "slider",
        "defaultValue": "0.10 m",
        "meaning": "Filters grasps that exceed the physical gripper opening."
      },
      {
        "name": "filter",
        "control": "select",
        "defaultValue": "oneeuro",
        "meaning": "Temporal smoothing option for tracking grasps across frames."
      }
    ],
    "outputNotes": [
      {
        "name": "pose",
        "meaning": "6-DoF grasp frame describing gripper position and orientation."
      },
      {
        "name": "score",
        "meaning": "Predicted grasp quality used to rank candidates."
      },
      {
        "name": "width",
        "meaning": "Required gripper opening width for the selected grasp."
      }
    ],
    "deploymentNotes": [
      "Register for the official AnyGrasp SDK and download the licensed binaries and checkpoints.",
      "Install PyTorch, MinkowskiEngine, Open3D, and the repository dependencies expected by the SDK.",
      "Prepare aligned RGB-D images or point clouds under the example data folder.",
      "Run detection or tracking demos and store visualized grasps under tools/anygrasp/runs/."
    ],
    "modelLinks": [
      {
        "label": "AnyGrasp SDK Registration",
        "url": "https://graspnet.net/anygrasp.html"
      },
      {
        "label": "GraspNet Dataset",
        "url": "https://graspnet.net/datasets.html"
      }
    ],
    "benchmarkRows": [
      {
        "dataset": "Real bin-picking benchmark",
        "metric": "Attempt-centric success",
        "value": "93.3% AnyGrasp vs 72.2% DexNet 4.0; object completion 99.8%",
        "runtime": "100 ms prediction, <200 ms decision time",
        "source": "T-RO 2023 paper"
      },
      {
        "dataset": "Dynamic fish catching",
        "metric": "Success rate",
        "value": "75.5% AnyGrasp vs 62.5% heuristic baseline",
        "runtime": "Temporal grasp tracking",
        "source": "AnyGrasp paper"
      }
    ],
    "benchmarkDataset": "Real bin-picking benchmark with 300+ unseen daily objects; GraspNet-1Billion extended training data with 144 real objects and 268 scenes.",
    "benchmarkMetric": "Attempt-centric success is 93.3% for AnyGrasp versus 72.2% for DexNet 4.0 and 93.9% for human subjects; object-centric completion is 99.8%. Dynamic fish-catching success is 75.5% versus 62.5% for the heuristic baseline.",
    "benchmarkLatency": "The paper reports 100 ms grasp prediction and less than 200 ms overall decision time; single UR5 setup reaches 900+ mean picks per hour.",
    "benchmarkArtifacts": "AnyGrasp paper, success-rate table, RGB-D examples, grasp detection demo, grasp tracking demo, SDK registration notes, and real-robot videos.",
    "license": "Licensed SDK",
    "owner": "GraspNet",
    "version": "AnyGrasp SDK main"
  },
  {
    "slug": "zoedepth",
    "title": "ZoeDepth",
    "category": "Perception and Grounding",
    "task": "Metric depth estimation",
    "summary": "ZoeDepth estimates metric depth from a single RGB image by combining relative depth priors with metric depth prediction, enabling zero-shot transfer across indoor and outdoor scenes.",
    "input": "RGB image",
    "output": "Metric depth map",
    "runtime": "Python / PyTorch / Torch Hub / Gradio UI",
    "status": "Code Linked",
    "paperTitle": "ZoeDepth: Zero-shot Transfer by Combining Relative and Metric Depth",
    "paperAuthors": "Shariq Farooq Bhat, Reiner Birkl, Diana Wofk, Peter Wonka, Matthias Muller",
    "paperVenue": "arXiv:2302.12288, 2023",
    "paperContribution": "Combines strong relative depth estimation with metric depth heads, allowing monocular depth prediction to generalize across datasets such as NYU Depth V2 and KITTI.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/isl-org/ZoeDepth"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2302.12288"
      },
      {
        "label": "Hugging Face Demo",
        "url": "https://huggingface.co/spaces/shariqfarooq/ZoeDepth"
      },
      {
        "label": "Colab",
        "url": "https://colab.research.google.com/github/isl-org/ZoeDepth"
      }
    ],
    "heroImage": "assets/tools/zoedepth/zoedepth-teaser.png",
    "demos": [
      {
        "label": "Teaser: RGB to metric depth",
        "image": "assets/tools/zoedepth/zoedepth-teaser.png",
        "position": "center center"
      }
    ],
    "apiExample": "# Relative-path local entry for the ZoeDepth tool folder\npython tools/zoedepth/sanity.py\n\n# Torch Hub inference path:\npython tools/zoedepth/examples/infer_depth.py   --image tools/zoedepth/examples/input.jpg   --model ZoeD_N   --output tools/zoedepth/runs/depth_output.png\n\n# Gradio UI path:\npython -m tools/zoedepth.ui.app\n\n# Evaluation examples:\npython tools/zoedepth/evaluate.py -m zoedepth -d nyu\npython tools/zoedepth/evaluate.py -m zoedepth_nk -d nyu\n\n# Suggested repository layout when adding local files:\n# tools/zoedepth/README.md\n# tools/zoedepth/sanity.py\n# tools/zoedepth/evaluate.py\n# tools/zoedepth/ui/app.py\n# tools/zoedepth/examples/input.jpg\n# tools/zoedepth/runs/depth_output.png\n\n# This page documents the path. The static page does not execute ZoeDepth.",
    "shortExplanation": "Upload one RGB image and ZoeDepth predicts a metric depth map that can be used for 3D perception, obstacle reasoning, or scene geometry estimation.",
    "presetExample": {
      "title": "Estimate metric depth",
      "input": "tools/zoedepth/examples/input.jpg",
      "prompt": "Use ZoeD_N for general RGB depth estimation",
      "runLabel": "Estimate depth",
      "expectedOutput": "A metric depth map and optional colored depth visualization saved in the run folder.",
      "image": "assets/tools/zoedepth/zoedepth-teaser.png"
    },
    "parameterNotes": [
      {
        "name": "image",
        "control": "file",
        "meaning": "Single RGB image to convert into a metric depth prediction."
      },
      {
        "name": "model",
        "control": "select",
        "defaultValue": "ZoeD_N",
        "meaning": "Checkpoint variant. ZoeD_N is commonly used for NYU-style indoor depth, while ZoeD_NK targets mixed indoor/outdoor transfer."
      },
      {
        "name": "pretrained_resource",
        "control": "select",
        "defaultValue": "Torch Hub",
        "meaning": "Chooses whether the model is loaded from Torch Hub, local checkpoint, or the repository config."
      },
      {
        "name": "output",
        "control": "path",
        "meaning": "Where to save the raw depth and rendered visualization."
      }
    ],
    "outputNotes": [
      {
        "name": "depth_map",
        "meaning": "Per-pixel metric depth values, typically in meters after model-specific scaling."
      },
      {
        "name": "visualization",
        "meaning": "A colored image for inspection; color is for readability, not the raw numeric result."
      },
      {
        "name": "model_variant",
        "meaning": "The checkpoint used, which affects indoor/outdoor generalization."
      }
    ],
    "deploymentNotes": [
      "Install the official repository requirements, then run the sanity check to confirm checkpoints load.",
      "Use Torch Hub or download official checkpoints before offline inference.",
      "Run single-image inference or the Gradio UI for quick inspection.",
      "For reproducible evaluation, use the repository's evaluate.py commands and official dataset splits."
    ],
    "modelLinks": [
      {
        "label": "Torch Hub Usage",
        "url": "https://github.com/isl-org/ZoeDepth#usage"
      },
      {
        "label": "Checkpoint Links",
        "url": "https://github.com/isl-org/ZoeDepth#pretrained-models"
      }
    ],
    "benchmarkRows": [
      {
        "dataset": "NYU Depth V2",
        "metric": "delta1 / REL / RMSE / log10",
        "value": "0.955 / 0.075 / 0.270 / 0.032 for ZoeD-M12-N",
        "runtime": "42M-345M parameters depending on backbone",
        "source": "ZoeDepth paper"
      },
      {
        "dataset": "KITTI",
        "metric": "REL",
        "value": "0.057 for universal ZoeD-M12-NK",
        "runtime": "Single-image PyTorch inference",
        "source": "ZoeDepth paper"
      }
    ],
    "benchmarkDataset": "NYU Depth V2 official test split, KITTI Eigen/Garg-style split, plus zero-shot indoor/outdoor transfer sets.",
    "benchmarkMetric": "On NYU Depth V2, ZoeD-M12-N reports delta1 0.955, REL 0.075, RMSE 0.270, and log10 0.032. The universal ZoeD-M12-NK reports REL 0.077 on NYU and REL 0.057 on KITTI.",
    "benchmarkLatency": "PyTorch inference depends on backbone and resolution; the paper reports ZoeDepth variants from 42M parameters (Swin2-T) to 345M parameters (BEiT-L).",
    "benchmarkArtifacts": "ZoeDepth paper, NYU/KITTI quantitative tables, Torch Hub entries, sanity scripts, evaluation scripts, Gradio UI, and model configs.",
    "license": "MIT",
    "owner": "isl-org",
    "version": "main branch"
  },
  {
    "slug": "fastsam",
    "title": "FastSAM",
    "category": "Perception and Grounding",
    "task": "Promptable segmentation",
    "summary": "FastSAM is a fast Segment Anything style image segmentation tool that supports everything, point, box, and text prompt modes.",
    "input": "Image + optional prompt",
    "output": "Segmentation masks",
    "runtime": "Python / PyTorch / Gradio / Replicate",
    "status": "Code Linked",
    "paperTitle": "Fast Segment Anything",
    "paperAuthors": "Xu Zhao, Wenchao Ding, Yongqi An, Yingqi Du, Tao Yu, Min Li, Ming Tang, Jinqiao Wang",
    "paperVenue": "arXiv:2306.12156, 2023",
    "paperContribution": "Uses a CNN-based segment-anything model trained on a small fraction of SA-1B to provide SAM-like promptable segmentation at much higher runtime speed.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/CASIA-IVA-Lab/FastSAM"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/2306.12156"
      },
      {
        "label": "Hugging Face Demo",
        "url": "https://huggingface.co/spaces/An-619/FastSAM"
      },
      {
        "label": "Replicate Demo",
        "url": "https://replicate.com/casia-iva-lab/fastsam"
      }
    ],
    "heroImage": "assets/tools/fastsam/eightpic.png",
    "demos": [
      {
        "label": "Segmentation result set",
        "image": "assets/tools/fastsam/eightpic.png",
        "position": "center center"
      },
      {
        "label": "Everything mode UI",
        "image": "assets/tools/fastsam/hf-everything-mode.png",
        "position": "center center"
      },
      {
        "label": "Point prompt UI",
        "image": "assets/tools/fastsam/hf-points-mode.png",
        "position": "center center"
      },
      {
        "label": "Replicate example 1",
        "image": "assets/tools/fastsam/replicate-1.png",
        "position": "center center"
      },
      {
        "label": "Replicate example 2",
        "image": "assets/tools/fastsam/replicate-2.png",
        "position": "center center"
      },
      {
        "label": "Dog prompt input",
        "image": "assets/tools/fastsam/dogs.jpg",
        "position": "center center"
      },
      {
        "label": "Cat image prompt input",
        "image": "assets/tools/fastsam/cat.jpg",
        "position": "center center"
      },
      {
        "label": "Building segmentation",
        "image": "assets/tools/fastsam/building.png",
        "position": "center center"
      }
    ],
    "apiExample": "# Relative-path local entry for the FastSAM tool folder\npython tools/fastsam/Inference.py   --model_path tools/fastsam/weights/FastSAM.pt   --img_path tools/fastsam/images/dogs.jpg\n\n# Prompt modes:\npython tools/fastsam/Inference.py --model_path tools/fastsam/weights/FastSAM.pt   --img_path tools/fastsam/images/dogs.jpg --text_prompt \"the yellow dog\"\npython tools/fastsam/Inference.py --model_path tools/fastsam/weights/FastSAM.pt   --img_path tools/fastsam/images/dogs.jpg --box_prompt \"[[570,200,230,400]]\"\npython tools/fastsam/app_gradio.py\n\n# Suggested repository layout:\n# tools/fastsam/README.md\n# tools/fastsam/Inference.py\n# tools/fastsam/app_gradio.py\n# tools/fastsam/images/\n# tools/fastsam/output/\n\n# This page documents the path. The static page does not execute FastSAM.",
    "shortExplanation": "Upload an image and optionally provide points, boxes, or text prompts; FastSAM returns segmentation masks much faster than the original SAM-style workflow.",
    "presetExample": {
      "title": "Promptable segmentation",
      "input": "tools/fastsam/images/dogs.jpg",
      "prompt": "the yellow dog",
      "runLabel": "Segment object",
      "expectedOutput": "A mask overlay and mask files for the selected object or all objects in the image.",
      "image": "assets/tools/fastsam/hf-points-mode.png"
    },
    "parameterNotes": [
      {
        "name": "img_path",
        "control": "file",
        "meaning": "Image to segment."
      },
      {
        "name": "text_prompt",
        "control": "text",
        "defaultValue": "the yellow dog",
        "meaning": "Text-guided prompt used to select one target region from candidate masks."
      },
      {
        "name": "box_prompt",
        "control": "text",
        "meaning": "Bounding box prompt in pixel coordinates, used when the target region is already localized."
      },
      {
        "name": "point_prompt",
        "control": "text",
        "meaning": "Foreground/background point coordinates for interactive segmentation."
      }
    ],
    "outputNotes": [
      {
        "name": "mask",
        "meaning": "Binary segmentation mask for the selected object or image regions."
      },
      {
        "name": "score",
        "meaning": "Mask confidence or proposal ranking score from the segmentation model."
      },
      {
        "name": "overlay",
        "meaning": "Rendered mask visualization over the input image."
      }
    ],
    "deploymentNotes": [
      "Clone the official FastSAM repository and install PyTorch plus Ultralytics-style dependencies.",
      "Download the official FastSAM checkpoint into tools/fastsam/weights/.",
      "Run Inference.py for image-level tests or app_gradio.py for an interactive local demo.",
      "Store masks and overlays under tools/fastsam/output/ or tools/fastsam/runs/."
    ],
    "modelLinks": [
      {
        "label": "FastSAM Checkpoints",
        "url": "https://github.com/CASIA-IVA-Lab/FastSAM#model-checkpoints"
      },
      {
        "label": "Hugging Face Space",
        "url": "https://huggingface.co/spaces/An-619/FastSAM"
      }
    ],
    "benchmarkRows": [
      {
        "dataset": "COCO object proposal",
        "metric": "Box AR@1000",
        "value": "63.7, reported 1.2 points above SAM-H E32",
        "runtime": "40 ms on one RTX 3090",
        "source": "FastSAM paper"
      },
      {
        "dataset": "LVIS v1",
        "metric": "BBox AR@1000 / AR_s / AR_m / AR_l",
        "value": "57.1 / 44.3 / 77.1 / 85.3",
        "runtime": "68M parameters",
        "source": "FastSAM paper"
      }
    ],
    "benchmarkDataset": "COCO object-proposal evaluation, LVIS v1 zero-shot proposal evaluation, BSDS500 edge detection, and instance-segmentation checks.",
    "benchmarkMetric": "COCO box AR@1000 is 63.7, which is 1.2 points above SAM-H E32 in the reported setup. LVIS v1 bbox AR@1000 is 57.1, with AR_s 44.3, AR_m 77.1, and AR_l 85.3.",
    "benchmarkLatency": "FastSAM reports 40 ms on a single NVIDIA RTX 3090 and 68M parameters; the paper states 50x faster than SAM-H with 32x32 point prompts and 170x faster than SAM-H with 64x64.",
    "benchmarkArtifacts": "FastSAM paper, speed table, COCO/LVIS proposal tables, prompt modes, Gradio demo, Replicate demo, model checkpoints, and output masks.",
    "license": "Apache-2.0",
    "owner": "CASIA-IVA-Lab",
    "version": "main branch"
  },
  {
    "slug": "cutie",
    "title": "Cutie",
    "category": "Perception and Grounding",
    "task": "Video object segmentation",
    "summary": "Cutie is a video object segmentation framework that improves consistency, robustness, and speed while supporting scripting and interactive GUI workflows.",
    "input": "Video frames + initial mask",
    "output": "Tracked object masks",
    "runtime": "Python / PyTorch / interactive GUI",
    "status": "Code Linked",
    "paperTitle": "Putting the Object Back into Video Object Segmentation",
    "paperAuthors": "Ho Kei Cheng, Seoung Wug Oh, Brian Price, Joon-Young Lee, Alexander Schwing",
    "paperVenue": "CVPR 2024 Highlight / arXiv:2310.12982",
    "paperContribution": "Adds a stronger object-centric memory design for video object segmentation, improving temporal consistency and interactive control over previous XMem-style pipelines.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/hkchengrex/Cutie"
      },
      {
        "label": "Project Page",
        "url": "https://hkchengrex.github.io/Cutie/"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2310.12982"
      },
      {
        "label": "Colab",
        "url": "https://colab.research.google.com/drive/1yo43XTbjxuWA7XgCUO9qxAi7wBI6HzvP?usp=sharing"
      }
    ],
    "heroImage": "assets/tools/cutie/bike-00000.jpg",
    "demos": [
      {
        "label": "Bike frame 0",
        "image": "assets/tools/cutie/bike-00000.jpg",
        "position": "center center"
      },
      {
        "label": "Bike frame 1",
        "image": "assets/tools/cutie/bike-00001.jpg",
        "position": "center center"
      },
      {
        "label": "Bike frame 2",
        "image": "assets/tools/cutie/bike-00002.jpg",
        "position": "center center"
      },
      {
        "label": "Bike frame 3",
        "image": "assets/tools/cutie/bike-00003.jpg",
        "position": "center center"
      },
      {
        "label": "Bike first mask",
        "image": "assets/tools/cutie/mask-bike-00000.png",
        "position": "center center"
      },
      {
        "label": "Judo frame 0",
        "image": "assets/tools/cutie/judo-00000.jpg",
        "position": "center center"
      },
      {
        "label": "Judo frame 8",
        "image": "assets/tools/cutie/judo-00008.jpg",
        "position": "center center"
      },
      {
        "label": "Judo frame 15",
        "image": "assets/tools/cutie/judo-00015.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "# Relative-path local entry for the Cutie tool folder\npython tools/cutie/scripting_demo.py\n\n# Add/delete object workflow:\npython tools/cutie/scripting_demo_add_del_objects.py\n\n# Interactive GUI:\npython tools/cutie/interactive_demo.py   --video tools/cutie/examples/example.mp4   --num_objects 1\n\n# Suggested repository layout:\n# tools/cutie/README.md\n# tools/cutie/scripting_demo.py\n# tools/cutie/interactive_demo.py\n# tools/cutie/examples/images/\n# tools/cutie/examples/masks/\n\n# This page documents the path. The static page does not execute Cutie.",
    "shortExplanation": "Provide a video and an initial object mask, then Cutie propagates the object mask through later frames for video object segmentation.",
    "presetExample": {
      "title": "Propagate a video mask",
      "input": "tools/cutie/examples/images/ + tools/cutie/examples/masks/00000.png",
      "prompt": "Track the selected foreground object through the sequence",
      "runLabel": "Track mask",
      "expectedOutput": "A folder of per-frame masks and overlay previews for the tracked object.",
      "image": "assets/tools/cutie/bike-00000.jpg"
    },
    "parameterNotes": [
      {
        "name": "video",
        "control": "file",
        "meaning": "Input video or ordered frame folder."
      },
      {
        "name": "initial_mask",
        "control": "file",
        "meaning": "First-frame mask that defines the object identity to propagate."
      },
      {
        "name": "num_objects",
        "control": "number",
        "defaultValue": "1",
        "meaning": "Number of object identities tracked in the interactive demo."
      },
      {
        "name": "output_dir",
        "control": "path",
        "meaning": "Destination for masks, overlays, and logs."
      }
    ],
    "outputNotes": [
      {
        "name": "mask",
        "meaning": "Per-frame segmentation mask for each tracked object."
      },
      {
        "name": "object_id",
        "meaning": "Stable identity label assigned to the object across the sequence."
      },
      {
        "name": "overlay",
        "meaning": "Preview image showing the mask on top of the video frame."
      }
    ],
    "deploymentNotes": [
      "Install the official Cutie environment and download pretrained weights with the repository script.",
      "Prepare frames and first-frame masks using the example folder structure.",
      "Use scripting_demo.py for reproducible examples or interactive_demo.py for manual annotation workflows.",
      "Save the propagated masks under tools/cutie/examples or a dedicated runs folder."
    ],
    "modelLinks": [
      {
        "label": "Model Weights",
        "url": "https://github.com/hkchengrex/Cutie#download-the-model"
      },
      {
        "label": "Interactive Demo",
        "url": "https://github.com/hkchengrex/Cutie#interactive-demo"
      }
    ],
    "benchmarkRows": [
      {
        "dataset": "MOSE validation",
        "metric": "J&F",
        "value": "68.3 for Cutie-base with MOSE training",
        "runtime": "36.4 FPS on V100",
        "source": "CVPR 2024 paper"
      },
      {
        "dataset": "DAVIS-2017 / YouTubeVOS-2019",
        "metric": "J&F / G",
        "value": "DAVIS val 88.8, DAVIS test 85.3, YouTubeVOS G 86.5",
        "runtime": "Cutie-small 45.5 FPS",
        "source": "Cutie paper"
      }
    ],
    "benchmarkDataset": "MOSE validation, DAVIS-2017 validation/test-dev, YouTubeVOS-2019 validation, plus LVOS and BURST-style long-video checks in the supplement.",
    "benchmarkMetric": "Cutie-base with MOSE training reports MOSE J&F 68.3, DAVIS-17 val J&F 88.8, DAVIS-17 test J&F 85.3, and YouTubeVOS-2019 G 86.5.",
    "benchmarkLatency": "Cutie-base reports 36.4 FPS on V100; Cutie-small with MOSE training reports 45.5 FPS. The paper states +8.7 J&F over XMem and +4.2 J&F over DeAOT on MOSE while being 3x faster than DeAOT.",
    "benchmarkArtifacts": "Cutie paper, MOSE/DAVIS/YouTubeVOS tables, scripting demo, interactive GUI, pretrained model download script, example frames, and masks.",
    "license": "Apache-2.0",
    "owner": "hkchengrex",
    "version": "main branch"
  },
  {
    "slug": "fast-livo2",
    "title": "FAST-LIVO2",
    "category": "Cognition and State Modeling",
    "task": "LiDAR-inertial-visual odometry",
    "summary": "FAST-LIVO2 is a fast direct LiDAR-inertial-visual odometry system for real-time localization, mapping, and 3D reconstruction in degraded environments.",
    "input": "LiDAR + IMU + camera stream",
    "output": "Pose trajectory, local map, reconstruction",
    "runtime": "ROS / C++ / catkin / PCL / OpenCV",
    "status": "Code Linked",
    "paperTitle": "FAST-LIVO2: Fast, Direct LiDAR-Inertial-Visual Odometry",
    "paperAuthors": "Chunran Zheng and HKU-MARS collaborators",
    "paperVenue": "IEEE Transactions on Robotics, 2024 / arXiv:2408.14035",
    "paperContribution": "Fuses LiDAR, inertial, and visual measurements in a direct odometry pipeline to support accurate real-time localization and mapping on robotic platforms.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/hku-mars/FAST-LIVO2"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/2408.14035"
      },
      {
        "label": "Video",
        "url": "https://youtu.be/6dF2DzgbtlY"
      },
      {
        "label": "Dataset",
        "url": "https://github.com/xuankuzcr/Global-LVBA"
      }
    ],
    "heroImage": "assets/tools/fast-livo2/demo-maxresdefault.jpg",
    "demos": [
      {
        "label": "Official demo video frame",
        "image": "assets/tools/fast-livo2/demo-maxresdefault.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "# Relative-path local entry for the FAST-LIVO2 tool folder\ncd tools/fast-livo2/catkin_ws\ncatkin_make\nsource devel/setup.bash\n\nroslaunch fast_livo mapping_avia.launch\nrosbag play tools/fast-livo2/datasets/YOUR_DOWNLOADED.bag\n\n# Alternative launch/config files:\n# tools/fast-livo2/launch/mapping_hesaixt32_hilti22.launch\n# tools/fast-livo2/launch/mapping_ouster_ntu.launch\n# tools/fast-livo2/config/avia.yaml\n# tools/fast-livo2/config/NTU_VIRAL.yaml\n\n# This page documents the path. The static page does not execute FAST-LIVO2.",
    "shortExplanation": "Play synchronized LiDAR, IMU, and camera data through FAST-LIVO2 and it estimates robot pose while building a local map in real time.",
    "presetExample": {
      "title": "Run LiDAR-inertial-visual odometry",
      "input": "tools/fast-livo2/datasets/YOUR_DOWNLOADED.bag",
      "prompt": "mapping_avia.launch with calibrated sensor topics",
      "runLabel": "Launch odometry",
      "expectedOutput": "A pose trajectory, local map, reconstruction outputs, and ROS visualization streams.",
      "image": "assets/tools/fast-livo2/demo-maxresdefault.jpg"
    },
    "parameterNotes": [
      {
        "name": "launch_file",
        "control": "select",
        "defaultValue": "mapping_avia.launch",
        "meaning": "Selects the sensor configuration and topic wiring for a specific LiDAR/camera setup."
      },
      {
        "name": "config",
        "control": "path",
        "defaultValue": "tools/fast-livo2/config/avia.yaml",
        "meaning": "Contains calibration, filter, mapping, and topic parameters."
      },
      {
        "name": "rosbag",
        "control": "file",
        "meaning": "Recorded LiDAR, IMU, and image stream to replay."
      },
      {
        "name": "save_map",
        "control": "toggle",
        "defaultValue": "false",
        "meaning": "Controls whether dense map artifacts are written after the run."
      }
    ],
    "outputNotes": [
      {
        "name": "trajectory",
        "meaning": "Estimated robot pose over time, usually evaluated with APE/RMSE."
      },
      {
        "name": "map",
        "meaning": "LiDAR/visual reconstruction used for localization and inspection."
      },
      {
        "name": "runtime",
        "meaning": "Per-frame processing time split across LiDAR and image updates."
      }
    ],
    "deploymentNotes": [
      "Build the ROS catkin workspace after installing PCL, OpenCV, Ceres, and the dependencies listed by HKU-MARS.",
      "Download a compatible rosbag and confirm camera-LiDAR-IMU calibration paths in the YAML config.",
      "Run the matching launch file, then play the rosbag with simulated time if required.",
      "Export trajectories, maps, and logs under tools/fast-livo2/runs/ for comparison."
    ],
    "modelLinks": [
      {
        "label": "Launch Files",
        "url": "https://github.com/hku-mars/FAST-LIVO2/tree/main/launch"
      },
      {
        "label": "FAST-LIVO2 Dataset Notes",
        "url": "https://github.com/hku-mars/FAST-LIVO2#run-our-dataset"
      }
    ],
    "benchmarkRows": [
      {
        "dataset": "MARS-LVIG AMvalley03",
        "metric": "APE RMSE",
        "value": "0.68 m sequential update vs 3.12 m asynchronous and 2.45 m synchronous-standard",
        "runtime": "30.03 ms average on Intel i7-10700K",
        "source": "FAST-LIVO2 paper"
      },
      {
        "dataset": "Airborne mapping public sequences",
        "metric": "APE RMSE",
        "value": "0.64 m / 0.27 m vs R3LIVE 2.76 m / 0.52 m",
        "runtime": "17.13 ms LiDAR + 12.90 ms image average",
        "source": "FAST-LIVO2 paper"
      }
    ],
    "benchmarkDataset": "Hilti'22, Hilti'23, NTU VIRAL, MARS-LVIG AMvalley03, and the FAST-LIVO2 private degraded-scene dataset.",
    "benchmarkMetric": "Average processing time is 30.03 ms per LiDAR+image frame on an Intel i7-10700K; AMvalley03 sequential update reports APE RMSE 0.68 m versus 3.12 m asynchronous and 2.45 m synchronous-standard.",
    "benchmarkLatency": "Average split is 17.13 ms LiDAR + 12.90 ms image; ARM average is 78.44 ms. Airborne mapping reports APE RMSE 0.64 m / 0.27 m on two public sequences versus R3LIVE 2.76 m / 0.52 m.",
    "benchmarkArtifacts": "FAST-LIVO2 paper and supplement, ROS launch files, YAML configs, runtime table, APE/RMSE reports, evaluation logs, and pose trajectories.",
    "license": "GPLv2",
    "owner": "hku-mars",
    "version": "main branch"
  },
  {
    "slug": "r3live",
    "title": "R3LIVE",
    "category": "Cognition and State Modeling",
    "task": "RGB-colored LIV mapping",
    "summary": "R3LIVE is a tightly-coupled LiDAR-inertial-visual state estimation and mapping tool that reconstructs robust RGB-colored 3D maps in real time.",
    "input": "LiDAR + IMU + camera stream",
    "output": "State estimate, RGB point map, textured reconstruction",
    "runtime": "ROS / C++ / FAST-LIO + visual-inertial mapping",
    "status": "Code Linked",
    "paperTitle": "R3LIVE: A Robust, Real-time, RGB-colored, LiDAR-Inertial-Visual tightly-coupled state Estimation and mapping package",
    "paperAuthors": "Jiarong Lin, Chunran Zheng, Wei Xu, Fu Zhang",
    "paperVenue": "ICRA 2022",
    "paperContribution": "Combines LiDAR-inertial odometry with visual-inertial color rendering to produce robust state estimates and dense RGB-colored maps in challenging environments.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/hku-mars/r3live"
      },
      {
        "label": "Paper PDF",
        "url": "https://github.com/hku-mars/r3live/blob/master/papers/R3LIVE%20--%20A%20Robust%2C%20Real-time%2C%20RGB-colored%2C%20LiDAR-Inertial-Visual%20tightly-coupled%20stateEstimation%20and%20mapping%20package.pdf"
      },
      {
        "label": "Dataset",
        "url": "https://github.com/ziv-lin/r3live_dataset"
      },
      {
        "label": "Video",
        "url": "https://youtu.be/j5fT8NE5fdg"
      }
    ],
    "heroImage": "assets/tools/r3live/cover-half.jpg",
    "demos": [
      {
        "label": "RGB map reconstruction",
        "image": "assets/tools/r3live/cover-half.jpg",
        "position": "center center"
      },
      {
        "label": "HKU campus sequence",
        "image": "assets/tools/r3live/hku-campus-seq-01.png",
        "position": "center center"
      },
      {
        "label": "HKU park sequence",
        "image": "assets/tools/r3live/hku-park-01.jpg",
        "position": "center center"
      },
      {
        "label": "Degenerate scene",
        "image": "assets/tools/r3live/degenerate-01-pic.png",
        "position": "center center"
      },
      {
        "label": "Realtime demo GIF",
        "image": "assets/tools/r3live/hku-demo.gif",
        "position": "center center"
      },
      {
        "label": "HKUST demo GIF",
        "image": "assets/tools/r3live/hkust-demo.gif",
        "position": "center center"
      },
      {
        "label": "Mesh reconstruction",
        "image": "assets/tools/r3live/mesh.png",
        "position": "center center"
      },
      {
        "label": "UE application view",
        "image": "assets/tools/r3live/ue-applications.png",
        "position": "center center"
      }
    ],
    "apiExample": "# Relative-path local entry for the R3LIVE tool folder\ncd tools/r3live/catkin_ws\ncatkin_make\nsource devel/setup.bash\n\nroslaunch r3live r3live_bag.launch\nrosbag play tools/r3live/datasets/YOUR_DOWNLOADED.bag\n\n# Mesh reconstruction utility:\nroslaunch r3live r3live_reconstruct_mesh.launch\n\n# Suggested repository layout:\n# tools/r3live/README.md\n# tools/r3live/r3live/launch/r3live_bag.launch\n# tools/r3live/config/\n# tools/r3live/datasets/\n\n# This page documents the path. The static page does not execute R3LIVE.",
    "shortExplanation": "Run synchronized LiDAR, IMU, and camera streams and R3LIVE estimates state while producing a real-time RGB-colored 3D map.",
    "presetExample": {
      "title": "Create RGB-colored LIV map",
      "input": "tools/r3live/datasets/YOUR_DOWNLOADED.bag",
      "prompt": "Run r3live_bag.launch and visualize the colored map",
      "runLabel": "Build RGB map",
      "expectedOutput": "A state trajectory, RGB-colored point map, and optional mesh reconstruction.",
      "image": "assets/tools/r3live/hku-demo.gif"
    },
    "parameterNotes": [
      {
        "name": "launch_file",
        "control": "select",
        "defaultValue": "r3live_bag.launch",
        "meaning": "ROS launch entry for the dataset or live sensor setup."
      },
      {
        "name": "config",
        "control": "path",
        "meaning": "Sensor calibration, camera model, LiDAR topic, and mapping parameters."
      },
      {
        "name": "rosbag",
        "control": "file",
        "meaning": "Recorded LiDAR-inertial-visual stream to replay."
      },
      {
        "name": "mesh_reconstruction",
        "control": "toggle",
        "defaultValue": "false",
        "meaning": "Runs the additional reconstruction utility after mapping."
      }
    ],
    "outputNotes": [
      {
        "name": "state_estimate",
        "meaning": "Estimated pose, velocity, and sensor state used for localization."
      },
      {
        "name": "rgb_point_map",
        "meaning": "LiDAR map colored by camera information for readable scene reconstruction."
      },
      {
        "name": "mesh",
        "meaning": "Optional reconstructed surface generated from the map output."
      }
    ],
    "deploymentNotes": [
      "Install ROS and the R3LIVE dependencies listed in the official repository.",
      "Build the catkin workspace and verify the Livox/FAST-LIO related packages are available.",
      "Download the official datasets or prepare calibrated live sensor topics.",
      "Launch R3LIVE, replay the rosbag, and save RGB map or mesh outputs for inspection."
    ],
    "modelLinks": [
      {
        "label": "R3LIVE Dataset",
        "url": "https://github.com/ziv-lin/r3live_dataset"
      },
      {
        "label": "Mesh Reconstruction",
        "url": "https://github.com/hku-mars/r3live#mesh-reconstruction"
      }
    ],
    "benchmarkRows": [
      {
        "dataset": "HKUST campus loops",
        "metric": "Loop drift",
        "value": "0.093 m, 0.154 m, 0.164 m, 0.102 m over 1.19-1.52 km trajectories",
        "runtime": "Real-time mapping pipeline",
        "source": "ICRA 2022 paper"
      },
      {
        "dataset": "Runtime table",
        "metric": "Per-frame time",
        "value": "VIO 7.01 ms at 320x256 / 0.10 m, LIO 18.40 ms",
        "runtime": "PC evaluation",
        "source": "R3LIVE paper"
      }
    ],
    "benchmarkDataset": "HKUST campus loop trajectories and Belcher Bay Promenade RTK sequences from the R3LIVE paper.",
    "benchmarkMetric": "Campus loop drift is 0.093 m, 0.154 m, 0.164 m, and 0.102 m over 1,317 m, 1,524 m, 1,372 m, and 1,191 m trajectories. RPE tables report RTE/RRE over 50-300 m sub-sequences.",
    "benchmarkLatency": "PC VIO per-frame cost is 7.01 ms at 320x256 / 0.10 m point resolution, 11.53 ms at 640x512 / 0.10 m, and 13.63 ms at 1280x1024 / 0.10 m; LIO per-frame cost is 18.40 ms.",
    "benchmarkArtifacts": "R3LIVE paper, drift table, RPE table, runtime table, ROS launch files, dataset bags, RGB map outputs, and mesh reconstruction utilities.",
    "license": "GPLv2 for academic/personal use",
    "owner": "hku-mars",
    "version": "master branch"
  },
  {
    "slug": "dust3r",
    "title": "DUSt3R",
    "category": "Cognition and State Modeling",
    "task": "Geometric 3D reconstruction",
    "summary": "DUSt3R is a geometric 3D vision tool that reconstructs pointmaps, camera relationships, and aligned 3D structure from image pairs or multi-view image collections.",
    "input": "Image pair / image set",
    "output": "3D pointmaps, camera poses, confidence maps",
    "runtime": "Python / PyTorch / Gradio demo",
    "status": "Code Linked",
    "paperTitle": "DUSt3R: Geometric 3D Vision Made Easy",
    "paperAuthors": "Shuzhe Wang, Vincent Leroy, Yohann Cabon, Boris Chidlovskii, Jerome Revaud",
    "paperVenue": "CVPR 2024 / arXiv:2312.14132",
    "paperContribution": "Predicts dense 3D pointmaps and confidence directly from images, then supports global alignment for easier stereo, multi-view reconstruction, and visual localization workflows.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/naver/dust3r"
      },
      {
        "label": "Project Page",
        "url": "https://dust3r.europe.naverlabs.com/"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2312.14132"
      },
      {
        "label": "Demo",
        "url": "https://huggingface.co/spaces/naver/DUSt3R"
      }
    ],
    "heroImage": "assets/tools/dust3r/demo.jpg",
    "demos": [
      {
        "label": "Interactive demo result",
        "image": "assets/tools/dust3r/demo.jpg",
        "position": "center center"
      },
      {
        "label": "Pair reconstruction",
        "image": "assets/tools/dust3r/pipeline1.jpg",
        "position": "center center"
      },
      {
        "label": "Image matching",
        "image": "assets/tools/dust3r/matching.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "# Relative-path local entry for the DUSt3R tool folder\npython tools/dust3r/demo.py   --model_name DUSt3R_ViTLarge_BaseDecoder_512_dpt   --local_network\n\n# Local checkpoint example:\npython tools/dust3r/demo.py   --weights tools/dust3r/checkpoints/DUSt3R_ViTLarge_BaseDecoder_512_dpt.pth   --image_size 512\n\n# Programmatic entry points:\n# tools/dust3r/dust3r/inference.py\n# tools/dust3r/dust3r/model.py\n# tools/dust3r/dust3r/cloud_opt/\n# tools/dust3r/visloc.py\n\n# This page documents the path. The static page does not execute DUSt3R.",
    "shortExplanation": "Upload two or more images and DUSt3R predicts dense 3D pointmaps, confidence maps, and camera relationships without a traditional SfM preprocessing pipeline.",
    "presetExample": {
      "title": "Reconstruct 3D from images",
      "input": "tools/dust3r/examples/images/",
      "prompt": "Use 512px ViT-Large checkpoint and global alignment",
      "runLabel": "Reconstruct scene",
      "expectedOutput": "Aligned 3D point cloud, pair confidence maps, and camera pose estimates.",
      "image": "assets/tools/dust3r/demo.jpg"
    },
    "parameterNotes": [
      {
        "name": "images",
        "control": "file",
        "meaning": "Image pair or image collection used for reconstruction."
      },
      {
        "name": "model_name",
        "control": "select",
        "defaultValue": "DUSt3R_ViTLarge_BaseDecoder_512_dpt",
        "meaning": "Pretrained checkpoint used for pointmap and confidence prediction."
      },
      {
        "name": "image_size",
        "control": "select",
        "defaultValue": "512",
        "meaning": "Input resolution used by the pretrained model."
      },
      {
        "name": "global_alignment",
        "control": "toggle",
        "defaultValue": "true",
        "meaning": "Optimizes multiple pair predictions into one coherent scene."
      }
    ],
    "outputNotes": [
      {
        "name": "pointmaps",
        "meaning": "Dense 3D points predicted for each image in a shared or alignable coordinate frame."
      },
      {
        "name": "confidence",
        "meaning": "Per-pixel confidence values that help filter unreliable geometry."
      },
      {
        "name": "camera_poses",
        "meaning": "Estimated camera relationships recovered during pair inference or global alignment."
      }
    ],
    "deploymentNotes": [
      "Clone the official DUSt3R repository and install the PyTorch/Gradio dependencies.",
      "Download the official 512px pretrained checkpoint or let the demo resolve the model name.",
      "Run demo.py for the local UI or call the inference and global alignment modules programmatically.",
      "Export point clouds, confidence maps, and visualizations under tools/dust3r/runs/."
    ],
    "modelLinks": [
      {
        "label": "DUSt3R Checkpoints",
        "url": "https://github.com/naver/dust3r#checkpoints"
      },
      {
        "label": "Hugging Face Demo",
        "url": "https://huggingface.co/spaces/naver/DUSt3R"
      }
    ],
    "benchmarkRows": [
      {
        "dataset": "CO3Dv2",
        "metric": "RRA@15 / RTA@15 / mAA@30",
        "value": "96.2 / 86.8 / 76.7 with global alignment",
        "runtime": "512px model",
        "source": "CVPR 2024 paper"
      },
      {
        "dataset": "DTU zero-shot MVS",
        "metric": "Accuracy / completeness / overall",
        "value": "2.677 mm / 0.805 mm / 1.741 mm",
        "runtime": "Multi-view global alignment",
        "source": "DUSt3R paper"
      }
    ],
    "benchmarkDataset": "CO3Dv2 and RealEstate10K multi-view pose; DTU, ETH3D, Tanks and Temples, ScanNet, 7Scenes, and Cambridge-Landmarks evaluation tables.",
    "benchmarkMetric": "DUSt3R 512 with global alignment reports CO3Dv2 RRA@15 96.2, RTA@15 86.8, mAA@30 76.7, and RealEstate10K mAA@30 67.7. DTU zero-shot MVS reports accuracy 2.677 mm, completeness 0.805 mm, and overall 1.741 mm.",
    "benchmarkLatency": "All main results use the same 512px model; multi-view global alignment scales with image count and pair count. The supplement reports training on about 8.5M extracted image pairs.",
    "benchmarkArtifacts": "DUSt3R paper, MVS/pose/depth tables, Gradio demo, pretrained checkpoints, pointmaps, confidence maps, and global alignment outputs.",
    "license": "CC BY-NC-SA 4.0",
    "owner": "naver",
    "version": "main branch"
  },
  {
    "slug": "tool-entry-template",
    "title": "Tool Entry Template",
    "category": "Perception and Grounding",
    "task": "Perception",
    "summary": "Template for visual recognition, localization, scene grounding, and perception-facing tool entries.",
    "input": "Images / text / state",
    "output": "Grounding result",
    "runtime": "Template",
    "status": "Draft",
    "paperLinks": []
  },
  {
    "slug": "paper-backed-tool-template",
    "title": "Paper-backed Tool Template",
    "category": "Cognition and State Modeling",
    "task": "State",
    "summary": "Template for tools derived from papers, with space for method diagrams, citations, artifacts, and implementation notes.",
    "input": "Paper / method notes",
    "output": "State model artifact",
    "runtime": "Template",
    "status": "Draft",
    "paperLinks": []
  },
  {
    "slug": "api-tool-template",
    "title": "Code Tool Template",
    "category": "Reasoning and Planning",
    "task": "Planning",
    "summary": "Template for tools with local entry paths, parameters, response schema, examples, and integration notes.",
    "input": "Relative path / request JSON",
    "output": "Plan / response schema",
    "runtime": "Code template",
    "status": "Draft",
    "paperLinks": []
  },
  {
    "slug": "execution-tool-template",
    "title": "Execution Tool Template",
    "category": "Execution and Control",
    "task": "Control",
    "summary": "Template for policies, controllers, runtime wrappers, rollouts, videos, traces, and benchmark artifacts.",
    "input": "State / action request",
    "output": "Action trace",
    "runtime": "Runtime template",
    "status": "Draft",
    "paperLinks": []
  }
];

export const realTools = tools.filter((tool) => tool.status !== "Draft");

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function searchTextForTool(tool: Tool) {
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
    tool.license
  ].filter(Boolean).join(" ").toLowerCase();
}
