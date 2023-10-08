import { isContentEditable } from "@testing-library/user-event/dist/utils";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  Component,
} from "react";
import { ArticleContext, BodyPosContext } from "../../utils/context";
import { BodyScrollContext } from "../../utils/context";
export function useHorizontalScroll() {
  const elRef = useRef();

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) {
          return;
        }
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          el.scrollLeft += e.deltaX;
        }
        el.scrollTo({ left: el.scrollLeft + e.deltaY });
      };
      el.addEventListener("wheel", onWheel);
      return () => el?.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}
const DetailSidebar = ({
  id,
  title,
  title_style,
  subtitle,
  logo,
  content,
  content_image,
}) => {
  const barRef = useRef(null);
  const componentRef = useHorizontalScroll();
  const scrollRef = useRef(null);
  const { page, setPage } = useContext(ArticleContext);
  const { bodyScroll, setBodyScroll } = useContext(BodyScrollContext);
  const { bodyPos, setBodyPos } = useContext(BodyPosContext);
  let animationFrameId = null; // Store the animation frame ID
  let startTime = null;
  let lastTouchTime = null;
  const duration = 1000;
  let isTwoFingerTouch = false;
  const [scrollState, setScrollState] = useState("0%");
  const handleMobileScroll = (e) => {};
  const handleTouchStart = (event) => {
    if (event.touches.length == 2) {
      isTwoFingerTouch = true;
    }
    cancelAnimationFrame(animationFrameId); // Cancel the previous animation
    startTime = Date.now();
    lastTouchTime = startTime;
    // Your touch start logic here
  };
  const handleTouchEnd = (event) => {
    // Your touch end logic here
    // Start a new animation if needed
    // const currentTime = Date.now();
    // if (touchstart == true)
    //   if (currentTime < lastTouchTime + duration) {
    //     animationFrameId = requestAnimationFrame(trackMomentum); // Start a new animation
    //   }
  };
  const trackMomentum = () => {
    const currentTime = Date.now();
    const elapsed = Math.min(currentTime - startTime, duration);
    updateScrollPosition(elapsed / duration);

    if (currentTime < lastTouchTime + duration) {
      animationFrameId = requestAnimationFrame(trackMomentum); // Store the animation frame ID
    }
  };
  const updateScrollPosition = (progress) => {
    scrollRef.current.style.width =
      (componentRef.current.scrollLeft /
        (componentRef.current.scrollWidth - componentRef.current.clientWidth)) *
        100 +
      "%";
  };
  const handleResize = () => {
    scrollRef.current.style.width =
      (componentRef.current.scrollLeft /
        (componentRef.current.scrollWidth - componentRef.current.clientWidth)) *
        100 +
      "%";
    if (componentRef.current.scrollWidth == componentRef.current.clientWidth)
      scrollRef.current.style.width = "100%";
  };
  const handleKeydown = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      document.getElementById(`${id}`).style.left = "100%";
      document.getElementsByTagName("body")[0].style.overflow = "auto";
      const temp = {};
      temp[`${title}`] = false;
      // setPage({ ...temp });
      setTimeout(() => {
        componentRef.current.scrollLeft = 0;
        scrollRef.current.style.width = 0;
      }, 250);
    }
  };
  const handleBottomScroll = (event) => {
    const temp =
      (componentRef.current.scrollLeft /
        (componentRef.current.scrollWidth - componentRef.current.clientWidth)) *
        100 +
      "%";

    setScrollState(temp);
  };
  useEffect(() => {
    const rect = barRef.current.getBoundingClientRect();
    rect.width <= window.innerWidth && (scrollRef.current.style.width = "100%");
    barRef?.current?.addEventListener("touchstart", handleTouchStart);
    barRef?.current?.addEventListener("touchend", handleTouchEnd);
    barRef.current.addEventListener("touchmove", handleMobileScroll);
    componentRef.current.addEventListener("scroll", handleBottomScroll);
    const onWheel = (e) => {
      if (e.deltaY == 0) return;
      e.preventDefault();
      console.log(componentRef.current.scrollLeft, e.deltaY);
      document
        .getElementsByClassName("detail-sidebar__content")[0]
        .scrollTo(100, 100);
    };
    // componentRef?.current?.addEventListener("wheel", onWheel);
    // document
    //   .getElementById("land-header")
    //   .style.setProperty("display", "none", "important");
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeydown);
    return () => {
      barRef?.current?.removeEventListener("touchstart", handleTouchStart);
      componentRef.current.removeEventListener("scroll", handleBottomScroll);
      barRef?.current?.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, [page]);

  const handleClose = () => {
    document.getElementById(`${id}`).style.left = "100%";
    document.body.style.touchAction = "auto";
    document.getElementById("land-header").style.borderBottom = "0px #999";
    setBodyScroll(!bodyScroll);
    document.body.style.overflow = bodyScroll ? "initial" : "hidden";
    document.body.style.position = "relative";
    window.scrollTo(0, bodyPos);
    // document.getElementsByTagName("html")[0].style.overflow = bodyScroll
    //   ? "initial"
    //   : "hidden";
    const temp = {};
    temp[`${title}`] = false;
    setPage({ ...temp });
    setTimeout(() => {
      componentRef.current.scrollLeft = 0;
      scrollRef.current.style.width = 0;
    }, 250);
  };

  const topContentElements = [];
  const bottomContentElements = [];
  for (let i = 0; i < content.length; i++) {
    if (i <= content.length / 2)
      topContentElements.push(
        <div className="mainbar__container">
          <h2 className="">{content[i].title}</h2>
          <p className="">{content[i].description}</p>
          {content[i].button && (
            <a href="" className="purple_btn">
              {content[i].button}
            </a>
          )}
        </div>
      );
    else
      bottomContentElements.push(
        <div className="mainbar__container">
          <h2>{content[i].title}</h2>
          <p>{content[i].description}</p>
          {content[i].button && (
            <a href="" className="purple_btn">
              {content[i].button}
            </a>
          )}
        </div>
      );
  }

  return (
    <div className="detail-sidebar__container">
      <div ref={componentRef} className="detail-sidebar__content">
        <div
          id="mainbar"
          className={`mainbar ${
            title == "Privacy First" && "privacy__container"
          }`}
          ref={barRef}
        >
          <div
            className={`mainbar-content  ${
              title == "Privacy First" && "privacy__flex"
            } ${content_image && "gap-100"}`}
          >
            <div
              className={`logo-content__container ${
                title == "Privacy First" && "privacy__center"
              } ${title == "Open source" && "opensource"} ${
                title == "A.R.C.H.I.E" && "archie"
              } ${title == "Merlin" && "merlin"} ${
                title == "Ultimate Security" && "security"
              } ${title == "True Automation" && "trueautomation"} ${
                title == "Autonomous Ecosystem" && "ecosystem"
              }`}
            >
              {title && title != "Merlin" && (
                <p className={`article_text ${title_style}`}>{title}</p>
              )}
              {logo && title != "Privacy First" && (
                <img src={logo} width="originalWidth" height="originalHeight" />
              )}
              {subtitle && (
                <div
                  id={`${title == "Privacy First" && "privacy_subtitle"}`}
                  className="subtitle"
                >
                  {subtitle}
                </div>
              )}
            </div>
            <div
              className={`features ${
                title == "Privacy First" && "privacy-feature"
              }`}
            >
              <div
                className={`features__container ${
                  bottomContentElements.length == 0 && "no-gap"
                }`}
              >
                <div className="features">{topContentElements}</div>
                <div className="features">{bottomContentElements}</div>
              </div>
              {content_image && (
                <div className="features__img">
                  <img src={content_image} width="100%" height="100%" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="slidebar">
        <div className="slide">
          <div className="scroll_2"></div>
          <div
            ref={scrollRef}
            className="scroll__thumb"
            style={{ width: `${scrollState}` }}
          ></div>
        </div>
        {Object.values(page).includes(true) ? (
          <button onClick={() => handleClose()}>
            <img
              src="/images/close.svg"
              alt="not found"
              width={40}
              height={40}
            />
          </button>
        ) : (
          <a href="/">
            <img
              src="/images/close.svg"
              alt="not found"
              width={40}
              height={40}
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default DetailSidebar;
