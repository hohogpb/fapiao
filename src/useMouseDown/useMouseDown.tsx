import { useEffect, useRef } from "react";

export const useMouseDown = (callback: (event: MouseEvent) => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      callback(event);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);
};
