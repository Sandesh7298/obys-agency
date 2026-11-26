function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the '#main' element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  let tl = gsap.timeline();

  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });

  tl.from("#line1-part1", {
    opacity: 0,
    onStart: () => {
      let h5Timer = document.querySelector("#line1-part1 h5");
      let grow = 0;

      let int = setInterval(() => {
        if (grow < 100) {
          grow++;
          h5Timer.innerHTML = grow;
        } else {
          clearInterval(int);
        }
      }, 40);
    },
  });

  tl.to(".line h2", {
    opacity: 1,
    duration: 0.5,
    animationName: "anime",
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.5,
    delay: 3.5,
  });

  tl.from("#page1", {
    y: 1600,
    opacity: 0,
    duration: 0.6,
  });

  tl.set("#loader", {
    display: "none",
  });

  tl.from("#nav", {
    opacity: 0,
  });

  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
    y: 200,
    stagger: 0.2,
  });

  tl.from(
    "#hero1 h1, #page2",
    {
      opacity: 0,
    },
    "-=1.2",
  );
}

function cursorAnimation() {
  // document.addEventListener("mousemove", (e) => {
  //   gsap.to("#crsr", {
  //     left: e.x,
  //     top: e.y,
  //     duration: 0.5,
  //   });
  // });

  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 0.5,
  });

  // Shery Effects
  Shery.makeMagnet("#nav-part2 h4, #nav svg", {});

  let videoContainer = document.querySelector("#video-container");
  let videoCursor = document.querySelector("#video-cursor");
  let video = document.querySelector("#video-container video");

  gsap.set(videoCursor, {
    xPercent: -50,
    yPercent: -50,
  });

  videoContainer.addEventListener("mousemove", (dets) => {
    const rect = videoContainer.getBoundingClientRect();

    gsap.to(".mousefollower", {
      display: "none",
      delay: -0.5,
    });

    gsap.to(videoCursor, {
      x: dets.clientX - rect.left,
      y: dets.clientY - rect.top,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  videoContainer.addEventListener("mouseleave", () => {
    gsap.to(".mousefollower", {
      display: "initial",
    });

    gsap.to("#video-cursor", {
      x: 0,
      y: 0,
      duration: 0.5,
    });
  });

  let isPlay = false;

  videoContainer.addEventListener("click", () => {
    if (!isPlay) {
      let tl = gsap.timeline();

      video.style.opacity = 1;
      video.play();
      isPlay = true;

      gsap.to("#video-cursor i", {
        className: "ri-pause-mini-fill",
      });

      tl.to("#video-cursor", {
        scale: 0.5,
      });
    } else {
      video.style.opacity = 0;
      isPlay = false;
      video.pause();

      let tl = gsap.timeline();

      gsap.to("#video-cursor i", {
        className: "ri-play-mini-fill",
      });
      tl.to("#video-cursor", {
        scale: 1,
      });
    }
  });
}

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.727282400510747 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 12.65, range: [1, 15] },
      durationOut: { value: 3.32, range: [0.1, 5] },
      durationIn: { value: 4.44, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 1.3, range: [0, 10] },
      metaball: { value: 0.37, range: [0, 2] },
      discard_threshold: { value: 0.56, range: [0, 1] },
      antialias_threshold: { value: 0.03, range: [0, 0.1] },
      noise_height: { value: 0.47, range: [0, 2] },
      noise_scale: { value: 14.5, range: [0, 100] },
      uFrequencyX: { value: 100, range: [0, 100] },
      uFrequencyY: { value: 44.86, range: [0, 100] },
      uFrequencyZ: { value: 100, range: [0, 100] },
      uTime: { value: 37.14299999999965 },
    },
  });
}

function flagAnimation() {
  document.querySelectorAll("#heros .hero").forEach((elem) => {
    elem.addEventListener("mousemove", (dets) => {
      gsap.to("#flag", {
        x: dets.x,
        y: dets.y,
      });
    });
  });

  document.querySelectorAll("#heros .hero").forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      gsap.to("#flag", {
        // display: "block",
        opacity: 1,
      });
      gsap.to(".mousefollower", {
        opacity: 0,
        delay: -0.5,
      });
    });
  });

  document.querySelectorAll("#heros .hero").forEach((elem) => {
    elem.addEventListener("mouseleave", () => {
      gsap.to("#flag", {
        // display: "none",
        opacity: 0,
        zIndex: -999,
      });
      gsap.to(".mousefollower", {
        opacity: 1,
        delay: -0.5,
      });
    });
  });
}

function footerAnimation() {
  var clutter = "";
  var clutter2 = "";
  document
    .querySelector("#footer h1")
    .textContent.split("")
    .forEach(function (elem) {
      clutter += `<span>${elem}</span>`;
    });
  document.querySelector("#footer h1").innerHTML = clutter;
  document
    .querySelector("#footer h2")
    .textContent.split("")
    .forEach(function (elem) {
      clutter2 += `<span>${elem}</span>`;
    });
  document.querySelector("#footer h2").innerHTML = clutter2;

  document
    .querySelector("#footer-text")
    .addEventListener("mouseenter", function () {
      gsap.to("#footer h1 span", {
        opacity: 0,
        stagger: 0.05,
      });
      gsap.to("#footer h2 span", {
        delay: 0.35,
        opacity: 1,
        stagger: 0.1,
      });
    });
  document
    .querySelector("#footer-text")
    .addEventListener("mouseleave", function () {
      gsap.to("#footer h1 span", {
        opacity: 1,
        stagger: 0.1,
        delay: 0.35,
      });
      gsap.to("#footer h2 span", {
        opacity: 0,
        stagger: 0.05,
      });
    });
}

locomotiveAnimation();
loadingAnimation();
cursorAnimation();
sheryAnimation();
flagAnimation();
footerAnimation();
