import { useEffect, useRef, useState } from "react";
import styles from "../styles/CustomCursor2.module.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    const updateCursorPosition = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Handle hover on buttons and links
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.closest("button") ||
        e.target.closest("a")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.closest("button") ||
        e.target.closest("a")
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div>
      <div
        ref={cursorRef}
        className={`${styles.cursorOutline}`}
        style={{
          width: isHovering ? "30px" : "100px",
          height: isHovering ? "30px" : "100px",
          background: isHovering ? "rgba(148, 221, 255, 0.5)" : "#ffffff30",
        }}
      />
    </div>
  );
}
