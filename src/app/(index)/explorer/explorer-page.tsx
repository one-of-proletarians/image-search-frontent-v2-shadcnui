"use client";

import { useRef, useState } from "react";

export interface CommonExplorerItem {
  hovered: boolean;
  selected: boolean;
  moving: boolean;
  position: {
    x: number;
    y: number;
  };
}

export interface Folder extends CommonExplorerItem {
  name: string;
}

const folders: Folder[] = Array.from({ length: 10 }).map((_, i) => ({
  name: `Folder ${i}`,
  selected: false,
  hovered: false,
  moving: false,
  position: { x: 0, y: 0 },
}));

export default function ExplorerPage() {
  const [items, setItems] = useState<Folder[]>(folders);
  const cursorRef = useRef({ x: 0, y: 0 });

  return "hello";
}
