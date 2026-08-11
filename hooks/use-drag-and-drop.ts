"use client";

import { useState, DragEvent } from "react";

export const useDragAndDrop = (onDrop: (files: FileList) => void) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    setIsDragging(false);
    if (e.dataTransfer.files) {
      onDrop(e.dataTransfer.files);
    }
  };

  return {
    isDragging,
    dragProps: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  };
}