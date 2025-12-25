import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "../styles/Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title with rotation
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

      // Stagger animation for project cards with skew
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".projectCard");
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          skewY: (i) => (i % 2 === 0 ? -3 : 3),
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "top 65%",
            scrub: false,
          },
        });

        // Scroll parallax effect on cards
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? 15 : -15,
            rotation: i % 2 === 0 ? 1 : -1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          });
        });

        // Hover animation for project cards
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });

        // Animate project images with skew on scroll
        const images = cardsRef.current.querySelectorAll(".projectImage");
        images.forEach((img, i) => {
          gsap.to(img, {
            skewX: i % 2 === 0 ? 2 : -2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 60%",
              end: "bottom 20%",
              scrub: 1,
            },
          });
        });

        // Animate project links
        const links = cardsRef.current.querySelectorAll(".projectLink");
        links.forEach((link) => {
          link.addEventListener("mouseenter", () => {
            gsap.to(link, {
              x: 5,
              rotation: 2,
              duration: 0.2,
              ease: "power2.out",
            });
          });

          link.addEventListener("mouseleave", () => {
            gsap.to(link, {
              x: 0,
              rotation: 0,
              duration: 0.2,
              ease: "power2.out",
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <h1 className={styles.title}>Projects</h1>
      <p
        style={{
          padding: "0 clamp(8px, 5vw, 12px)",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        Here are some of my projects!
      </p>
      <div className={styles.projectCardContainer} ref={cardsRef}>
        <div className={styles.projectCard}>
          <div className={styles.projectImage}>
            <div className={styles.img1}></div>
          </div>
          <h2>Custom Homepage</h2>
          <p>
            This project contains a custom homepage design with responsive
            layout and interactive elements such as animated clock and notes
            saver.
          </p>
          <a
            href="https://github.com/vivekmorigan-lgtm/CustomHomepage2"
            className={styles.projectLink}
          >
            Go to github
            <div className={styles.arrowWrapper}>
              <div className={styles.arrow}></div>
            </div>
          </a>
        </div>
        <div className={styles.projectCard}>
          <div className={styles.projectImage}>
            <div className={styles.img2}></div>
          </div>
          <h2>Chief's.io</h2>
          <p>
            Tracker on a famous game coc know as Clash of Clans which is used to
            track how much of a upgrade is completed.
          </p>
          <a
            href="https://github.com/vivekmorigan-lgtm/COC-tracker"
            className={styles.projectLink}
          >
            Go to github
            <div className={styles.arrowWrapper}>
              <div className={styles.arrow}></div>
            </div>
          </a>
        </div>
        <div className={styles.projectCard}>
          <div className={styles.projectImage}>
            <div className={styles.img3}></div>
          </div>
          <h2>Toolzerhub</h2>
          <p>
            Toolzer is a platform for people to find and use tools of many things all at one place.I have contributed to frontend of this project and a tool I have created.
          </p>
          <a
            href="https://toolzerhub.com/"
            className={styles.projectLink}
          >
            Go to website
            <div className={styles.arrowWrapper}>
              <div className={styles.arrow}></div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
