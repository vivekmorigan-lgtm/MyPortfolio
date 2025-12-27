import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "../styles/Home.module.css";
import TextPressure from "../components/TextPressure";

gsap.registerPlugin(ScrollTrigger);

function Land() {
  const sectionRef = useRef(null);
  const heroInnerRef = useRef(null);
  const heroVisualRef = useRef(null);
  const ctasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroInnerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(heroVisualRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      if (ctasRef.current) {
        const buttons = ctasRef.current.querySelectorAll("a");
        gsap.from(buttons, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
        });

        buttons.forEach((btn) => {
          btn.addEventListener("mouseenter", () => {
            gsap.to(btn, {
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      gsap.to(heroVisualRef.current, {
        y: -50,
        rotation: 5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
          markers: false,
        },
      });

      gsap.to(heroInnerRef.current, {
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      });

      gsap.to(ctasRef.current, {
        rotation: -2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom center",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.heroInner} ref={heroInnerRef}>
        <TextPressure text="Hi there!" />
        <h1 className={styles.heroLead}>
          I am <div className={styles.highlight}>Twinzler</div>
        </h1>
        <p className={styles.skillsP}>Ui/Ux designer | Web dev</p>
        <p className={styles.heroSub}>
          I create polished web experiences blending design and interactivity to
          craft memorable digital products with a focus on UI/UX design and
          frontend development skills.
        </p>
        <div className={styles.heroCtas} ref={ctasRef}>
          <a
            href="https://github.com/vivekmorigan-lgtm?tab=repositories"
            className={styles.cta}
          >
            View All Projects
          </a>
          <a href="mailto:Twinzler@proton.me" className={styles.ctaSecondary}>
            Mail Me
          </a>
        </div>
      </div>
      <div className={styles.heroVisual} ref={heroVisualRef}>
        <div className={styles.imgContainer}></div>
      </div>
    </section>
  );
}

export default Land;
