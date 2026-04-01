import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/src/lib/utils";

interface BackButtonProps {
  className?: string;
  variant?: "ghost" | "outline" | "glass" | "primary" | "secondary";
  label?: string;
}

export function BackButton({ className, variant = "ghost", label = "Back" }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={() => navigate(-1)}
      className={cn("flex items-center space-x-2 rounded-full", className)}
    >
      <ArrowLeft className="h-4 w-4" />
      {label && <span className="text-sm font-medium">{label}</span>}
    </Button>
  );
}
