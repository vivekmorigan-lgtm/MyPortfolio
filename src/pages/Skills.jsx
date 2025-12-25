import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "../styles/Skills.module.css";
import ReactLogo from "../SVG/react.svg";
import JsLogo from "../SVG/js-svgrepo-com.svg";
import HtmlLogo from "../SVG/html5-svgrepo-com.svg";
import CssLogo from "../SVG/css3-shiled-svgrepo-com.svg";
import NodeLogo from "../SVG/node-js-svgrepo-com.svg";
import MongoLogo from "../SVG/mongodb-svgrepo-com.svg";
import FigmaLogo from "../SVG/figma-svgrepo-com.svg";
import BootstrapLogo from "../SVG/bootstrap-svgrepo-com.svg";
import Scroll from "../components/Infinite.jsx";

gsap.registerPlugin(ScrollTrigger);

function Skill() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title with rotation
      gsap.from(sectionRef.current?.querySelector("h1"), {
        opacity: 0,
        x: -30,
        rotation: -5,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 60%",
          scrub: false,
        },
      });

      // Animate content with parallax
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            end: "top 65%",
            scrub: false,
          },
        });

        // Content parallax on scroll
        gsap.to(contentRef.current, {
          x: -20,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      }

      // Animate sidebar logos with rotation
      if (sidebarRef.current) {
        gsap.from(sidebarRef.current, {
          opacity: 0,
          x: 30,
          rotation: 10,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: "top 85%",
            end: "top 65%",
            scrub: false,
          },
        });

        // Sidebar parallax effect
        gsap.to(sidebarRef.current, {
          x: 20,
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });

        // Add hover animation to logo stack with rotation
        const logoItems = sidebarRef.current.querySelectorAll("img");
        logoItems.forEach((logo, i) => {
          // Scroll-triggered rotation animation
          gsap.to(logo, {
            rotation: i % 2 === 0 ? 5 : -5,
            scrollTrigger: {
              trigger: sidebarRef.current,
              start: "top 60%",
              end: "bottom 20%",
              scrub: 1,
            },
          });

          logo.addEventListener("mouseenter", () => {
            gsap.to(logo, {
              scale: 1.15,
              rotation: i % 2 === 0 ? 15 : -15,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          logo.addEventListener("mouseleave", () => {
            gsap.to(logo, {
              scale: 1,
              rotation: i % 2 === 0 ? 5 : -5,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const logos = [
    { src: ReactLogo, alt: "React" },
    { src: JsLogo, alt: "JavaScript" },
    { src: HtmlLogo, alt: "HTML5" },
    { src: CssLogo, alt: "CSS3" },
    { src: NodeLogo, alt: "Node.js" },
    { src: MongoLogo, alt: "MongoDB" },
    { src: FigmaLogo, alt: "Figma" },
    { src: BootstrapLogo, alt: "Bootstrap" },
  ];
  return (
    <section className={styles.skillSection} ref={sectionRef}>
      <h1 className={styles.pageTitle}>Skills</h1>

      <div className={styles.grid}>
        <div className={styles.content} ref={contentRef}>
          <div className={styles.mainCont}>
            <h2>Frontend + Design</h2>
            <p>
              I build responsive, accessible interfaces using component-driven
              patterns. My focus is on performance, micro-interactions, and
              maintainable UI systems.
            </p>
            <p>Beside are some of the tools and technologies I use regularly.</p>
          </div>
        </div>

        <div className={styles.sidebar} ref={sidebarRef}>
          <div className={styles.logoStack}>
            <Scroll
              logos={logos}
              gap={32}
              speed={140}
              ariaLabel="Skills logos medium"
              className={styles.logoLoop}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;
