import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "../styles/nav.module.css";

export default function Nav() {
  const navRef = useRef(null);
  const brandRef = useRef(null);
  const btnRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShrink = scrollPosition > 100;

      if (shouldShrink !== isScrolled) {
        setIsScrolled(shouldShrink);
        gsap.to(navRef.current, {
          width: shouldShrink ? "90%" : "100%",
          backgroundColor: shouldShrink
            ? "rgba(255, 255, 255, 0.01)"
            : "rgba(0, 0, 0, 0.8)",
          borderRadius: shouldShrink ? "12px" : "0px",
          left: shouldShrink ? "5%" : "0%",
          duration: 0.4,
          ease: "power2.inOut",
          borderBottom: shouldShrink
            ? "1px solid rgba(255, 255, 255, 0.2)"
            : "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // Initial animations and button interactions
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(brandRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(btnRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.6,
        ease: "power3.out",
      });

      if (btnRef.current) {
        btnRef.current.addEventListener("mouseenter", () => {
          gsap.to(btnRef.current, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        btnRef.current.addEventListener("mouseleave", () => {
          gsap.to(btnRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav className={styles.nav} ref={navRef}>
      <h1 className={styles.brand} ref={brandRef}>
        Twinzler
      </h1>
      <button
        className={styles.btn}
        ref={btnRef}
        onClick={() => {
          window.location.href = "https://github.com/vivekmorigan-lgtm";
        }}
      >
        Hire me
      </button>
    </nav>
  );
}
