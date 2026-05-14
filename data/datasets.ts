export type DatasetEntry = {
  title: string;
  summary: string;
  task: string;
  format: string;
  license: string;
  downloadLabel: string;
  href: string;
};

export const datasets: DatasetEntry[] = [
  {
    title: "Dataset Placeholder",
    summary: "Brief dataset summary, evaluation split note, annotation format, and usage status.",
    task: "Task",
    format: "Format",
    license: "HF Download",
    downloadLabel: "Hugging Face",
    href: "https://huggingface.co/"
  },
  {
    title: "Dataset Placeholder",
    summary: "Space for sample count, labels, benchmark split, data source, and license.",
    task: "Task",
    format: "Evaluation set",
    license: "HF Download",
    downloadLabel: "Hugging Face",
    href: "https://huggingface.co/"
  }
];
