import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/hooks/lib/utils";

export const ModifiedSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, onValueChange, defaultValue, ...props }, ref) => {
  const [sliderValue, setSliderValue] = useState<number[] | undefined>(
    defaultValue
  );

  const handleValueChange = (value: number[]) => {
    setSliderValue(defaultValue); // Update the state with the current value
    if (onValueChange) {
      onValueChange(value); // Call the onValueChange prop if it's provided
    }
  };

  return (
    <div className="slider-container">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        onValueChange={handleValueChange}
        defaultValue={defaultValue}
        {...props}
      >
        <div className="text-xs text-white slider-value">{sliderValue}</div>
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block w-4 h-4 transition-colors border rounded-full shadow border-primary/50 bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
});

ModifiedSlider.displayName = SliderPrimitive.Root.displayName;

export const LoudnessModifiedSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, onValueChange, ...props }, ref) => {
  const [sliderValue, setSliderValue] = useState<number[]>([-30]);

  const handleValueChange = (value: number[]) => {
    setSliderValue(value); // Update the state with the current value
    if (onValueChange) {
      onValueChange(value); // Call the onValueChange prop if it's provided
    }
  };

  return (
    <div className="slider-container">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        onValueChange={handleValueChange}
        {...props}
      >
        <div className="text-xs text-white slider-value">{sliderValue}</div>
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block w-4 h-4 transition-colors border rounded-full shadow border-primary/50 bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
});

LoudnessModifiedSlider.displayName = SliderPrimitive.Root.displayName;
