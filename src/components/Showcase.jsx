import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Showcase = () => {
  const showcaseRef = useRef(null);
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(
    () => {
      if (!isTablet) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        });

        timeline
          .to(".mask img", {
            scale: 1.1,
          })
          .to(".content", { opacity: 1, y: 0, ease: "power1.in" });
      }
    },
    { scope: showcaseRef, dependencies: [isTablet] }
  );

  return (
    <section id="showcase" ref={showcaseRef}>
      <div className="media">
        <video
          src="/videos/game.mp4"
          loop
          muted
          autoPlay
          playsInline
          onError={(e) => console.error("Video failed to load:", e)}
          aria-label="Product showcase video"
        />

        <div className="mask">
          <img src="/mask-logo.svg" alt="mask" />
        </div>
      </div>

      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Rocket Chip</h2>

            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 powers the new MacBook Pro, delivering incredible
                performance and enabling advanced features.
              </p>
              <p>
                It drives Apple Intelligence on iPad Pro, so you can write,
                create, and accomplish more with ease. All in a design
                that&apos;s unbelievably thin, light, and powerful.
              </p>
              <p>
                A brand-new display engine delivers breathtaking precision,
                color accuracy, and brightness. And a next-gen GPU with
                hardware-accelerated ray tracing brings console-level graphics
                to your fingertips.
              </p>
              <a
                href="https://www.apple.com/in/apple-intelligence/"
                className="text-primary hover:border-b-2 border-primary transition-all duration-150"
              >
                Learn more about Apple Intelligence →{" "}
              </a>
            </div>
          </div>

          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
