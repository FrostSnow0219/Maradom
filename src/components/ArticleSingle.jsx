import React, { useContext, useEffect } from "react";
import { ArticleContext } from "../utils/context";
function ArticleSingle(props) {
  const { page, setPage } = useContext(ArticleContext);

  const handleClick = () => {
    document.getElementById(`${props.item.id}`).style.left = "0";
    document.getElementById("App").style.overflow = "hidden";
    const temp = {};
    temp[props.item.id] = true;
    setPage(temp);
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  };
  // useEffect(() => {
  //   if (!page[`${props.item.id}`]) return;
  // }, [page]);
  return (
    <div id={`item-${props.index}`} className="item-child">
      <div
        className="product_item"
        style={{ backgroundImage: `url(${props.item.image})` }}
      >
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
