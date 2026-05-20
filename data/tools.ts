export type ToolCategory = "Perception and Grounding" | "Cognition and State Modeling" | "Reasoning and Planning" | "Execution and Control";

export type ToolStatus = "Draft" | "Docs Ready" | "Code Linked" | "Runnable" | "Verified";

export type ToolDemo = {
  label: string;
  image?: string;
  video?: string;
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

const executionControlTools: Tool[] = [
  {
    "slug": "dense-object-nets",
    "title": "Dense Object Nets",
    "category": "Execution and Control",
    "task": "Dense visual correspondence for manipulation",
    "summary": "Dense Object Nets learn pixel-level object descriptors that let a robot identify corresponding points across views and use them as manipulation targets.",
    "input": "RGB images + query pixels or object views",
    "output": "Dense descriptors and point correspondences",
    "runtime": "Python / PyTorch research code",
    "status": "Code Linked",
    "paperTitle": "Dense Object Nets: Learning Dense Visual Object Descriptors By and For Robotic Manipulation",
    "paperAuthors": "Peter R. Florence, Lucas Manuelli, Russ Tedrake",
    "paperVenue": "CoRL 2018",
    "paperContribution": "Shows that self-supervised dense descriptors can provide object-centric correspondence signals for robotic manipulation policies.",
    "paperLinks": [
      {
        "label": "PMLR",
        "url": "https://proceedings.mlr.press/v87/florence18a.html"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1806.08756"
      }
    ],
    "demos": [
      {
        "label": "Dense Object Nets overview",
        "image": "assets/tools/dense-object-nets/don-figure1.png",
        "position": "center center"
      },
      {
        "label": "Descriptor learning pipeline",
        "image": "assets/tools/dense-object-nets/don-figure2.png",
        "position": "center center"
      },
      {
        "label": "Dense descriptor correspondence",
        "image": "assets/tools/dense-object-nets/don-figure3.png",
        "position": "center center"
      }
    ],
    "apiExample": "# Follow the official Dense Object Nets repository and paper setup.\n# Typical use: train descriptors on object views, then query descriptor matches for manipulation points.",
    "shortExplanation": "Use Dense Object Nets when a manipulation system needs to track or re-identify a specific point on an object across camera views.",
    "parameterNotes": [
      {
        "name": "source_image",
        "control": "file",
        "meaning": "Image containing the point or object part to match."
      },
      {
        "name": "query_pixel",
        "control": "text",
        "meaning": "Pixel coordinate whose descriptor should be matched in another view."
      },
      {
        "name": "target_image",
        "control": "file",
        "meaning": "Image where the corresponding object point should be found."
      }
    ],
    "outputNotes": [
      {
        "name": "descriptor_map",
        "meaning": "Dense per-pixel visual descriptor representation."
      },
      {
        "name": "matched_pixel",
        "meaning": "Predicted corresponding point in the target image."
      }
    ],
    "deploymentNotes": [
      "Prepare multi-view object images or robot-collected observations.",
      "Train or load the descriptor model following the official project instructions.",
      "Use nearest-neighbor descriptor matches to recover manipulation-relevant object points."
    ],
    "benchmarkDataset": "The paper evaluates dense correspondence and manipulation tasks with robot-collected object views.",
    "benchmarkArtifacts": "Paper figures, descriptor visualizations, correspondence examples, and manipulation demonstrations."
  },
  {
    "slug": "octomap",
    "title": "OctoMap",
    "category": "Execution and Control",
    "task": "3D occupancy mapping",
    "summary": "OctoMap is a probabilistic 3D occupancy mapping framework based on octrees, commonly used for collision checking, navigation, and planning around observed space.",
    "input": "Point clouds or range measurements",
    "output": "Probabilistic 3D occupancy map",
    "runtime": "C++ / ROS integration",
    "status": "Code Linked",
    "paperTitle": "OctoMap: An Efficient Probabilistic 3D Mapping Framework Based on Octrees",
    "paperAuthors": "Armin Hornung, Kai M. Wurm, Maren Bennewitz, Cyrill Stachniss, Wolfram Burgard",
    "paperVenue": "Autonomous Robots 2013",
    "paperContribution": "Represents occupied, free, and unknown space compactly in an octree so robots can query 3D geometry for navigation and manipulation safety.",
    "paperLinks": [
      {
        "label": "Website",
        "url": "https://octomap.github.io/"
      },
      {
        "label": "GitHub",
        "url": "https://github.com/OctoMap/octomap"
      },
      {
        "label": "Paper",
        "url": "https://www.arminhornung.de/Research/pub/hornung13auro.pdf"
      }
    ],
    "demos": [
      {
        "label": "Indoor 3D occupancy map",
        "image": "assets/tools/octomap/freiburg-079.png",
        "position": "center center"
      },
      {
        "label": "Outdoor 3D occupancy map",
        "image": "assets/tools/octomap/freiburg-outdoor.png",
        "position": "center center"
      }
    ],
    "apiExample": "# ROS users typically publish point clouds and consume octomap_server outputs.\nros2 run octomap_server octomap_server_node",
    "shortExplanation": "Use OctoMap when execution needs a compact 3D map for free-space, obstacle, and unknown-space queries.",
    "parameterNotes": [
      {
        "name": "resolution",
        "control": "number",
        "meaning": "Voxel size of the octree map."
      },
      {
        "name": "point_cloud",
        "control": "file",
        "meaning": "3D measurements used to update occupancy probabilities."
      }
    ],
    "outputNotes": [
      {
        "name": "occupancy_tree",
        "meaning": "Octree storing occupied, free, and unknown cells."
      },
      {
        "name": "query_result",
        "meaning": "Occupancy state for a requested 3D location or region."
      }
    ],
    "deploymentNotes": [
      "Install OctoMap directly or through the ROS integration packages.",
      "Feed depth, LiDAR, or fused point-cloud observations into the map updater.",
      "Query the resulting map before planning motions through partially observed scenes."
    ],
    "license": "BSD-3-Clause",
    "owner": "OctoMap"
  },
  {
    "slug": "actpermoma",
    "title": "ActPerMoMa",
    "category": "Execution and Control",
    "task": "Active perception for mobile manipulation",
    "summary": "ActPerMoMa chooses informative base and camera motions so a mobile manipulator can improve object perception before acting.",
    "input": "Scene belief + robot state + manipulation target",
    "output": "Active perception or manipulation action",
    "runtime": "Python / Isaac Sim research code",
    "status": "Code Linked",
    "paperTitle": "ActPerMoMa: Active Perception for Mobile Manipulation",
    "paperVenue": "CoRL 2023",
    "paperContribution": "Couples active perception with mobile manipulation so the robot can move to better viewpoints before executing a task.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/pearl-robot-lab/ActPerMoMa"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/2310.00433"
      }
    ],
    "heroImage": "assets/tools/actpermoma/actpermoma.gif",
    "demos": [
      {
        "label": "Active perception demo",
        "image": "assets/tools/actpermoma/actpermoma.gif",
        "position": "center center"
      }
    ],
    "apiExample": "# Follow the official ActPerMoMa environment setup, then run the provided policy/evaluation scripts in Isaac Sim.",
    "shortExplanation": "Use ActPerMoMa when a robot should actively move to reduce uncertainty before grasping or manipulating an object.",
    "parameterNotes": [
      {
        "name": "scene_state",
        "control": "path",
        "meaning": "Current perception state or simulator observation."
      },
      {
        "name": "target_object",
        "control": "text",
        "meaning": "Object or goal that drives the active perception objective."
      }
    ],
    "outputNotes": [
      {
        "name": "viewpoint_action",
        "meaning": "Motion selected to improve perception of the target."
      },
      {
        "name": "manipulation_action",
        "meaning": "Action proposed after the perception state is sufficiently informative."
      }
    ],
    "deploymentNotes": [
      "Set up the official simulation environment and assets.",
      "Provide the robot state, scene observation, and manipulation target.",
      "Run the active perception policy before issuing final manipulation actions."
    ],
    "owner": "PEARL Robot Lab"
  },
  {
    "slug": "nav2",
    "title": "Nav2",
    "category": "Execution and Control",
    "task": "ROS 2 navigation",
    "summary": "Nav2 is the ROS 2 navigation stack for planning, controlling, recovering, and executing autonomous robot navigation tasks.",
    "input": "Map, localization, costmaps, start and goal poses",
    "output": "Path, velocity commands, behavior-tree execution state",
    "runtime": "ROS 2 / C++ / Python launch files",
    "status": "Code Linked",
    "paperTitle": "Navigation2: A ROS 2 Navigation Framework",
    "paperContribution": "Provides modular planners, controllers, costmaps, recoveries, and behavior-tree orchestration for robot navigation.",
    "paperLinks": [
      {
        "label": "Website",
        "url": "https://nav2.org/"
      },
      {
        "label": "Docs",
        "url": "https://docs.nav2.org/"
      },
      {
        "label": "GitHub",
        "url": "https://github.com/ros-navigation/navigation2"
      }
    ],
    "demos": [
      {
        "label": "Map in RViz",
        "image": "assets/tools/nav2/map-rviz.png",
        "position": "center center"
      },
      {
        "label": "Global costmap",
        "image": "assets/tools/nav2/global-costmap.png",
        "position": "center center"
      },
      {
        "label": "Local costmap",
        "image": "assets/tools/nav2/local-costmap.png",
        "position": "center center"
      }
    ],
    "apiExample": "ros2 launch nav2_bringup navigation_launch.py\nros2 action send_goal /navigate_to_pose nav2_msgs/action/NavigateToPose '{pose: ...}'",
    "shortExplanation": "Use Nav2 to send a mobile robot from its current pose to a goal while handling planning, control, and recovery behaviors.",
    "parameterNotes": [
      {
        "name": "map",
        "control": "path",
        "meaning": "Occupancy map and metadata used by global planning."
      },
      {
        "name": "goal_pose",
        "control": "text",
        "meaning": "Target x, y, and orientation for navigation."
      },
      {
        "name": "behavior_tree",
        "control": "path",
        "meaning": "Behavior tree that coordinates planning, control, and recovery."
      }
    ],
    "outputNotes": [
      {
        "name": "planned_path",
        "meaning": "Path returned by the selected global planner."
      },
      {
        "name": "cmd_vel",
        "meaning": "Velocity commands produced by the controller."
      },
      {
        "name": "navigation_result",
        "meaning": "Action status and recovery outcome for the navigation request."
      }
    ],
    "deploymentNotes": [
      "Install the Nav2 packages matching the target ROS 2 distribution.",
      "Configure maps, localization, planners, controllers, costmaps, and behavior trees.",
      "Use RViz and action feedback to inspect paths, costmaps, and execution status."
    ],
    "license": "Apache-2.0",
    "owner": "ros-navigation"
  },
  {
    "slug": "pinocchio",
    "title": "Pinocchio",
    "category": "Execution and Control",
    "task": "Rigid-body dynamics and kinematics",
    "summary": "Pinocchio is a fast rigid-body dynamics library used for robot kinematics, inverse dynamics, Jacobians, and model-based control computations.",
    "input": "Robot model, joint state, target pose, velocities or accelerations",
    "output": "Kinematic quantities, dynamics terms, torques, Jacobians",
    "runtime": "C++ / Python bindings",
    "status": "Code Linked",
    "paperTitle": "Pinocchio: Fast Forward and Inverse Dynamics for Poly-Articulated Systems",
    "paperContribution": "Provides efficient algorithms and bindings for model-based robot control, planning, and dynamics computations.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/stack-of-tasks/pinocchio"
      },
      {
        "label": "Docs",
        "url": "https://stack-of-tasks.github.io/pinocchio/"
      }
    ],
    "demos": [
      {
        "label": "Pinocchio project identity",
        "image": "assets/tools/pinocchio/pinocchio-logo.png",
        "position": "center center"
      },
      {
        "label": "Performance figure",
        "image": "assets/tools/pinocchio/pinocchio-performances.png",
        "position": "center center"
      }
    ],
    "apiExample": "import pinocchio as pin\nmodel = pin.buildModelFromUrdf('robot.urdf')\ndata = model.createData()\npin.forwardKinematics(model, data, q)",
    "shortExplanation": "Use Pinocchio when execution code needs fast kinematics, inverse dynamics, or model-based control terms.",
    "parameterNotes": [
      {
        "name": "robot_model",
        "control": "path",
        "meaning": "URDF or model description loaded into Pinocchio."
      },
      {
        "name": "q",
        "control": "text",
        "meaning": "Robot joint configuration."
      },
      {
        "name": "v_or_a",
        "control": "text",
        "meaning": "Joint velocity or acceleration vector depending on the requested algorithm."
      }
    ],
    "outputNotes": [
      {
        "name": "kinematics",
        "meaning": "Frame placements, Jacobians, and related kinematic quantities."
      },
      {
        "name": "dynamics",
        "meaning": "Mass matrix, Coriolis, gravity, or inverse-dynamics torque terms."
      }
    ],
    "deploymentNotes": [
      "Install Pinocchio from conda, robotpkg, source, or the official package route for the target platform.",
      "Load the robot model and create data structures once per control process.",
      "Call the required kinematics or dynamics routines inside the planner or controller."
    ],
    "owner": "stack-of-tasks"
  },
  {
    "slug": "ruckig",
    "title": "Ruckig",
    "category": "Execution and Control",
    "task": "Jerk-limited trajectory generation",
    "summary": "Ruckig generates time-optimal trajectories under velocity, acceleration, and jerk limits for smooth robot motion commands.",
    "input": "Current state, target state, velocity/acceleration/jerk limits",
    "output": "Time-parameterized trajectory samples",
    "runtime": "C++ / Python package",
    "status": "Code Linked",
    "paperTitle": "Jerk-limited Real-time Trajectory Generation with Arbitrary Target States",
    "paperVenue": "RSS 2021",
    "paperContribution": "Computes online, jerk-limited motion profiles that can be used directly in robot controllers.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/pantor/ruckig"
      },
      {
        "label": "Docs",
        "url": "https://docs.ruckig.com/"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/2105.04830"
      }
    ],
    "demos": [
      {
        "label": "Trajectory profile",
        "image": "assets/tools/ruckig/example-profile.png",
        "position": "center center"
      },
      {
        "label": "Benchmark figure",
        "image": "assets/tools/ruckig/benchmark.png",
        "position": "center center"
      }
    ],
    "apiExample": "from ruckig import Ruckig, InputParameter, OutputParameter\notg = Ruckig(6, 0.001)\n# Fill current state, target state, and limits, then call update in the control loop.",
    "shortExplanation": "Use Ruckig to retime robot joint or Cartesian commands into smooth jerk-limited trajectories before execution.",
    "parameterNotes": [
      {
        "name": "current_state",
        "control": "text",
        "meaning": "Current positions, velocities, and accelerations."
      },
      {
        "name": "target_state",
        "control": "text",
        "meaning": "Desired target positions, velocities, and accelerations."
      },
      {
        "name": "limits",
        "control": "text",
        "meaning": "Velocity, acceleration, and jerk limits for each degree of freedom."
      }
    ],
    "outputNotes": [
      {
        "name": "trajectory",
        "meaning": "Smooth trajectory samples or online control states."
      },
      {
        "name": "duration",
        "meaning": "Total trajectory duration under the configured limits."
      }
    ],
    "deploymentNotes": [
      "Install the C++ library or Python package.",
      "Set per-axis limits according to the robot controller and safety constraints.",
      "Call Ruckig online in the servo loop or offline for trajectory retiming."
    ],
    "owner": "pantor"
  },
  {
    "slug": "ompl",
    "title": "OMPL",
    "category": "Execution and Control",
    "task": "Motion planning",
    "summary": "The Open Motion Planning Library provides sampling-based motion planners for robots, vehicles, and high-dimensional configuration spaces.",
    "input": "State space, validity checker, start and goal states",
    "output": "Collision-free path or planning failure",
    "runtime": "C++ / Python bindings / MoveIt integration",
    "status": "Code Linked",
    "paperTitle": "The Open Motion Planning Library",
    "paperVenue": "IEEE Robotics & Automation Magazine 2012",
    "paperContribution": "Provides a reusable library of sampling-based planners and state-space abstractions for robot motion planning.",
    "paperLinks": [
      {
        "label": "Website",
        "url": "https://ompl.kavrakilab.org/"
      },
      {
        "label": "GitHub",
        "url": "https://github.com/ompl/ompl"
      }
    ],
    "demos": [
      {
        "label": "Rigid-body planning example",
        "image": "assets/tools/ompl/r2-path.jpg",
        "position": "center center"
      },
      {
        "label": "Mobile manipulation example",
        "image": "assets/tools/ompl/fetch-mmp.png",
        "position": "center center"
      }
    ],
    "apiExample": "# Define an OMPL state space, state validity checker, start and goal states, then solve with a planner such as RRTConnect or PRM.",
    "shortExplanation": "Use OMPL when execution needs a collision-free motion plan through a robot configuration space.",
    "parameterNotes": [
      {
        "name": "state_space",
        "control": "select",
        "meaning": "Configuration-space representation used by the planner."
      },
      {
        "name": "validity_checker",
        "control": "path",
        "meaning": "Function that rejects states in collision or outside constraints."
      },
      {
        "name": "start_goal",
        "control": "text",
        "meaning": "Initial and target states for the planning problem."
      }
    ],
    "outputNotes": [
      {
        "name": "solution_path",
        "meaning": "Collision-free path returned by the planner."
      },
      {
        "name": "planner_status",
        "meaning": "Solved, approximate, timeout, or failure status."
      }
    ],
    "deploymentNotes": [
      "Install OMPL directly or through robotics frameworks such as MoveIt.",
      "Define the state space and collision/validity checker for the robot and scene.",
      "Choose a planner and solve within the allotted planning time."
    ],
    "license": "BSD-3-Clause",
    "owner": "Kavraki Lab"
  }
];

export const tools: Tool[] = [
  ...executionControlTools,
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
    "heroImage": "assets/tools/dust3r/matching.jpg",
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
    "slug": "query-3d-scene-graph",
    "title": "query_3d_scene_graph",
    "category": "Cognition and State Modeling",
    "task": "Queryable 3D scene memory",
    "summary": "Queries a stored 3D scene graph to recover previously observed object locations and spatial relations.",
    "input": "Scene graph + object query + relation query",
    "output": "Object matches, 3D positions, neighbor relations, confidence",
    "runtime": "Local / hybrid wrapper",
    "status": "Runnable",
    "paperTitle": "SceneGraphFusion-style queryable memory tool",
    "paperVenue": "Submitted tool sheet / local wrapper",
    "paperContribution": "Turns historical 3D scene graph observations into a query interface for objects that are no longer visible.",
    "paperLinks": [
      {
        "label": "SceneGraphFusion Paper",
        "url": "https://arxiv.org/abs/2010.05273"
      },
      {
        "label": "3DSSG GitHub",
        "url": "https://github.com/ShunChengWu/3DSSG"
      },
      {
        "label": "3RScan Dataset",
        "url": "https://waldjohannau.github.io/RIO/"
      }
    ],
    "heroImage": "assets/tools/query-3d-scene-graph/cover.jpg",
    "demos": [
      {
        "label": "Scene graph query flow",
        "image": "assets/tools/query-3d-scene-graph/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Structured graph result preview",
        "image": "assets/tools/query-3d-scene-graph/cover.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/query-3d-scene-graph/run.py --request tools/query-3d-scene-graph/examples/request.json --output tools/query-3d-scene-graph/runs/result.json",
    "shortExplanation": "Use this tool when the current view cannot see an object but the robot may have observed it earlier in the mapped scene.",
    "presetExample": {
      "title": "Recover a previously seen object",
      "input": "tools/query-3d-scene-graph/examples/request.json",
      "prompt": "object_query: table; relation_query: nearby chairs",
      "runLabel": "Query scene graph",
      "expectedOutput": "Matched nodes with 3D centers, bounding boxes, relation edges, and confidence values.",
      "image": "assets/tools/query-3d-scene-graph/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "dataset_root",
        "control": "path",
        "defaultValue": "/path/to/3RScan",
        "meaning": "Root folder containing the stored scans or scene graph artifacts."
      },
      {
        "name": "target_scan_id",
        "control": "text",
        "defaultValue": "f62fd5fd-9a3f-2f44-883a-1e5cf819608e",
        "meaning": "Scene identifier used to select the historical graph."
      },
      {
        "name": "object_query",
        "control": "text",
        "meaning": "Object class, instance, or natural-language target to search for."
      },
      {
        "name": "relation_query",
        "control": "text",
        "meaning": "Optional spatial relation such as near, on, lower than, or connected to."
      }
    ],
    "outputNotes": [
      {
        "name": "matches",
        "meaning": "Candidate graph nodes matching the object query."
      },
      {
        "name": "position_3d",
        "meaning": "Stored 3D center and bounding-box size for each matched node."
      },
      {
        "name": "confidence",
        "meaning": "Confidence or matching score produced by the local wrapper."
      }
    ],
    "deploymentNotes": [
      "Prepare a 3D scene graph dataset or converted scan graph under the tool folder.",
      "Write the object and relation query as repository-relative JSON.",
      "Run the local wrapper and save graph matches under tools/query-3d-scene-graph/runs/.",
      "Use the returned 3D positions as memory hints for downstream perception or planning."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No source-reported benchmark number was included for this local wrapper.",
    "benchmarkLatency": "Interactive, according to the submitted spreadsheet.",
    "benchmarkArtifacts": "Input/output JSON examples and local deployment notes from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "local wrapper"
  },
  {
    "slug": "query-historical-action-timeline",
    "title": "query_historical_action_timeline",
    "category": "Cognition and State Modeling",
    "task": "Historical action timeline query",
    "summary": "Queries a stored action timeline to confirm whether a task step happened and when it occurred.",
    "input": "Action history + query action + time window",
    "output": "Action occurrence times and status",
    "runtime": "Local / cloud wrapper",
    "status": "Runnable",
    "paperTitle": "MS-TCN-style action timeline tool",
    "paperVenue": "Submitted tool sheet / local wrapper",
    "paperContribution": "Exposes temporal action segmentation outputs as a memory query interface for SOP and multi-step tasks.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/yabufarha/ms-tcn"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/1903.01945"
      }
    ],
    "heroImage": "assets/tools/query-historical-action-timeline/cover.jpg",
    "demos": [
      {
        "label": "Action timeline query flow",
        "image": "assets/tools/query-historical-action-timeline/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Timeline result preview",
        "image": "assets/tools/query-historical-action-timeline/cover.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/query-historical-action-timeline/run.py --features tools/query-historical-action-timeline/examples/video_001_features.npy --query-action pour --output tools/query-historical-action-timeline/runs/timeline.json",
    "shortExplanation": "Use this tool to check whether a previous step was already completed before the planner continues.",
    "presetExample": {
      "title": "Check whether a step happened",
      "input": "tools/query-historical-action-timeline/examples/video_001_features.npy",
      "prompt": "query_action: pour; time_window: full video",
      "runLabel": "Query timeline",
      "expectedOutput": "A list of start and end frames for matching action segments.",
      "image": "assets/tools/query-historical-action-timeline/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "feature_file",
        "control": "path",
        "defaultValue": "tools/query-historical-action-timeline/examples/video_001_features.npy",
        "meaning": "Precomputed video features used by the timeline model or wrapper."
      },
      {
        "name": "query_action",
        "control": "text",
        "meaning": "Action label or natural-language step to look up."
      },
      {
        "name": "time_window",
        "control": "text",
        "defaultValue": "full",
        "meaning": "Optional frame or timestamp range to constrain the query."
      },
      {
        "name": "sample_rate",
        "control": "number",
        "defaultValue": "1",
        "meaning": "Temporal sampling rate used when mapping model outputs back to frames."
      }
    ],
    "outputNotes": [
      {
        "name": "found",
        "meaning": "Boolean status indicating whether the action appears in the history."
      },
      {
        "name": "occurrences",
        "meaning": "Detected action spans with start and end frames."
      },
      {
        "name": "timestamp",
        "meaning": "Frame or time index for each matched action occurrence."
      }
    ],
    "deploymentNotes": [
      "Prepare video features or action timeline outputs under the tool examples folder.",
      "Configure the action label set and sample rate used by the source segmentation model.",
      "Run the query wrapper with a repository-relative feature path.",
      "Save the resulting timeline JSON under tools/query-historical-action-timeline/runs/."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No source-reported benchmark number was included for this local wrapper.",
    "benchmarkLatency": "Interactive, according to the submitted spreadsheet.",
    "benchmarkArtifacts": "Feature tensor shape, mock timeline output, and local deployment notes from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "local wrapper"
  },
  {
    "slug": "retrieve-past-visual-state-faiss",
    "title": "retrieve_past_visual_state_faiss",
    "category": "Cognition and State Modeling",
    "task": "Visual memory retrieval",
    "summary": "Retrieves similar past visual memories from an embedding index when current recognition is uncertain.",
    "input": "Image embedding or cropped image",
    "output": "Matched visual memories, memory ids, scores, snapshot paths",
    "runtime": "Local / cloud wrapper",
    "status": "Runnable",
    "paperTitle": "FAISS-style visual memory retrieval",
    "paperVenue": "Submitted tool sheet / local wrapper",
    "paperContribution": "Uses vector search over stored visual embeddings to recover clear historical observations under occlusion or partial visibility.",
    "paperLinks": [
      {
        "label": "FAISS GitHub",
        "url": "https://github.com/facebookresearch/faiss"
      },
      {
        "label": "FAISS Docs",
        "url": "https://faiss.ai/"
      },
      {
        "label": "FAISS Paper",
        "url": "https://arxiv.org/abs/2401.08281"
      }
    ],
    "heroImage": "assets/tools/retrieve-past-visual-state-faiss/cover.jpg",
    "demos": [
      {
        "label": "Visual memory retrieval flow",
        "image": "assets/tools/retrieve-past-visual-state-faiss/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Top-k result preview",
        "image": "assets/tools/retrieve-past-visual-state-faiss/demo-2.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/retrieve-past-visual-state-faiss/run.py --query-feature tools/retrieve-past-visual-state-faiss/examples/query.npy --top-k 3 --output tools/retrieve-past-visual-state-faiss/runs/results.json",
    "shortExplanation": "Search a visual memory bank for earlier snapshots that look similar to the current uncertain target.",
    "presetExample": {
      "title": "Retrieve similar visual memories",
      "input": "tools/retrieve-past-visual-state-faiss/examples/query.npy",
      "prompt": "top_k: 3",
      "runLabel": "Search memory",
      "expectedOutput": "Top-k memory ids with distances or similarity scores and snapshot references.",
      "image": "assets/tools/retrieve-past-visual-state-faiss/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "query_feature_path",
        "control": "path",
        "defaultValue": "tools/retrieve-past-visual-state-faiss/examples/query.npy",
        "meaning": "Embedding file for the current crop or scene."
      },
      {
        "name": "query_image",
        "control": "file",
        "meaning": "Optional image crop that can be embedded before FAISS search."
      },
      {
        "name": "top_k",
        "control": "number",
        "defaultValue": "3",
        "meaning": "Number of nearest memories to return."
      },
      {
        "name": "feature_dim",
        "control": "number",
        "defaultValue": "512",
        "meaning": "Embedding dimension expected by the index."
      }
    ],
    "outputNotes": [
      {
        "name": "results",
        "meaning": "Ranked visual memories returned by the FAISS search."
      },
      {
        "name": "memory_id",
        "meaning": "Identifier of a stored past observation."
      },
      {
        "name": "score",
        "meaning": "Distance or similarity score for the retrieved memory."
      },
      {
        "name": "snapshot_path",
        "meaning": "Path to the stored image or state snapshot, when available."
      }
    ],
    "deploymentNotes": [
      "Build or load a FAISS index over historical visual embeddings.",
      "Prepare query embeddings or image crops under the examples folder.",
      "Run the retrieval wrapper with a repository-relative query path and top-k value.",
      "Save ranked memory results under tools/retrieve-past-visual-state-faiss/runs/."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No source-reported benchmark number was included for this local wrapper.",
    "benchmarkLatency": "Interactive, according to the submitted spreadsheet.",
    "benchmarkArtifacts": "Query embedding example, top-k search result JSON, and local deployment notes from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "local wrapper"
  },
  {
    "slug": "stm",
    "title": "STM",
    "category": "Cognition and State Modeling",
    "task": "Space-time visual memory",
    "summary": "Maintains a space-time feature memory so a VLM can recover target appearance under deformation, blur, or lighting changes.",
    "input": "Current frame features + memory bank query",
    "output": "Memory readout, attention map, confidence score",
    "runtime": "Local GPU",
    "status": "Runnable",
    "paperTitle": "Video Object Segmentation using Space-Time Memory Networks",
    "paperVenue": "ICCV 2019",
    "paperContribution": "Reads and writes a space-time memory bank so target features from earlier frames can guide later-frame segmentation and tracking.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/seoungwugoh/STM"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/1904.00607"
      },
      {
        "label": "Project Page",
        "url": "https://seoungwugoh.github.io/STM/"
      }
    ],
    "heroImage": "assets/tools/stm/cover.jpg",
    "demos": [
      {
        "label": "Space-time memory flow",
        "image": "assets/tools/stm/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Memory readout preview",
        "image": "assets/tools/stm/demo-2.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/stm/run.py --ref-img tools/stm/examples/mock_ref_img.png --ref-mask tools/stm/examples/mock_ref_mask.png --query-img tools/stm/examples/mock_query_img.png --weights tools/stm/weights/STM_weights.pth --output tools/stm/runs/prediction.json",
    "shortExplanation": "Use STM when a target has changed appearance but earlier clean frames can still anchor the current prediction.",
    "presetExample": {
      "title": "Read target features from memory",
      "input": "tools/stm/examples/mock_query_img.png",
      "prompt": "target_object_id: selected object; memory: reference image and mask",
      "runLabel": "Run STM",
      "expectedOutput": "A predicted foreground region, bounding box, feature readout, attention weights, and confidence score.",
      "image": "assets/tools/stm/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "ref_img",
        "control": "file",
        "defaultValue": "tools/stm/examples/mock_ref_img.png",
        "meaning": "Reference frame where the target is clearly observed."
      },
      {
        "name": "ref_mask",
        "control": "file",
        "defaultValue": "tools/stm/examples/mock_ref_mask.png",
        "meaning": "Target mask associated with the reference frame."
      },
      {
        "name": "query_img",
        "control": "file",
        "defaultValue": "tools/stm/examples/mock_query_img.png",
        "meaning": "Current frame to segment or verify."
      },
      {
        "name": "weights",
        "control": "path",
        "defaultValue": "tools/stm/weights/STM_weights.pth",
        "meaning": "STM model weights used by the local backend."
      }
    ],
    "outputNotes": [
      {
        "name": "retrieved_feature_map",
        "meaning": "Memory-conditioned feature map used for the current frame."
      },
      {
        "name": "visual_attention_weights",
        "meaning": "Attention weights over stored space-time memory."
      },
      {
        "name": "confidence_score",
        "meaning": "Confidence of the current target prediction."
      }
    ],
    "deploymentNotes": [
      "Clone or download the official STM implementation.",
      "Install the PyTorch dependencies and place weights under tools/stm/weights/.",
      "Prepare reference images, masks, and query frames using repository-relative paths.",
      "Run the wrapper and save masks, boxes, and attention outputs under tools/stm/runs/."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No benchmark number was copied into the site because the submitted row did not provide one.",
    "benchmarkLatency": "About 20 ms, according to the submitted spreadsheet.",
    "benchmarkArtifacts": "Official repository link, weights path, mock input JSON, and local prediction output from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "local wrapper"
  },
  {
    "slug": "action-genome",
    "title": "Action Genome",
    "category": "Cognition and State Modeling",
    "task": "Spatio-temporal scene graph state modeling",
    "summary": "Uses spatio-temporal scene graph structure to infer object states and contact relations from short video clips.",
    "input": "Short video clip + target object list",
    "output": "State graph and temporal relations",
    "runtime": "Local GPU",
    "status": "Runnable",
    "paperTitle": "Action Genome: Actions as Compositions of Spatio-temporal Scene Graphs",
    "paperVenue": "CVPR 2020",
    "paperContribution": "Represents actions as evolving object relations, reducing static-image guesses about physical state during manipulation tasks.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/JingweiJ/ActionGenome"
      },
      {
        "label": "Project Page",
        "url": "https://www.actiongenome.org/"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/1912.06992"
      }
    ],
    "heroImage": "assets/tools/action-genome/cover.jpg",
    "demos": [
      {
        "label": "Action graph inference flow",
        "image": "assets/tools/action-genome/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "State timeline result preview",
        "image": "assets/tools/action-genome/demo-2.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/action-genome/run.py --video tools/action-genome/examples/mock_video.mp4 --objects tools/action-genome/examples/objects.json --output tools/action-genome/runs/state_timeline.json",
    "shortExplanation": "Use Action Genome-style state modeling when the planner needs a concrete physical state instead of a static-frame guess.",
    "presetExample": {
      "title": "Infer object state timeline",
      "input": "tools/action-genome/examples/mock_video.mp4",
      "prompt": "objects_of_interest: door, cup, person",
      "runLabel": "Build state graph",
      "expectedOutput": "Object state timelines and contact relations such as open, closed, empty, full, sitting, or standing.",
      "image": "assets/tools/action-genome/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "temporal_video_buffer",
        "control": "file",
        "defaultValue": "tools/action-genome/examples/mock_video.mp4",
        "meaning": "Short clip or buffered frames used for temporal state inference."
      },
      {
        "name": "objects_of_interest",
        "control": "text",
        "meaning": "Object list whose states and relations should be tracked."
      },
      {
        "name": "feature_tensor",
        "control": "path",
        "meaning": "Optional precomputed features for the scene graph model."
      },
      {
        "name": "bbox_tensor",
        "control": "path",
        "meaning": "Optional detected object boxes aligned with the video frames."
      }
    ],
    "outputNotes": [
      {
        "name": "object_states",
        "meaning": "Frame spans labeled with object states."
      },
      {
        "name": "contact_relations",
        "meaning": "Temporal relations between objects and actors."
      },
      {
        "name": "state_timeline",
        "meaning": "Ordered state transitions that downstream planners can audit."
      }
    ],
    "deploymentNotes": [
      "Clone or download the official Action Genome resources.",
      "Prepare video clips, object boxes, and model features in the expected format.",
      "Run the state-graph wrapper with repository-relative video and object paths.",
      "Save state timelines and relation graphs under tools/action-genome/runs/."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No benchmark number was copied into the site because the submitted row did not provide one.",
    "benchmarkLatency": "Interactive, according to the submitted spreadsheet.",
    "benchmarkArtifacts": "Official repository link, mock video input, feature tensor shape, bbox tensor shape, and state timeline output from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "local wrapper"
  },
  {
    "slug": "language2ltl",
    "title": "Language2LTL",
    "category": "Reasoning and Planning",
    "task": "Natural language to temporal-logic validation",
    "summary": "Translates natural-language task constraints into LTL-style checks that reject unsafe, skipped, or out-of-order plans.",
    "input": "VLM action plan + safety LTL formulas",
    "output": "Validation result and violation feedback",
    "runtime": "Local CPU",
    "status": "Runnable",
    "paperTitle": "Language2LTL: Translating Natural Language to Linear Temporal Logic for Robot Specification",
    "paperVenue": "IROS 2023",
    "paperContribution": "Grounds natural-language task rules into formal temporal constraints so robot plans can be checked before execution.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/JasonXinyuLiu/Language2LTL"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/2305.07766"
      }
    ],
    "heroImage": "assets/tools/language2ltl/cover.jpg",
    "demos": [
      {
        "label": "Plan validation flow",
        "image": "assets/tools/language2ltl/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Violation report preview",
        "image": "assets/tools/language2ltl/cover.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/language2ltl/run.py --plan tools/language2ltl/examples/proposed_plan.json --constraints tools/language2ltl/examples/constraints.json --output tools/language2ltl/runs/validation.json",
    "shortExplanation": "Use Language2LTL before execution to make sure a VLM-produced plan respects safety rules and required step order.",
    "presetExample": {
      "title": "Reject an unsafe plan",
      "input": "tools/language2ltl/examples/proposed_plan.json",
      "prompt": "always(grab_chemical -> historically(wear_gloves))",
      "runLabel": "Validate plan",
      "expectedOutput": "A compliance flag and a human-readable violation reason when a prerequisite step is missing.",
      "image": "assets/tools/language2ltl/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "proposed_step_sequence",
        "control": "path",
        "defaultValue": "tools/language2ltl/examples/proposed_plan.json",
        "meaning": "Ordered candidate steps produced by the planner."
      },
      {
        "name": "active_ltl_constraints",
        "control": "path",
        "defaultValue": "tools/language2ltl/examples/constraints.json",
        "meaning": "Temporal-logic constraints active for this task."
      },
      {
        "name": "validator_mode",
        "control": "select",
        "defaultValue": "mock_rule_check_no_install",
        "meaning": "Selects the installed Language2LTL backend or a local mock checker."
      }
    ],
    "outputNotes": [
      {
        "name": "is_sop_compliant",
        "meaning": "Whether the proposed sequence satisfies the active constraints."
      },
      {
        "name": "violation_reason",
        "meaning": "Explanation of the first detected safety or ordering violation."
      },
      {
        "name": "validation_trace",
        "meaning": "Optional trace of automaton or rule-checking states."
      }
    ],
    "deploymentNotes": [
      "Clone or download the official Language2LTL repository.",
      "Install the parser, planner, and temporal-logic dependencies required by the source project.",
      "Prepare a proposed step sequence and active constraint file under tools/language2ltl/examples/.",
      "Run the validator and save compliance reports under tools/language2ltl/runs/."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No benchmark number was copied into the site because the submitted row did not provide one.",
    "benchmarkLatency": "Interactive, millisecond-level according to the submitted spreadsheet.",
    "benchmarkArtifacts": "Official repository link, mock rule-check example, constraint JSON, and validation output from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "local wrapper"
  },
  {
    "slug": "monitor-dynamic-disturbance",
    "title": "monitor_dynamic_disturbance",
    "category": "Execution and Control",
    "task": "Dynamic disturbance monitoring",
    "summary": "Monitors tracked points or regions during execution and raises alerts when the target is moved, bumped, or shifted.",
    "input": "Video stream + tracked points or ROI",
    "output": "Point trajectories and disturbance alerts",
    "runtime": "Local / edge monitor",
    "status": "Runnable",
    "paperTitle": "CoTracker-style dynamic disturbance monitor",
    "paperVenue": "Submitted tool sheet / local wrapper",
    "paperContribution": "Runs as an execution-time guard that detects target drift and produces recovery signals for closed-loop control.",
    "paperLinks": [
      {
        "label": "CoTracker GitHub",
        "url": "https://github.com/facebookresearch/co-tracker"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/2307.07635"
      },
      {
        "label": "Demo",
        "url": "https://huggingface.co/spaces/facebook/cotracker"
      }
    ],
    "heroImage": "assets/tools/monitor-dynamic-disturbance/cover.jpg",
    "demos": [
      {
        "label": "Disturbance monitor flow",
        "image": "assets/tools/monitor-dynamic-disturbance/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Alert result preview",
        "image": "assets/tools/monitor-dynamic-disturbance/demo-2.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/monitor-dynamic-disturbance/run.py --video tools/monitor-dynamic-disturbance/examples/stream.mp4 --points tools/monitor-dynamic-disturbance/examples/roi_points.json --output tools/monitor-dynamic-disturbance/runs/alerts.json",
    "shortExplanation": "Keep this monitor running during manipulation so the system can react if the scene changes under the robot.",
    "presetExample": {
      "title": "Detect target drift during execution",
      "input": "tools/monitor-dynamic-disturbance/examples/stream.mp4",
      "prompt": "roi_points: four tracked points around the target",
      "runLabel": "Monitor disturbance",
      "expectedOutput": "Tracked point trajectories, a disturbance flag, and severity score.",
      "image": "assets/tools/monitor-dynamic-disturbance/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "video_stream",
        "control": "file",
        "meaning": "Live stream or buffered video used for point tracking."
      },
      {
        "name": "roi",
        "control": "text",
        "meaning": "Region of interest around the object being monitored."
      },
      {
        "name": "points",
        "control": "path",
        "defaultValue": "tools/monitor-dynamic-disturbance/examples/roi_points.json",
        "meaning": "Initial point coordinates to track across frames."
      },
      {
        "name": "inference_mode",
        "control": "select",
        "defaultValue": "mock_no_weights_no_install",
        "meaning": "Selects the installed tracker backend or mock mode."
      }
    ],
    "outputNotes": [
      {
        "name": "point_tracks",
        "meaning": "Tracked 2D point coordinates over time."
      },
      {
        "name": "disturbance_detected",
        "meaning": "Boolean event flag for target movement or shift."
      },
      {
        "name": "severity",
        "meaning": "Scalar score describing the magnitude of the detected disturbance."
      }
    ],
    "deploymentNotes": [
      "Install the selected point-tracking backend or keep the local mock fallback for wrapper testing.",
      "Prepare a live stream, buffered clip, and initial ROI points under the examples folder.",
      "Run the monitor in parallel with the robot execution loop.",
      "Save point tracks and disturbance alerts under tools/monitor-dynamic-disturbance/runs/."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No source-reported benchmark number was included for this local wrapper.",
    "benchmarkLatency": "Real-time, according to the submitted spreadsheet.",
    "benchmarkArtifacts": "ROI point example, mock stream shape, disturbance severity output, and local deployment notes from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "local wrapper"
  },
  {
    "slug": "tapir",
    "title": "TAPIR",
    "category": "Execution and Control",
    "task": "Point tracking for visual servoing",
    "summary": "Tracks arbitrary target points through a live video stream so closed-loop control can correct motion under disturbance.",
    "input": "Query point + live video stream",
    "output": "Tracked point, occlusion flag, confidence",
    "runtime": "Local GPU",
    "status": "Runnable",
    "paperTitle": "TAPIR: Tracking Any Point with per-frame Initialization and temporal Refinement",
    "paperVenue": "DeepMind 2023",
    "paperContribution": "Tracks arbitrary points with per-frame initialization and temporal refinement, supporting visual feedback when objects move during execution.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/google-deepmind/tapnet"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/2306.08637"
      },
      {
        "label": "Project Page",
        "url": "https://deepmind-tapir.github.io/"
      }
    ],
    "heroImage": "assets/tools/tapir/cover.jpg",
    "demos": [
      {
        "label": "Point tracking flow",
        "image": "assets/tools/tapir/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Tracked point result preview",
        "image": "assets/tools/tapir/demo-2.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/tapir/run.py --video tools/tapir/examples/stream.mp4 --initial-point 120,150 --output tools/tapir/runs/tracks.json",
    "shortExplanation": "Use TAPIR-style tracking during the robot approach phase to keep a target pixel locked despite motion or camera shake.",
    "presetExample": {
      "title": "Track a target point",
      "input": "tools/tapir/examples/stream.mp4",
      "prompt": "initial_target_pixel: [120, 150]",
      "runLabel": "Track point",
      "expectedOutput": "Per-frame target coordinates, occlusion status, confidence, and total displacement.",
      "image": "assets/tools/tapir/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "initial_target_pixel",
        "control": "text",
        "defaultValue": "[120, 150]",
        "meaning": "Initial 2D point selected on the target object."
      },
      {
        "name": "camera_stream_frame",
        "control": "file",
        "meaning": "Live frame or buffered video sequence to track through."
      },
      {
        "name": "inference_mode",
        "control": "select",
        "defaultValue": "mock_no_jax",
        "meaning": "Selects the installed JAX/TAPIR backend or a mock tracking fallback."
      }
    ],
    "outputNotes": [
      {
        "name": "current_tracked_pixel",
        "meaning": "Current 2D target coordinate for closed-loop correction."
      },
      {
        "name": "is_occluded",
        "meaning": "Whether the point is estimated to be hidden."
      },
      {
        "name": "confidence",
        "meaning": "Tracking confidence for the current frame."
      },
      {
        "name": "total_displacement",
        "meaning": "Measured shift from the initial point over the tracked clip."
      }
    ],
    "deploymentNotes": [
      "Clone the official TAPNet repository and install the required JAX dependencies.",
      "Prepare a live camera feed or video sequence and choose initial target pixels.",
      "Run the tracker from a repository-relative path during the robot approach phase.",
      "Save tracks and occlusion flags under tools/tapir/runs/ for controller inspection."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No benchmark number was copied into the site because the submitted row did not provide one.",
    "benchmarkLatency": "About 20 ms and 30-60 Hz output frequency, according to the submitted spreadsheet.",
    "benchmarkArtifacts": "Official repository link, mock point-tracking input, trajectory output, occlusion flag, and confidence output from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "local wrapper"
  },
  {
    "slug": "r3m",
    "title": "R3M",
    "category": "Execution and Control",
    "task": "Post-action success verification",
    "summary": "Compares post-action visual observations with a goal instruction to decide whether a manipulation step physically succeeded.",
    "input": "Post-action frame + goal instruction",
    "output": "Verification score and completion flag",
    "runtime": "Local GPU",
    "status": "Runnable",
    "paperTitle": "R3M: A Universal Visual Representation for Robot Manipulation",
    "paperVenue": "CoRL 2022",
    "paperContribution": "Provides a robot manipulation visual representation that can score whether an executed step matches the intended semantic goal.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/facebookresearch/r3m"
      },
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/2203.12601"
      },
      {
        "label": "Project Page",
        "url": "https://sites.google.com/view/robot-r3m/"
      }
    ],
    "heroImage": "assets/tools/r3m/cover.jpg",
    "demos": [
      {
        "label": "Post-action verification flow",
        "image": "assets/tools/r3m/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Completion score result preview",
        "image": "assets/tools/r3m/demo-2.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/r3m/run.py --start-image tools/r3m/examples/start.png --end-image tools/r3m/examples/end.png --instruction \"pick up the red cup\" --output tools/r3m/runs/verification.json",
    "shortExplanation": "Use R3M after an action finishes to block false claims of completion and stop errors from accumulating.",
    "presetExample": {
      "title": "Verify action completion",
      "input": "tools/r3m/examples/end.png",
      "prompt": "pick up the red cup",
      "runLabel": "Verify result",
      "expectedOutput": "A task completion score and boolean success flag.",
      "image": "assets/tools/r3m/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "current_camera_view",
        "control": "file",
        "defaultValue": "tools/r3m/examples/end.png",
        "meaning": "Post-action camera image."
      },
      {
        "name": "semantic_task_text",
        "control": "text",
        "defaultValue": "pick up the red cup",
        "meaning": "Natural-language goal or step that should be verified."
      },
      {
        "name": "start_image",
        "control": "file",
        "meaning": "Optional pre-action image for comparing state change."
      }
    ],
    "outputNotes": [
      {
        "name": "task_completion_score",
        "meaning": "Score estimating how well the final visual state matches the instruction."
      },
      {
        "name": "is_successful",
        "meaning": "Boolean completion decision from the wrapper."
      },
      {
        "name": "feature_extractor_mode",
        "meaning": "Backend representation mode used for the score."
      }
    ],
    "deploymentNotes": [
      "Clone or download the official R3M repository.",
      "Install the PyTorch dependencies and prepare the selected visual representation checkpoint.",
      "Prepare start and end images plus a semantic task instruction under tools/r3m/examples/.",
      "Run the verifier and save scores under tools/r3m/runs/."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No benchmark number was copied into the site because the submitted row did not provide one.",
    "benchmarkLatency": "About 50 ms, according to the submitted spreadsheet.",
    "benchmarkArtifacts": "Official repository link, mock start/end image shape, task instruction, and verification output from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "local wrapper"
  },
  {
    "slug": "feature-squeezer",
    "title": "Feature_Squeezer",
    "category": "Perception and Grounding",
    "task": "Adversarial example detection",
    "summary": "Applies feature squeezing transformations such as bit-depth reduction or filtering to detect adversarial visual inputs.",
    "input": "Image or feature tensor",
    "output": "Adversarial prediction result and original model output",
    "runtime": "Local safety preprocessing",
    "status": "Docs Ready",
    "paperTitle": "Feature Squeezing: Detecting Adversarial Examples in Deep Neural Networks",
    "paperVenue": "NDSS 2018",
    "paperContribution": "Reduces the input search space and compares model behavior before and after squeezing to expose adversarial perturbations.",
    "paperLinks": [
      {
        "label": "Paper",
        "url": "https://arxiv.org/abs/1704.01155"
      },
      {
        "label": "IBM ART GitHub",
        "url": "https://github.com/Trusted-AI/adversarial-robustness-toolbox"
      },
      {
        "label": "ART Docs",
        "url": "https://adversarial-robustness-toolbox.readthedocs.io/"
      }
    ],
    "heroImage": "assets/tools/feature-squeezer/cover.jpg",
    "demos": [
      {
        "label": "Feature squeezing check flow",
        "image": "assets/tools/feature-squeezer/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Adversarial report preview",
        "image": "assets/tools/feature-squeezer/demo-2.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/feature-squeezer/run.py --input tools/feature-squeezer/examples/input.png --method bit_depth --output tools/feature-squeezer/runs/report.json",
    "shortExplanation": "Use this preprocessing check when visual inputs may contain noise attacks, stickers, or abnormal perturbations.",
    "presetExample": {
      "title": "Detect a suspicious input",
      "input": "tools/feature-squeezer/examples/input.png",
      "prompt": "method: bit_depth; compare original and squeezed predictions",
      "runLabel": "Run squeeze check",
      "expectedOutput": "A report containing the original prediction, squeezed prediction, and adversarial yes/no decision.",
      "image": "assets/tools/feature-squeezer/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "input_image",
        "control": "file",
        "meaning": "Image or feature tensor to test."
      },
      {
        "name": "method",
        "control": "select",
        "defaultValue": "bit_depth",
        "meaning": "Squeezing operation such as bit-depth reduction or median filtering."
      },
      {
        "name": "threshold",
        "control": "slider",
        "meaning": "Difference threshold for flagging a suspicious prediction change."
      }
    ],
    "outputNotes": [
      {
        "name": "is_adversarial",
        "meaning": "Whether the input is flagged as adversarial."
      },
      {
        "name": "original_model_output",
        "meaning": "Prediction before feature squeezing."
      },
      {
        "name": "squeezed_model_output",
        "meaning": "Prediction after the selected squeezing transform."
      }
    ],
    "deploymentNotes": [
      "Implement or install the feature squeezing transform required by the target model.",
      "Prepare visual inputs under tools/feature-squeezer/examples/.",
      "Run the detector with a repository-relative image path and selected squeeze method.",
      "Save reports under tools/feature-squeezer/runs/ for safety logging."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No benchmark number was copied into the site because the submitted row did not provide one.",
    "benchmarkLatency": "Interactive, according to the submitted spreadsheet.",
    "benchmarkArtifacts": "Paper reference and tool-sheet description from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "recommended tool"
  },
  {
    "slug": "clahe-filter",
    "title": "CLAHE_Filter",
    "category": "Perception and Grounding",
    "task": "Local contrast enhancement",
    "summary": "Enhances local image contrast with clipped adaptive histogram equalization for low-light, shadowed, or low-texture scenes.",
    "input": "RGB / YUV / LAB image",
    "output": "Contrast-enhanced image",
    "runtime": "Local safety preprocessing",
    "status": "Docs Ready",
    "paperTitle": "Adaptive Histogram Equalization and Its Variations",
    "paperVenue": "Computer Vision, Graphics, and Image Processing, 1987",
    "paperContribution": "Applies local histogram equalization with clipping to improve contrast while limiting noise amplification.",
    "paperLinks": [
      {
        "label": "OpenCV CLAHE Docs",
        "url": "https://docs.opencv.org/4.x/d6/db6/classcv_1_1CLAHE.html"
      },
      {
        "label": "OpenCV GitHub",
        "url": "https://github.com/opencv/opencv"
      },
      {
        "label": "Original Paper DOI",
        "url": "https://doi.org/10.1016/S0734-189X(87)80186-X"
      }
    ],
    "heroImage": "assets/tools/clahe-filter/cover.jpg",
    "demos": [
      {
        "label": "CLAHE enhancement flow",
        "image": "assets/tools/clahe-filter/demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Enhanced output preview",
        "image": "assets/tools/clahe-filter/demo-2.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/clahe-filter/run.py --input tools/clahe-filter/examples/input.png --color-space lab --clip-limit 2.0 --output tools/clahe-filter/runs/enhanced.png",
    "shortExplanation": "Use CLAHE as a lightweight visual robustness step when shadows, low dynamic range, or weak texture make perception unreliable.",
    "presetExample": {
      "title": "Enhance a low-contrast image",
      "input": "tools/clahe-filter/examples/input.png",
      "prompt": "color_space: lab; clip_limit: 2.0; tile_grid_size: 8x8",
      "runLabel": "Enhance contrast",
      "expectedOutput": "A locally contrast-enhanced image with clearer details and balanced brightness.",
      "image": "assets/tools/clahe-filter/demo-1.jpg"
    },
    "parameterNotes": [
      {
        "name": "input_image",
        "control": "file",
        "meaning": "Original RGB, YUV, or LAB image."
      },
      {
        "name": "color_space",
        "control": "select",
        "defaultValue": "lab",
        "meaning": "Color space used before applying CLAHE."
      },
      {
        "name": "clip_limit",
        "control": "slider",
        "defaultValue": "2.0",
        "meaning": "Upper limit for local histogram clipping."
      },
      {
        "name": "tile_grid_size",
        "control": "text",
        "defaultValue": "8x8",
        "meaning": "Local grid size used for adaptive equalization."
      }
    ],
    "outputNotes": [
      {
        "name": "enhanced_image",
        "meaning": "Image after local contrast enhancement."
      },
      {
        "name": "brightness_distribution",
        "meaning": "More balanced local intensity distribution."
      },
      {
        "name": "detail_visibility",
        "meaning": "Improved visibility of cables, texture, edges, or shadowed objects."
      }
    ],
    "deploymentNotes": [
      "Use OpenCV or an equivalent image-processing backend with CLAHE support.",
      "Prepare low-light or low-contrast inputs under tools/clahe-filter/examples/.",
      "Run the filter with repository-relative image paths and tuned clipping parameters.",
      "Save enhanced images under tools/clahe-filter/runs/ for downstream perception."
    ],
    "benchmarkDataset": "Not provided in the submitted spreadsheet.",
    "benchmarkMetric": "No benchmark number was copied into the site because the submitted row did not provide one.",
    "benchmarkLatency": "Interactive, according to the submitted spreadsheet.",
    "benchmarkArtifacts": "Tool-sheet description and preprocessing parameters from the submitted spreadsheet.",
    "license": "Not specified",
    "owner": "Hu Yibo",
    "version": "recommended tool"
  },
  {
    "slug": "deblurganv2",
    "title": "DeblurGANv2",
    "category": "Perception and Grounding",
    "task": "Image deblurring",
    "summary": "GAN-based blind motion deblurring for restoring sharper images from blurred inputs.",
    "input": "Blurred image",
    "output": "Deblurred image",
    "runtime": "Python / PyTorch",
    "status": "Runnable",
    "paperTitle": "DeblurGAN-v2: Deblurring (Orders-of-Magnitude) Faster and Better",
    "paperAuthors": "Orest Kupyn, Volodymyr Budzan, Mykola Mykhailych, Dmytro Mishkin, Jiří Matas",
    "paperVenue": "ICCV 2019 / arXiv:1908.03826",
    "paperContribution": "Introduces efficient generator backbones and improved adversarial training for practical blind motion deblurring.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/KupynOrest/DeblurGANv2"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1908.03826"
      }
    ],
    "heroImage": "assets/tools/deblurganv2/restore_visual.png",
    "demos": [
      {
        "label": "Restoration qualitative results",
        "image": "assets/tools/deblurganv2/restore_visual.png",
        "position": "center center"
      },
      {
        "label": "Kohler benchmark visual",
        "image": "assets/tools/deblurganv2/kohler_visual.png",
        "position": "center center"
      },
      {
        "label": "Model pipeline",
        "image": "assets/tools/deblurganv2/pipeline.jpg",
        "position": "center center"
      },
      {
        "label": "Interpolation comparison",
        "image": "assets/tools/deblurganv2/interp_compare.png",
        "position": "center center"
      },
      {
        "label": "SSIM and FLOPs tradeoff",
        "image": "assets/tools/deblurganv2/ssim_flops_plot.png",
        "position": "center center"
      }
    ],
    "apiExample": "python predict.py --img_path tools/deblurganv2/examples/blur.png --weights_path tools/deblurganv2/weights/fpn_inception.h5 --model_name fpn_inception --out_dir tools/deblurganv2/runs",
    "shortExplanation": "Input one blurred image and DeblurGANv2 generates a sharper restored image for downstream perception.",
    "presetExample": {
      "title": "Deblur a motion-blurred frame",
      "input": "tools/deblurganv2/examples/blur.png",
      "prompt": "model_name: fpn_inception",
      "runLabel": "Run deblur",
      "expectedOutput": "A restored image file with reduced motion blur.",
      "image": "assets/tools/deblurganv2/restore_visual.png"
    },
    "parameterNotes": [
      {
        "name": "img_path",
        "control": "file",
        "meaning": "Input blurred RGB image."
      },
      {
        "name": "weights_path",
        "control": "path",
        "defaultValue": "tools/deblurganv2/weights/fpn_inception.h5",
        "meaning": "Checkpoint file used for inference."
      },
      {
        "name": "model_name",
        "control": "select",
        "defaultValue": "fpn_inception",
        "meaning": "Generator architecture variant."
      },
      {
        "name": "out_dir",
        "control": "path",
        "meaning": "Directory for restored images."
      }
    ],
    "outputNotes": [
      {
        "name": "deblurred_image",
        "meaning": "Restored image with sharper edges and textures."
      },
      {
        "name": "output_path",
        "meaning": "Saved output file location."
      }
    ],
    "deploymentNotes": [
      "Clone the official repository and install Python dependencies from the README.",
      "Download the official checkpoint and place it under tools/deblurganv2/weights/.",
      "Run inference with repository-relative paths for image and checkpoint.",
      "Store outputs under tools/deblurganv2/runs/ for catalog and evaluation."
    ],
    "modelLinks": [
      {
        "label": "Pretrained Weights",
        "url": "https://github.com/KupynOrest/DeblurGANv2#pre-trained-models"
      }
    ],
    "benchmarkRows": [
      {
        "dataset": "GoPro test",
        "metric": "PSNR / SSIM",
        "value": "Paper-reported deblurring quality metrics",
        "runtime": "Fast inference with FPN backbone",
        "source": "ICCV 2019 paper"
      }
    ],
    "benchmarkDataset": "GoPro and HIDE are reported in the official paper.",
    "benchmarkMetric": "Use paper-reported PSNR and SSIM for model comparison; this wrapper does not add new evaluation numbers.",
    "benchmarkLatency": "Inference speed depends on GPU and model variant; DeblurGANv2 focuses on faster restoration than prior GAN baselines.",
    "benchmarkArtifacts": "Official paper tables, pretrained checkpoints, and predict.py inference script.",
    "license": "BSD-3-Clause",
    "owner": "KupynOrest",
    "version": "master"
  },
  {
    "slug": "depth-anything",
    "title": "Depth Anything",
    "category": "Perception and Grounding",
    "task": "Monocular depth estimation",
    "summary": "Foundation depth model for robust relative depth prediction from a single RGB image.",
    "input": "RGB image",
    "output": "Depth map",
    "runtime": "Python / PyTorch",
    "status": "Runnable",
    "paperTitle": "Depth Anything: Unleashing the Power of Large-Scale Unlabeled Data",
    "paperAuthors": "Lihe Yang, Bingyi Kang, Zilong Huang, et al.",
    "paperVenue": "CVPR 2024 / arXiv:2401.10891",
    "paperContribution": "Builds a scalable depth foundation model using large-scale pseudo-labeled and unlabeled data.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/LiheYoung/Depth-Anything"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2401.10891"
      }
    ],
    "heroImage": "assets/tools/depth-anything/teaser.png",
    "demos": [
      {
        "label": "Depth Anything teaser",
        "image": "assets/tools/depth-anything/teaser.png",
        "position": "center center"
      },
      {
        "label": "ControlNet depth demo 1",
        "image": "assets/tools/depth-anything/controlnet_demo1.png",
        "position": "center center"
      },
      {
        "label": "ControlNet depth demo 2",
        "image": "assets/tools/depth-anything/controlnet_demo2.png",
        "position": "center center"
      },
      {
        "label": "Dolphins video depth demo",
        "video": "assets/tools/depth-anything/demo1.mov",
        "position": "center center"
      },
      {
        "label": "Rollercoaster video depth demo",
        "video": "assets/tools/depth-anything/demo2.mov",
        "position": "center center"
      },
      {
        "label": "Outdoor video depth demo",
        "video": "assets/tools/depth-anything/demo3.mov",
        "position": "center center"
      },
      {
        "label": "Indoor video depth demo",
        "video": "assets/tools/depth-anything/demo4.mov",
        "position": "center center"
      },
      {
        "label": "Driving video depth demo",
        "video": "assets/tools/depth-anything/demo5.mov",
        "position": "center center"
      }
    ],
    "apiExample": "python run.py --img-path tools/depth-anything/examples/input.jpg --encoder vitl --outdir tools/depth-anything/runs",
    "shortExplanation": "Given one RGB image, Depth Anything predicts a dense relative depth map.",
    "presetExample": {
      "title": "Estimate relative depth",
      "input": "tools/depth-anything/examples/input.jpg",
      "prompt": "encoder: vitl",
      "runLabel": "Run depth",
      "expectedOutput": "A normalized depth map image aligned with the input frame.",
      "image": "assets/tools/depth-anything/teaser.png"
    },
    "parameterNotes": [
      {
        "name": "img_path",
        "control": "file",
        "meaning": "Input RGB image file."
      },
      {
        "name": "encoder",
        "control": "select",
        "defaultValue": "vitl",
        "meaning": "Backbone variant (vits, vitb, vitl)."
      },
      {
        "name": "outdir",
        "control": "path",
        "meaning": "Directory for exported depth maps."
      }
    ],
    "outputNotes": [
      {
        "name": "depth_map",
        "meaning": "Predicted per-pixel relative depth."
      },
      {
        "name": "vis_depth",
        "meaning": "Colorized depth map for visualization."
      }
    ],
    "deploymentNotes": [
      "Install dependencies and model checkpoints per official README.",
      "Select an encoder checkpoint that matches resource constraints.",
      "Run image inference with repository-relative paths.",
      "Save outputs under tools/depth-anything/runs/ for downstream tasks."
    ],
    "modelLinks": [
      {
        "label": "Model Zoo",
        "url": "https://github.com/LiheYoung/Depth-Anything#pre-trained-models"
      }
    ],
    "benchmarkDataset": "Paper reports NYUv2, KITTI, and zero-shot transfer benchmarks.",
    "benchmarkMetric": "Use paper-reported delta/REL/RMSE metrics for comparison; this deployment entry focuses on runnable integration.",
    "benchmarkLatency": "Latency depends on encoder size and image resolution.",
    "benchmarkArtifacts": "Official checkpoints, run script, and CVPR 2024 benchmark tables.",
    "license": "Apache-2.0",
    "owner": "LiheYoung",
    "version": "main"
  },
  {
    "slug": "midas",
    "title": "MiDaS",
    "category": "Perception and Grounding",
    "task": "Monocular depth estimation",
    "summary": "Cross-dataset depth estimation model for relative depth prediction from single images.",
    "input": "RGB image",
    "output": "Depth map",
    "runtime": "Python / PyTorch",
    "status": "Runnable",
    "paperTitle": "Towards Robust Monocular Depth Estimation: Mixing Datasets for Zero-shot Cross-dataset Transfer",
    "paperAuthors": "René Ranftl, Katrin Lasinger, David Hafner, Konrad Schindler, Vladlen Koltun",
    "paperVenue": "TPAMI 2022 / arXiv:1907.01341",
    "paperContribution": "Shows robust relative depth estimation through mixed-dataset training and transfer-oriented objectives.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/isl-org/MiDaS"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1907.01341"
      }
    ],
    "heroImage": "assets/tools/midas/Comparison.png",
    "demos": [
      {
        "label": "Paper benchmark figure",
        "image": "assets/tools/midas/Comparison.png",
        "position": "center center"
      },
      {
        "label": "Accuracy-speed figure",
        "image": "assets/tools/midas/Improvement_vs_FPS.png",
        "position": "center center"
      }
    ],
    "apiExample": "python run.py --input_path tools/midas/examples --output_path tools/midas/runs --model_type dpt_beit_large_512",
    "shortExplanation": "MiDaS predicts relative depth maps for single RGB images across diverse scenes.",
    "presetExample": {
      "title": "Estimate monocular depth",
      "input": "tools/midas/examples/input.jpg",
      "prompt": "model_type: dpt_beit_large_512",
      "runLabel": "Run MiDaS",
      "expectedOutput": "A depth map file exported to the output directory.",
      "image": "assets/tools/midas/Comparison.png"
    },
    "parameterNotes": [
      {
        "name": "input_path",
        "control": "path",
        "meaning": "Input image file or folder."
      },
      {
        "name": "output_path",
        "control": "path",
        "meaning": "Destination for predicted depth outputs."
      },
      {
        "name": "model_type",
        "control": "select",
        "defaultValue": "dpt_beit_large_512",
        "meaning": "Checkpoint variant controlling quality and speed."
      }
    ],
    "outputNotes": [
      {
        "name": "depth_map",
        "meaning": "Single-channel relative depth prediction."
      },
      {
        "name": "sidecar_visualization",
        "meaning": "Optional visualization image for quick inspection."
      }
    ],
    "deploymentNotes": [
      "Install MiDaS requirements and download selected checkpoints.",
      "Choose model_type according to GPU memory and target speed.",
      "Run inference with repository-relative input/output paths.",
      "Archive output depth maps in tools/midas/runs/."
    ],
    "modelLinks": [
      {
        "label": "MiDaS Model List",
        "url": "https://github.com/isl-org/MiDaS#accuracy"
      }
    ],
    "benchmarkDataset": "Paper and repository report multi-dataset zero-shot evaluations.",
    "benchmarkMetric": "Use official zero-shot depth metrics reported by MiDaS for fair comparison.",
    "benchmarkLatency": "Runtime depends on selected DPT/BEiT/Swin model and input resolution.",
    "benchmarkArtifacts": "Official model table, checkpoints, and run.py inference entry.",
    "license": "MIT",
    "owner": "isl-org",
    "version": "master"
  },
  {
    "slug": "sentence-transformers",
    "title": "sentence-transformers",
    "category": "Cognition and State Modeling",
    "task": "Sentence embedding",
    "summary": "Dense semantic embeddings for retrieval, similarity, clustering, and reranking.",
    "input": "Text / sentence list",
    "output": "Vector embeddings / similarity scores",
    "runtime": "Python / PyTorch",
    "status": "Runnable",
    "paperTitle": "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks",
    "paperAuthors": "Nils Reimers, Iryna Gurevych",
    "paperVenue": "EMNLP-IJCNLP 2019 / arXiv:1908.10084",
    "paperContribution": "Enables efficient semantic similarity and retrieval with reusable sentence embeddings.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/UKPLab/sentence-transformers"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1908.10084"
      }
    ],
    "heroImage": "assets/tools/sentence-transformers/SBERT_Architecture.png",
    "demos": [
      {
        "label": "SBERT architecture",
        "image": "assets/tools/sentence-transformers/SBERT_Architecture.png",
        "position": "center center"
      },
      {
        "label": "SBERT softmax training architecture",
        "image": "assets/tools/sentence-transformers/SBERT_SoftmaxLoss.png",
        "position": "center center"
      },
      {
        "label": "SBERT siamese inference architecture",
        "image": "assets/tools/sentence-transformers/SBERT_Siamese_Network.png",
        "position": "center center"
      },
      {
        "label": "Semantic clustering example",
        "image": "assets/tools/sentence-transformers/paper-demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Topic embedding example",
        "image": "assets/tools/sentence-transformers/paper-demo-2.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python tools/sentence-transformers/run.py --model all-MiniLM-L6-v2 --input tools/sentence-transformers/examples/sentences.txt --out tools/sentence-transformers/runs/embeddings.npy",
    "shortExplanation": "Convert text into dense vectors for semantic search, matching, and clustering.",
    "presetExample": {
      "title": "Build retrieval embeddings",
      "input": "tools/sentence-transformers/examples/sentences.txt",
      "prompt": "model: all-MiniLM-L6-v2",
      "runLabel": "Encode text",
      "expectedOutput": "Embedding matrix and optional similarity scores.",
      "image": "assets/tools/sentence-transformers/SBERT_Architecture.png"
    },
    "parameterNotes": [
      {
        "name": "model",
        "control": "text",
        "defaultValue": "all-MiniLM-L6-v2",
        "meaning": "Sentence-transformers model identifier."
      },
      {
        "name": "input",
        "control": "path",
        "meaning": "Path to text lines or JSON records."
      },
      {
        "name": "normalize",
        "control": "toggle",
        "defaultValue": "true",
        "meaning": "Whether to L2-normalize vectors for cosine search."
      }
    ],
    "outputNotes": [
      {
        "name": "embeddings",
        "meaning": "Dense vectors for each input text item."
      },
      {
        "name": "similarity_matrix",
        "meaning": "Optional pairwise semantic similarity output."
      }
    ],
    "deploymentNotes": [
      "Install sentence-transformers and compatible torch versions.",
      "Download model from Hugging Face on first run or pre-cache offline.",
      "Run encoding wrapper with repository-relative input paths.",
      "Store vectors in tools/sentence-transformers/runs/ for retrieval tooling."
    ],
    "modelLinks": [
      {
        "label": "Model Catalog",
        "url": "https://www.sbert.net/docs/sentence_transformer/pretrained_models.html"
      }
    ],
    "benchmarkDataset": "Sentence-BERT is commonly evaluated on STSBenchmark and MTEB subsets.",
    "benchmarkMetric": "Primary metric is Spearman/Pearson correlation for semantic similarity tasks.",
    "benchmarkLatency": "Latency depends on model size and batch settings; MiniLM variants are typically low-latency.",
    "benchmarkArtifacts": "Pretrained models, evaluation scripts, and embedding outputs.",
    "license": "Apache-2.0",
    "owner": "UKPLab",
    "version": "master"
  },
  {
    "slug": "grounding-dino",
    "title": "Grounding DINO",
    "category": "Perception and Grounding",
    "task": "Open-set object detection",
    "summary": "Text-conditioned detector that grounds natural language prompts to image regions.",
    "input": "Image + text prompt",
    "output": "Bounding boxes + labels + scores",
    "runtime": "Python / PyTorch",
    "status": "Runnable",
    "paperTitle": "Grounding DINO: Marrying DINO with Grounded Pre-Training for Open-Set Object Detection",
    "paperAuthors": "Shilong Liu, Zhaoyang Zeng, Tianhe Ren, et al.",
    "paperVenue": "arXiv:2303.05499",
    "paperContribution": "Combines detector pretraining and language grounding to support open-set phrase-conditioned detection.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/IDEA-Research/GroundingDINO"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2303.05499"
      }
    ],
    "heroImage": "assets/tools/grounding-dino/grounded_sam_2_intro.jpg",
    "demos": [
      {
        "label": "Grounded SAM 2 intro",
        "image": "assets/tools/grounding-dino/grounded_sam_2_intro.jpg",
        "position": "center center"
      },
      {
        "label": "Detection and mask result",
        "image": "assets/tools/grounding-dino/grounded_sam2_annotated_image_with_mask.jpg",
        "position": "center center"
      },
      {
        "label": "Slice inference result",
        "image": "assets/tools/grounding-dino/grounded_sam2_annotated_image_with_mask_with_slice_inference.jpg",
        "position": "center center"
      },
      {
        "label": "Tracking pipeline",
        "image": "assets/tools/grounding-dino/g_sam2_tracking_pipeline_vis.png",
        "position": "center center"
      },
      {
        "label": "Video pipeline",
        "image": "assets/tools/grounding-dino/g_sam2_video_pipeline_v2.png",
        "position": "center center"
      },
      {
        "label": "Model diagram",
        "image": "assets/tools/grounding-dino/model_diagram.png",
        "position": "center center"
      },
      {
        "label": "Dense people grounding",
        "image": "assets/tools/grounding-dino/dense people.png",
        "position": "center center"
      },
      {
        "label": "Hippopotamus segmentation",
        "image": "assets/tools/grounding-dino/hippopotamus_seg.jpg",
        "position": "center center"
      },
      {
        "label": "SA-V dataset example",
        "image": "assets/tools/grounding-dino/sa_v_dataset.jpg",
        "position": "center center"
      },
      {
        "label": "Hippopotamus video segmentation",
        "video": "assets/tools/grounding-dino/hippopotamus.mp4",
        "position": "center center"
      }
    ],
    "apiExample": "python demo/inference_on_a_image.py -c tools/grounding-dino/config/GroundingDINO_SwinT_OGC.py -p tools/grounding-dino/weights/groundingdino_swint_ogc.pth -i tools/grounding-dino/examples/input.jpg -t \"mug . cup . bottle\" -o tools/grounding-dino/runs",
    "shortExplanation": "Input an image and text phrases, then Grounding DINO returns grounded boxes with confidence scores.",
    "presetExample": {
      "title": "Ground text prompts in image",
      "input": "tools/grounding-dino/examples/input.jpg",
      "prompt": "mug . cup . bottle",
      "runLabel": "Run grounding",
      "expectedOutput": "Annotated image and box/label/score predictions.",
      "image": "assets/tools/grounding-dino/grounded_sam2_annotated_image_with_mask.jpg"
    },
    "parameterNotes": [
      {
        "name": "image",
        "control": "file",
        "meaning": "Input RGB image."
      },
      {
        "name": "text_prompt",
        "control": "text",
        "defaultValue": "mug . cup . bottle",
        "meaning": "Dot-separated category words or phrases."
      },
      {
        "name": "box_threshold",
        "control": "slider",
        "defaultValue": "0.35",
        "meaning": "Minimum confidence for predicted boxes."
      },
      {
        "name": "text_threshold",
        "control": "slider",
        "defaultValue": "0.25",
        "meaning": "Minimum phrase similarity threshold."
      }
    ],
    "outputNotes": [
      {
        "name": "boxes",
        "meaning": "Predicted region coordinates."
      },
      {
        "name": "phrases",
        "meaning": "Matched text phrases for each box."
      },
      {
        "name": "scores",
        "meaning": "Confidence values for grounded detections."
      }
    ],
    "deploymentNotes": [
      "Install Grounding DINO dependencies and build optional CUDA extensions if required.",
      "Download official checkpoints and config files.",
      "Run image demo with text prompt and thresholds.",
      "Save visualizations and prediction JSON under tools/grounding-dino/runs/."
    ],
    "modelLinks": [
      {
        "label": "Checkpoint Links",
        "url": "https://github.com/IDEA-Research/GroundingDINO#weights"
      }
    ],
    "benchmarkDataset": "Paper reports COCO zero-shot AP and ODinW transfer benchmarks.",
    "benchmarkMetric": "Use official zero-shot AP metrics from the paper for comparison.",
    "benchmarkLatency": "Latency depends on backbone and resolution; Swin-T is lighter than larger variants.",
    "benchmarkArtifacts": "Official config files, pretrained weights, and demo outputs.",
    "license": "Apache-2.0",
    "owner": "IDEA-Research",
    "version": "main"
  },
  {
    "slug": "restormer",
    "title": "Restormer",
    "category": "Perception and Grounding",
    "task": "Image restoration",
    "summary": "Transformer-based high-resolution image restoration for denoising, deblurring, and deraining.",
    "input": "Degraded image",
    "output": "Restored image",
    "runtime": "Python / PyTorch",
    "status": "Runnable",
    "paperTitle": "Restormer: Efficient Transformer for High-Resolution Image Restoration",
    "paperAuthors": "Syed Waqas Zamir, Aditya Arora, Salman Khan, et al.",
    "paperVenue": "CVPR 2022 / arXiv:2111.09881",
    "paperContribution": "Designs an efficient transformer architecture specialized for high-resolution restoration tasks.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/swz30/Restormer"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2111.09881"
      }
    ],
    "heroImage": "assets/tools/restormer/network-architecture.png",
    "demos": [
      {
        "label": "Network architecture",
        "image": "assets/tools/restormer/network-architecture.png",
        "position": "center center"
      },
      {
        "label": "Defocus deblurring results",
        "image": "assets/tools/restormer/defocus-deblurring.png",
        "position": "center center"
      },
      {
        "label": "Motion deblurring results",
        "image": "assets/tools/restormer/single-image-motion-deblurring.png",
        "position": "center center"
      },
      {
        "label": "Image deraining results",
        "image": "assets/tools/restormer/image-deraining.png",
        "position": "center center"
      },
      {
        "label": "Real image denoising",
        "image": "assets/tools/restormer/real-image-denoising.png",
        "position": "center center"
      },
      {
        "label": "Color Gaussian denoising",
        "image": "assets/tools/restormer/gaussian-image-denoising-color.png",
        "position": "center center"
      },
      {
        "label": "Grayscale Gaussian denoising",
        "image": "assets/tools/restormer/gaussian-image-denoising-grayscale.png",
        "position": "center center"
      },
      {
        "label": "Degraded sample 1",
        "image": "assets/tools/restormer/paper-demo-1.jpg",
        "position": "center center"
      },
      {
        "label": "Degraded sample 2",
        "image": "assets/tools/restormer/paper-demo-2.jpg",
        "position": "center center"
      }
    ],
    "apiExample": "python demo.py --task Motion_Deblurring --input_dir tools/restormer/examples --result_dir tools/restormer/runs",
    "shortExplanation": "Restormer restores degraded images with a transformer architecture tuned for image quality and efficiency.",
    "presetExample": {
      "title": "Restore degraded image",
      "input": "tools/restormer/examples/blur.png",
      "prompt": "task: Motion_Deblurring",
      "runLabel": "Run restoration",
      "expectedOutput": "A restored image saved to the result directory.",
      "image": "assets/tools/restormer/image-deraining.png"
    },
    "parameterNotes": [
      {
        "name": "task",
        "control": "select",
        "defaultValue": "Motion_Deblurring",
        "meaning": "Restoration task profile (deblurring, denoising, deraining, etc.)."
      },
      {
        "name": "input_dir",
        "control": "path",
        "meaning": "Input image directory."
      },
      {
        "name": "result_dir",
        "control": "path",
        "meaning": "Directory where restored outputs are written."
      }
    ],
    "outputNotes": [
      {
        "name": "restored_image",
        "meaning": "Image after restoration processing."
      }
    ],
    "deploymentNotes": [
      "Install dependencies and download task-specific pretrained weights.",
      "Pick the matching task configuration for your degradation type.",
      "Run demo/eval script with repository-relative directories.",
      "Collect outputs under tools/restormer/runs/."
    ],
    "modelLinks": [
      {
        "label": "Pretrained Models",
        "url": "https://github.com/swz30/Restormer#pretrained-models"
      }
    ],
    "benchmarkDataset": "Paper reports GoPro, SIDD, DND, Rain100H and related restoration benchmarks.",
    "benchmarkMetric": "Primary metrics are PSNR and SSIM on task-specific datasets.",
    "benchmarkLatency": "Runtime depends on image resolution and restoration task.",
    "benchmarkArtifacts": "Paper tables, pretrained checkpoints, and demo scripts.",
    "license": "MIT",
    "owner": "swz30",
    "version": "main"
  },
  {
    "slug": "zero-dce",
    "title": "Zero-DCE",
    "category": "Perception and Grounding",
    "task": "Low-light image enhancement",
    "summary": "Zero-reference deep curve estimation for enhancing low-light images.",
    "input": "Low-light image",
    "output": "Enhanced image",
    "runtime": "Python / PyTorch",
    "status": "Runnable",
    "paperTitle": "Zero-Reference Deep Curve Estimation for Low-Light Image Enhancement",
    "paperAuthors": "Chongyi Li, Chunle Guo, Chen Change Loy",
    "paperVenue": "CVPR 2020 / arXiv:2001.06826",
    "paperContribution": "Enhances low-light images without paired supervision via learnable curve estimation.",
    "paperLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/Li-Chongyi/Zero-DCE"
      },
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2001.06826"
      }
    ],
    "heroImage": "assets/tools/zero-dce/results.png",
    "demos": [
      {
        "label": "Visual comparisons",
        "image": "assets/tools/zero-dce/results.png",
        "position": "center center"
      },
      {
        "label": "Pipeline",
        "image": "assets/tools/zero-dce/framework.png",
        "position": "center center"
      },
      {
        "label": "Face detection results",
        "image": "assets/tools/zero-dce/face.png",
        "position": "center center"
      },
      {
        "label": "Loss ablation",
        "image": "assets/tools/zero-dce/loss.png",
        "position": "center center"
      },
      {
        "label": "Parameter settings",
        "image": "assets/tools/zero-dce/parameter.png",
        "position": "center center"
      },
      {
        "label": "Training data impact",
        "image": "assets/tools/zero-dce/training.png",
        "position": "center center"
      },
      {
        "label": "Three-channel adjustment",
        "image": "assets/tools/zero-dce/channel.png",
        "position": "center center"
      }
    ],
    "apiExample": "python lowlight_test.py --input tools/zero-dce/examples --output tools/zero-dce/runs",
    "shortExplanation": "Zero-DCE brightens and enhances low-light images using a zero-reference training objective.",
    "presetExample": {
      "title": "Enhance low-light image",
      "input": "tools/zero-dce/examples/lowlight.png",
      "prompt": "default enhancement pipeline",
      "runLabel": "Run enhancement",
      "expectedOutput": "Enhanced image with improved brightness and contrast.",
      "image": "assets/tools/zero-dce/results.png"
    },
    "parameterNotes": [
      {
        "name": "input",
        "control": "path",
        "meaning": "Input low-light image path or directory."
      },
      {
        "name": "output",
        "control": "path",
        "meaning": "Directory for enhanced outputs."
      }
    ],
    "outputNotes": [
      {
        "name": "enhanced_image",
        "meaning": "Brightness- and contrast-improved output image."
      }
    ],
    "deploymentNotes": [
      "Install project dependencies and download official pretrained weights.",
      "Prepare low-light image directory under tools/zero-dce/examples/.",
      "Run test script with repository-relative input/output paths.",
      "Store enhanced results under tools/zero-dce/runs/."
    ],
    "modelLinks": [
      {
        "label": "Pretrained Model",
        "url": "https://github.com/Li-Chongyi/Zero-DCE#testing"
      }
    ],
    "benchmarkDataset": "Paper evaluates on LOL and multiple no-reference enhancement settings.",
    "benchmarkMetric": "Common metrics include PSNR/SSIM (paired) and NIQE-based quality checks.",
    "benchmarkLatency": "Lightweight inference suitable for real-time enhancement scenarios.",
    "benchmarkArtifacts": "Official code, pretrained weights, and test scripts.",
    "license": "Not specified in repository",
    "owner": "Li-Chongyi",
    "version": "master"
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
