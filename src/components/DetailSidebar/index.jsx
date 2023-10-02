import { isContentEditable } from "@testing-library/user-event/dist/utils";
import Scrollbar from "../scrollbar";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  Component,
} from "react";
import { ArticleContext } from "../../utils/context";
const DetailSidebar = ({
  id,
  title,
  title_style,
  subtitle,
  logo,
  content,
  content_image,
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [rightEdge, setRightEdge] = useState(0);
  const barRef = useRef(null);
  const componentRef = useRef(null);
  const scrollRef = useRef(null);
  const { page, setPage } = useContext(ArticleContext);

  const handleMobileScroll = () => {
    if (
      (componentRef.current.scrollLeft /
        (componentRef.current.scrollWidth - componentRef.current.clientWidth)) *
        100 <=
      2
    )
      scrollRef.current.style.width = "2%";
    else
      scrollRef.current.style.width =
        (componentRef.current.scrollLeft /
          (componentRef.current.scrollWidth -
            componentRef.current.clientWidth)) *
          100 +
        "%";
  };
  const handleTouchEnd = () => {
    const duration = 1000; // in milliseconds
    const startTime = Date.now();
    const endTime = startTime + duration;

    const trackMomentum = () => {
      const currentTime = Date.now();
      const elapsed = Math.min(currentTime - startTime, duration);

      // Call function A
      updateScrollPosition(elapsed / duration);

      if (currentTime < endTime) {
        // Continue tracking momentum
        requestAnimationFrame(trackMomentum);
      }
    };

    // Start tracking momentum
    requestAnimationFrame(trackMomentum);
  };

  const updateScrollPosition = (progress) => {
    console.log("tracking");
    scrollRef.current.style.width =
      (componentRef.current.scrollLeft /
        (componentRef.current.scrollWidth - componentRef.current.clientWidth)) *
        100 +
      "%";
  };
  useEffect(() => {
    const rect = barRef.current.getBoundingClientRect();
    rect.width <= window.innerWidth
      ? (scrollRef.current.style.width = "100%")
      : (scrollRef.current.style.width = "2%");
    setRightEdge(rect.width);
    barRef?.current?.addEventListener("touchmove", handleMobileScroll);
    barRef?.current?.addEventListener("touchend", handleTouchEnd);

    return () => {
      barRef?.current?.removeEventListener("touchmove", handleMobileScroll);
      barRef?.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [page]);

  const handleWheel = (e) => {
    if (e.deltaY <= 0) {
      {
        if (barRef.current.getBoundingClientRect().left >= 0) {
          setTranslateX(0);
          scrollRef.current.style.left = "0px";
        } else {
          const temp = translateX + 100;
          setTranslateX(temp);
          const updatePro =
            parseFloat(
              Number(scrollRef.current.style.width.replace("%", "")) -
                100 / ((rightEdge - innerWidth) / 100)
            ) + "%";
          scrollRef.current.style.width = updatePro;
        }
      }
    } else if (e.deltaY >= 0) {
      if (barRef.current.getBoundingClientRect().right <= window.innerWidth) {
      } else {
        const temp = translateX - 100;
        setTranslateX(temp);
        const updatePro =
          parseFloat(100 / ((rightEdge - innerWidth) / 100)) +
          Number(scrollRef.current.style.width.replace("%", "")) +
          "%";
        scrollRef.current.style.width = updatePro;
      }
    }
  };
  const handleClose = () => {
    document.getElementById(`${id}`).style.left = "100%";
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    setTimeout(() => {
      setTranslateX(0);
      componentRef.current.scrollLeft = 0;
    }, 1000);
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
      <div
        onWheel={handleWheel}
        ref={componentRef}
        className="detail-sidebar__content"
      >
        <div
          id="mainbar"
          className={`mainbar ${
            title == "Privacy First" && "privacy__container"
          }`}
          ref={barRef}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          <div
            className={`mainbar-content  ${
              title == "Privacy First" && "privacy__flex"
            }`}
          >
            <div
              className={`logo-content__container ${
                title == "Privacy First" && "privacy__center"
              } `}
            >
              {title && title != "Merlin" && (
                <p className={`article_text ${title_style}`}>{title}</p>
              )}
              {logo && title != "Privacy First" && (
                <img src={logo} width={"100%"} height={"auto"} />
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
              <div className="features__container">
                <div className="features">{topContentElements}</div>
                <div className="features">{bottomContentElements}</div>
              </div>
              {content_image &&
                (title == "Privacy First" ? (
                  <div className="features__img">
                    <img src={content_image} width="100%" height="130%" />
                  </div>
                ) : (
                  <div className="features__img">
                    <img src={content_image} width="100%" height="auto" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="slidebar">
        <div className="slide">
          <div ref={scrollRef} className="scroll__thumb"></div>
        </div>
        <a onClick={() => handleClose()}>
          <img src="/images/close.svg" alt="not found" width={40} height={40} />
        </a>
      </div>
    </div>
  );
};

export default DetailSidebar;
