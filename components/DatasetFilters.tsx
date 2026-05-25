"use client";

import { useState } from "react";
import { CompactSelect, type CompactSelectOption } from "./CompactSelect";

const taskOptions: CompactSelectOption[] = [
  { value: "All tasks", label: "All tasks" },
  { value: "Object detection", label: "Object detection" },
  { value: "Segmentation", label: "Segmentation" },
  { value: "Manipulation", label: "Manipulation" }
];

const formatOptions: CompactSelectOption[] = [
  { value: "All formats", label: "All formats" },
  { value: "COCO", label: "COCO" },
  { value: "YOLO", label: "YOLO" },
  { value: "Custom", label: "Custom" }
];

const licenseOptions: CompactSelectOption[] = [
  { value: "All licenses", label: "All licenses" },
  { value: "Open", label: "Open" },
  { value: "Research only", label: "Research only" }
];

export function DatasetFilters() {
  const [task, setTask] = useState("All tasks");
  const [format, setFormat] = useState("All formats");
  const [license, setLicense] = useState("All licenses");

  return (
    <div className="filters">
      <CompactSelect ariaLabel="Task filter" value={task} options={taskOptions} onChange={setTask} />
      <CompactSelect ariaLabel="Format filter" value={format} options={formatOptions} onChange={setFormat} />
      <CompactSelect ariaLabel="License filter" value={license} options={licenseOptions} onChange={setLicense} />
    </div>
  );
}
