import React from "react";

interface SpriglyLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export default function SpriglyLogo({ 
  className = "", 
  size = "md", 
  showText = true 
}: SpriglyLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl", 
    xl: "text-3xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-teal-400/30 rounded-full blur-sm"></div>
        
        {/* Main icon */}
        <svg
          viewBox="0 0 32 32"
          className="relative w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stem */}
          <path
            d="M16 8 L16 24 M12 24 L20 24"
            stroke="#0d9488"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Left leaf */}
          <path
            d="M16 12 L10 8 M16 12 L12 6"
            stroke="#0d9488"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Right leaf */}
          <path
            d="M16 12 L22 8 M16 12 L20 6"
            stroke="#0d9488"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Fill for leaves and stem */}
          <path
            d="M16 8 L16 24 M12 24 L20 24"
            stroke="#14b8a6"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M16 12 L10 8 M16 12 L12 6"
            stroke="#14b8a6"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M16 12 L22 8 M16 12 L20 6"
            stroke="#14b8a6"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <span className={`font-bold text-teal-600 ${textSizes[size]}`}>
          Sprigly
        </span>
      )}
    </div>
  );
}
