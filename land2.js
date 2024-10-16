gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtllocomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".website"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (syncpositioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".website" elementsince Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".website", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrollingvertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices -it doesn't even transform the container at all! So to get the correctbehavior and avoid jitters, we should pin things with position: fixed onmobile. We sense it by checking to see if there's a transform applied to thecontainer (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".website").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and thenupdate LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and updateLocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


function imageScalingEffect(a, b, c, d) {
  gsap.from(a, {
    scale: 1.5,
    filter: 'blur(0.5px)',
    scrollTrigger: {
      trigger: b,
      scroller: ".website",
      start: c,
      end: d,
      scrub: true
    }
  })
}
function imageScalingEffectComponents() {
  if (window.innerWidth > 600) {
    imageScalingEffect(document.querySelector("#hero_section img"), document.querySelector("#hero_section"), "top 55%", "top -20%")
    imageScalingEffect(document.querySelector(".page3 > div > img"), document.querySelector(".page3"), "top 75%", "top -80%")
    imageScalingEffect(document.querySelector(".page4 > div > img"), document.querySelector(".page4"), "top 75%", "top -80%")
    imageScalingEffect(document.querySelector(".page5 > div > img"), document.querySelector(".page5"), "top 75%", "top -80%")
  }
}
imageScalingEffectComponents()


function increaseHeight(a, b, c, d) {
  gsap.from(a, {
    height: 0,
    scrollTrigger: {
      trigger: b,
      scroller: ".website",
      start: c,
      end: d,
      scrub: 2
    }
  })
}
function increaseHeightComponents() {
  increaseHeight(document.querySelector(".social_line"), document.querySelector(".about_section"), "top 70%", "top 0%")
  increaseHeight(document.querySelector("#whatLine"), document.querySelector("#what"), "top 70%", "top 0%")
  if (window.innerWidth >= 780) {
    increaseHeight(document.querySelector("#art_line"), document.querySelector("#what"), "top 90%", "top 30%")
    increaseHeight(document.querySelector("#motion_line"), document.querySelector("#what"), "top 50%", "top 0%")
  }
}
increaseHeightComponents()

function increaseWidth(a, b, c, d) {
  gsap.from(a, {
    width: 0,
    scrollTrigger: {
      trigger: b,
      scroller: ".website",
      start: c,
      end: d,
      scrub: 2
    }
  })
}
function inceaseWidthComponents() {
  if (window.innerWidth >= 1000) {
    increaseWidth(document.querySelector(".about_btm_line"), document.querySelector(".about_section"),"top 0%", "bottom 60%")
  } else if (window.innerWidth < 1000) {
    increaseWidth(document.querySelector(".about_btm_line"), document.querySelector(".about_section"),"bottom 100%", "bottom 80%")
  }

  increaseWidth(document.querySelector(".work_intro_line"), document.querySelector(".work_intro"),"bottom 100%", "bottom 80%")
  if (window.innerWidth < 780) {
    console.log("hello");
    increaseWidth(document.querySelector("#art_line"), document.querySelector("#art"), "top 100%", "top 80%")
    increaseWidth(document.querySelector("#motion_line"), document.querySelector("#motion"), "top 100%", "top 80%")
    increaseWidth(document.querySelector("#explain_design_line"), document.querySelector("#inter_design"),"top 100%", "top 80%")
  } else {
    increaseWidth(document.querySelector("#explain_design_line"), document.querySelector("#explain_design"),"bottom 100%", "bottom 80%")
  }
}
inceaseWidthComponents()

