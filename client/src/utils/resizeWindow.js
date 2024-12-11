import { useEffect, useState } from "react";

export function resizeWindow() {
  const [width, setWidth] = useState(window.innerWidth);
  console.log(width);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return width;
}
