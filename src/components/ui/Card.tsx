import * as React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/src/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "outline";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-neutral-900 border border-white/5 shadow-xl",
      glass: "glass shadow-2xl",
      outline: "border border-white/10 bg-transparent",
    };

    return (
      <motion.div
        ref={ref}
        className={cn("rounded-2xl p-6", variants[variant], className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";
