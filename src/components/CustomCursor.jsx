import { useEffect, useRef, useState } from "react";
import styles from "../styles/CustomCursor.module.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const timerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const idleTimerRef = useRef(null);
  const delayedTimerRef = useRef(null);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }

      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);

        delayedTimerRef.current = setTimeout(() => {
          setShowTimer(true);
          setTimerSeconds(0);

          timerRef.current = setInterval(() => {
            setTimerSeconds((prev) => prev + 1);
          }, 1000);
        }, 3000);
      }, 5000);
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
      setIsIdle(false);
      setShowTimer(false);
      setTimerSeconds(0);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      if (delayedTimerRef.current) {
        clearTimeout(delayedTimerRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
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

    const resetIdle = () => {
      setIsIdle(false);
      setShowTimer(false);
      setTimerSeconds(0);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      if (delayedTimerRef.current) {
        clearTimeout(delayedTimerRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
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
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      if (delayedTimerRef.current) {
        clearTimeout(delayedTimerRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={cursorRef}
        className={`${styles.cursorOutline} ${isIdle ? styles.idle : ""}`}
        style={{
          width: isIdle ? "70px" : isHovering ? "30px" : "50px",
          height: isIdle ? "70px" : isHovering ? "30px" : "50px",
          background: isIdle
            ? "rgba(148, 221, 255, 0.9)"
            : isHovering
            ? "rgba(148, 221, 255, 0.5)"
            : "#ffffff30",
        }}
      />
      {showTimer && (
        <div className={styles.timerContainer}>
          <div
            className={styles.timerDisplay}
            style={{
              left: cursorRef.current
                ? parseInt(cursorRef.current.style.left) + 50
                : 0,
              top: cursorRef.current
                ? parseInt(cursorRef.current.style.top) - 60
                : 0,
            }}
          >
            <div className={styles.timerGlow}></div>
            <div className={styles.timerContent}>
              <span className={styles.timerLabel}>IDLE</span>
              <span className={styles.timerValue}>{timerSeconds}</span>
              <span className={styles.timerUnit}>s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
