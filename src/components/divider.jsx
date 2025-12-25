import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Divider() {
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale animation on scroll entrance
      gsap.from(dividerRef.current, {
        scaleX: 0,
        duration: 0.6,
        ease: "power3.out",
        transformOrigin: "center",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 90%",
          end: "top 80%",
          scrub: false,
        },
      });

      // Opacity animation on scroll
      gsap.to(dividerRef.current, {
        opacity: 0.5,
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          onEnter: () => {
            gsap.to(dividerRef.current, { opacity: 1, duration: 0.3 });
          },
          onLeave: () => {
            gsap.to(dividerRef.current, { opacity: 0.5, duration: 0.3 });
          },
        },
      });

      // Scale width on scroll
      gsap.to(dividerRef.current, {
        scaleX: 0.8,
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    }, dividerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={dividerRef}
      style={{
        border: "none",
        background: "#0e0e0e",
        margin: "clamp(1rem, 3vw, 2rem) 0",
        height: "2px",
        width: "100%",
      }}
    ></div>
  );
}
