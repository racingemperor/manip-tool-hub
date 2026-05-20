import type { ToolCategory } from "./tools";

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
    "note": "Detection, depth, segmentation, video masks, and grasp perception are ranked only within their comparable task scope."
  },
  {
    "name": "Cognition and State Modeling",
    "primary": "State quality / reconstruction / trajectory metric",
    "note": "Spatial state tools use accuracy, map quality, reconstruction quality, and robustness as primary evidence."
  },
  {
    "name": "Reasoning and Planning",
    "primary": "Task success / plan quality",
    "note": "Ready for planning tools once real entries replace the draft template."
  },
  {
    "name": "Execution and Control",
    "primary": "Success rate / rollout quality",
    "note": "Ready for controllers and execution policies once real entries replace the draft template."
  }
];

export const leaderboardRows: LeaderboardRow[] = [
  {
    "slug": "yolo-world",
    "name": "YOLO-World",
    "category": "Perception and Grounding",
    "task": "Open-vocabulary detection",
    "dataset": "LVIS minival zero-shot, 1,203 categories",
    "metric": "Fixed AP 35.4; AP_r 27.6 / AP_c 34.1 / AP_f 38.0",
    "scoreLabel": "35.4 AP",
    "speed": "52.0 FPS on one NVIDIA V100 without TensorRT",
    "size": "YOLOv8-L: 48M re-parameterized params; 110M original",
    "artifacts": [
      "Paper",
      "Demo",
      "ONNX",
      "Weights"
    ],
    "rankOrder": 1,
    "completeness": 4,
    "speedRank": 1,
    "sizeRank": 2,
    "href": "/tools/yolo-world"
  },
  {
    "slug": "fastsam",
    "name": "FastSAM",
    "category": "Perception and Grounding",
    "task": "Promptable segmentation",
    "dataset": "COCO object proposals + LVIS v1 zero-shot proposals",
    "metric": "COCO box AR@1000 63.7; LVIS bbox AR@1000 57.1",
    "scoreLabel": "63.7 AR@1000",
    "speed": "40 ms on RTX 3090; 50x faster than SAM-H 32x32 prompt setting",
    "size": "68M parameters",
    "artifacts": [
      "Paper",
      "Demo",
      "Gradio",
      "Replicate"
    ],
    "rankOrder": 4,
    "completeness": 4,
    "speedRank": 2,
    "sizeRank": 3,
    "href": "/tools/fastsam"
  },
  {
    "slug": "cutie",
    "name": "Cutie",
    "category": "Perception and Grounding",
    "task": "Video object segmentation",
    "dataset": "MOSE val + DAVIS-17 + YouTubeVOS-2019",
    "metric": "MOSE J&F 68.3; DAVIS-17 val J&F 88.8; YT-VOS G 86.5",
    "scoreLabel": "68.3 J&F",
    "speed": "36.4 FPS on V100 for Cutie-base with MOSE training",
    "size": "Cutie-small reports 45.5 FPS; base reports 36.4 FPS",
    "artifacts": [
      "Paper",
      "GUI",
      "Demo",
      "Masks"
    ],
    "rankOrder": 3,
    "completeness": 4,
    "speedRank": 4,
    "sizeRank": 4,
    "href": "/tools/cutie"
  },
  {
    "slug": "anygrasp",
    "name": "AnyGrasp",
    "category": "Perception and Grounding",
    "task": "6-DoF grasp perception",
    "dataset": "Real bin-picking test with 300+ unseen objects",
    "metric": "Attempt-centric success 93.3%; object-centric completion 99.8%",
    "scoreLabel": "93.3% success",
    "speed": "100 ms grasp prediction; <200 ms decision; 900+ MPPH single UR5 arm",
    "size": "7-DoF grasp perception SDK; trained with 144 real objects / 268 scenes",
    "artifacts": [
      "Paper",
      "Demo",
      "RGB-D",
      "SDK"
    ],
    "rankOrder": 2,
    "completeness": 4,
    "speedRank": 5,
    "sizeRank": 5,
    "href": "/tools/anygrasp"
  },
  {
    "slug": "zoedepth",
    "name": "ZoeDepth",
    "category": "Perception and Grounding",
    "task": "Metric depth estimation",
    "dataset": "NYU Depth V2 / KITTI Eigen splits",
    "metric": "NYU ZoeD-M12-N: REL 0.075, RMSE 0.270, delta1 0.955",
    "scoreLabel": "0.075 REL",
    "speed": "Model-dependent PyTorch inference; official paper reports 42M-345M params by backbone",
    "size": "BEiT-L ZoeDepth 345M params; Swin2-T variant 42M params",
    "artifacts": [
      "Paper",
      "Torch Hub",
      "Gradio",
      "Configs"
    ],
    "rankOrder": 5,
    "completeness": 4,
    "speedRank": 6,
    "sizeRank": 6,
    "href": "/tools/zoedepth"
  },
  {
    "slug": "dust3r",
    "name": "DUSt3R",
    "category": "Cognition and State Modeling",
    "task": "Geometric 3D reconstruction",
    "dataset": "CO3Dv2 / RealEstate10K pose; DTU / ETH3D / T&T reconstruction",
    "metric": "CO3Dv2 RRA@15 96.2; RealEstate10K mAA@30 67.7; DTU overall 1.741 mm",
    "scoreLabel": "96.2 RRA@15",
    "speed": "512px inference; multi-view alignment runtime scales with image pairs",
    "size": "ViT-Large 512px checkpoint; trained on about 8.5M image pairs",
    "artifacts": [
      "Paper",
      "Demo UI",
      "Checkpoints",
      "Pointmaps"
    ],
    "rankOrder": 2,
    "completeness": 4,
    "speedRank": 3,
    "sizeRank": 4,
    "href": "/tools/dust3r"
  },
  {
    "slug": "fast-livo2",
    "name": "FAST-LIVO2",
    "category": "Cognition and State Modeling",
    "task": "LiDAR-inertial-visual odometry",
    "dataset": "Hilti'22 / Hilti'23 / NTU VIRAL / private FAST-LIVO2 sequences",
    "metric": "Average processing 30.03 ms; AMvalley03 APE RMSE 0.68 m in sequential update",
    "scoreLabel": "30.03 ms",
    "speed": "Average 17.13 ms LiDAR + 12.90 ms image per frame; ARM average 78.44 ms",
    "size": "C++ / ROS package; runs real-time at 10 Hz",
    "artifacts": [
      "Paper",
      "ROS",
      "Configs",
      "Trajectories"
    ],
    "rankOrder": 1,
    "completeness": 4,
    "speedRank": 1,
    "sizeRank": 1,
    "href": "/tools/fast-livo2"
  },
  {
    "slug": "r3live",
    "name": "R3LIVE",
    "category": "Cognition and State Modeling",
    "task": "RGB-colored LIV mapping",
    "dataset": "HKUST campus loop + Belcher Bay RTK sequences",
    "metric": "Campus drift: 0.093-0.164 m over 1,191-1,524 m trajectories",
    "scoreLabel": "0.093 m drift",
    "speed": "PC VIO 7.01 ms at 320x256 / 0.10 m; LIO 18.40 ms per frame",
    "size": "C++ / ROS; onboard VIO 15.00 ms at 320x256 / 0.10 m",
    "artifacts": [
      "Paper",
      "ROS",
      "Dataset",
      "Meshes"
    ],
    "rankOrder": 3,
    "completeness": 4,
    "speedRank": 2,
    "sizeRank": 2,
    "href": "/tools/r3live"
  },
  {
    "slug": "hydra",
    "name": "Hydra",
    "category": "Cognition and State Modeling",
    "task": "3D scene graph construction",
    "dataset": "uHumans2 Apartment / Office / Subway + SidPac floors",
    "metric": "Office timing: objects 24.1+/-12.8 ms, places 8.1+/-1.3 ms, rooms 19.0+/-12.3 ms",
    "scoreLabel": "24.1 ms obj",
    "speed": "Xavier NX Office: objects 75+/-35 ms, places 33+/-6 ms, rooms 55+/-41 ms at 5 Hz target",
    "size": "ROS2 / Python bindings / scene graph stack",
    "artifacts": [
      "Paper",
      "ROS2",
      "GIF",
      "Configs"
    ],
    "rankOrder": 4,
    "completeness": 4,
    "speedRank": 4,
    "sizeRank": 5,
    "href": "/tools/hydra"
  },
  {
    "slug": "physvlm_avr",
    "name": "PhysVLM-AVR",
    "category": "Cognition and State Modeling",
    "task": "Active visual reasoning",
    "dataset": "CLEVR-AVR and RoboVQA",
    "metric": "CLEVR-AVR accuracy 84.2%; RoboVQA accuracy 78.0%",
    "scoreLabel": "84.2% acc",
    "speed": "Local deployment uses an interactive FastAPI server; source paper accuracy is reported without a bundled latency table in this workspace",
    "size": "3B multimodal model trained with AVR-152k (152k samples)",
    "artifacts": [
      "Paper",
      "Repo",
      "Demo",
      "JSON"
    ],
    "rankOrder": 5,
    "completeness": 4,
    "speedRank": 5,
    "sizeRank": 3,
    "href": "/tools/physvlm_avr"
  },
  {
    "slug": "virf",
    "name": "VIRF",
    "category": "Cognition and State Modeling",
    "task": "Safety-verified task reasoning",
    "dataset": "SafeAgentBench",
    "metric": "Harmful action rate 0.0%; goal completion rate 77.3%; average correction iterations 1.1",
    "scoreLabel": "77.3% GCR",
    "speed": "Average correction iterations 1.1; the bundled local demo does not include a source-reported wall-clock latency table",
    "size": "Hybrid planner-verifier stack with scene KG and ontology rules",
    "artifacts": [
      "Paper",
      "Repo",
      "Rules",
      "JSON"
    ],
    "rankOrder": 6,
    "completeness": 4,
    "speedRank": 6,
    "sizeRank": 6,
    "href": "/tools/virf"
  }
];
