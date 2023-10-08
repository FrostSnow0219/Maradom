import React, { useContext, useEffect } from "react";
import { ArticleContext } from "../utils/context";
import { BodyScrollContext } from "../utils/context";
import { BodyPosContext } from "../utils/context";
function ArticleSingle(props) {
  const { page, setPage } = useContext(ArticleContext);
  const { bodyScroll, setBodyScroll } = useContext(BodyScrollContext);
  const { bodyPos, setBodyPos } = useContext(BodyPosContext);
  const handleClick = () => {
    document.getElementById(`${props.item.id}`).style.left = "0";
    const temp = {};
    temp[props.item.id] = true;
    setPage(temp);
    setBodyScroll(!bodyScroll);
    setBodyPos(window.scrollY);
    document.body.style.overflow = bodyScroll ? "initial" : "hidden";
    document.body.style.touchAction = "none";
    document.getElementById("land-header").style.borderBottom =
      "1px solid #999";
    setTimeout(() => {
      document.body.style.position = "fixed";
    }, 250);
    // document.getElementsByTagName("html")[0].style.overflow = bodyScroll
    //   ? "initial"
    //   : "hidden";
  };
  // useEffect(() => {
  //   if (!page[`${props.item.id}`]) return;
  // }, [page]);
  return (
    <div id={`item-${props.index}`} className="item-child">
      <div className="product_item">
        <div className="product_img">
          <img
            src={props.item.image}
            width="originWidth"
            height="originHeight"
          />
        </div>
        <span className="article_title">{props.item.title}</span>
        <span className="article_subtitle">{props.item.subtitle}</span>
        <div className="product_item-detail">
          <a
            className="product_item-arrow item-arrow"
            onClick={() => handleClick()}
          ></a>
        </div>
      </div>
      <style>{props.item_css}</style>
    </div>
  );
}

export default ArticleSingle;

/* <div className="product_bg">
          <img src={props.item.image} alt="" width="100%" height="auto" />
        </div> */
