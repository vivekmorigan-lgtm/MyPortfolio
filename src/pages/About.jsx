import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React from "react";
import styles from "../styles/About.module.css";
import ReactLogo from "../SVG/react.svg";
import CSSLogo from "../SVG/css3-shiled-svgrepo-com.svg";
import NodeLogo from "../SVG/node-js-svgrepo-com.svg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const highlightsRef = useRef(null);
  const cardsRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title and lead
      gsap.from(containerRef.current?.querySelector(".title"), {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 60%",
          scrub: false,
        },
      });

      gsap.from(containerRef.current?.querySelector(".lead"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 60%",
          scrub: false,
        },
      });

      // Stagger animation for highlight cards with rotation
      if (highlightsRef.current) {
        const items = highlightsRef.current.querySelectorAll("li");
        gsap.from(items, {
          opacity: 0,
          y: 20,
          rotation: (i) => (i % 2 === 0 ? -5 : 5),
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 85%",
            end: "top 65%",
            scrub: false,
          },
        });

        // Scroll-triggered rotation animation
        items.forEach((item, i) => {
          gsap.to(item, {
            rotation: i % 2 === 0 ? 2 : -2,
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          });
        });

        // Hover animation for highlight items
        items.forEach((item) => {
          item.addEventListener("mouseenter", () => {
            gsap.to(item, {
              y: -5,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          item.addEventListener("mouseleave", () => {
            gsap.to(item, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // Animate tool cards with skew effect
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".card");
        gsap.from(cards, {
          opacity: 0,
          scale: 0.8,
          skewY: (i) => (i % 2 === 0 ? -5 : 5),
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "top 65%",
            scrub: false,
          },
        });

        // Scroll parallax for cards
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? 20 : -20,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          });
        });

        // Hover animation for cards
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // Stagger animation for timeline entries with x offset
      if (timelineRef.current) {
        const entries = timelineRef.current.querySelectorAll(".entry");
        gsap.from(entries, {
          opacity: 0,
          x: (i) => (i % 2 === 0 ? -30 : 30),
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 85%",
            end: "top 65%",
            scrub: false,
          },
        });

        // Scroll animation for timeline
        gsap.to(entries, {
          x: 0,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });

        // Hover animation for timeline entries
        entries.forEach((entry) => {
          entry.addEventListener("mouseenter", () => {
            gsap.to(entry, {
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          entry.addEventListener("mouseleave", () => {
            gsap.to(entry, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.about} id="about" ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.lead}>
            I'm a frontend engineer focused on building accessible, performant,
            and delightful web experiences. I enjoy translating design intent
            into robust components and micro-interactions that scale.
          </p>

          <ul className={styles.highlights} ref={highlightsRef}>
            <li>
              <strong>5+</strong>
              <span>Years building web apps</span>
            </li>
            <li>
              <strong>React</strong>
              <span>SPAs, hooks, performance</span>
            </li>
            <li>
              <strong>Design</strong>
              <span>UI systems & motion</span>
            </li>
          </ul>
        </div>

        <div className={styles.cardCont} ref={cardsRef}>
          <h3>Main Tools</h3>
          <div className={styles.card}>
            React
            <br />
            <img src={ReactLogo} alt="React-logo" width="100" />
          </div>
          <div className={styles.card}>
            NodeJS
            <br />
            <img src={NodeLogo} alt="Node-logo" width="100" />
          </div>
          <div className={styles.card}>
            CSS
            <br />
            <img src={CSSLogo} alt="Css-logo" width="100" />
          </div>
        </div>
      </div>

      <div className={styles.timeline} ref={timelineRef}>
        <div className={styles.entry}>
          <time>2022</time>
          <p>Senior Frontend Engineer — focused on React performance</p>
        </div>
        <div className={styles.entry}>
          <time>2020</time>
          <p>Built cross-platform UI components and design tokens</p>
        </div>
      </div>
    </section>
  );
}
