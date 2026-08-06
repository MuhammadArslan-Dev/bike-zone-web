"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function useMouseParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const offsetX = (event.clientX / window.innerWidth - 0.5) * strength;
      const offsetY = (event.clientY / window.innerHeight - 0.5) * strength;
      x.set(offsetX);
      y.set(offsetY);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [strength, x, y]);

  return { x: springX, y: springY };
}
