import { useState, useEffect } from "react";

type useCreateProgressProps = {
  // initialProgress: number;
  // finalProgress: number;
  delay: number;
  conditional?: boolean;
};

export const useCreateProgress = ({
  // initialProgress,
  // finalProgress,
  delay,
  conditional,
}: useCreateProgressProps) => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    setProgress(13);
    const timer = setTimeout(() => {
      setProgress(66);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, conditional]);

  return { progress, setProgress };
};
