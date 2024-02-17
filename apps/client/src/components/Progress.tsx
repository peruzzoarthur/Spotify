"use client";

import { Progress } from "@/components/ui/progress";

type CreateProgressDemoProps = {
  progress: number;
  setProgress?: React.Dispatch<React.SetStateAction<number>>;
};

export const CreateProgress = ({
  progress,
}: CreateProgressDemoProps): JSX.Element => {
  return <Progress value={progress} />;
};
