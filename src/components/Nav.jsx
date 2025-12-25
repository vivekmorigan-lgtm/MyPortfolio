import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "../styles/nav.module.css";

export default function Nav() {
  const navRef = useRef(null);
  const brandRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate nav brand
      gsap.from(brandRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power3.out",
      });

      // Animate nav button
      gsap.from(btnRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.6,
        ease: "power3.out",
      });

      // Hover animation for button
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
        onClick={() => { window.location.href = "https://github.com/vivekmorigan-lgtm"; }}
      >
        Hire me
      </button>
    </nav>
  );
}
