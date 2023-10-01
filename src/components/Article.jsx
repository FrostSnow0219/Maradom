import React from "react";
import Css from "json-to-css";
import ArticleSingle from "./ArticleSingle";

import data from "./../article-data.json";

function Article() {
  return (
    <div className="container">
      <div className="product-grid">
        {data.map((item, index) => {
          let css = Css.of(item.article_style);
          return <ArticleSingle index={index} item={item} item_css={css} />;
        })}
      </div>
    </div>
  );
}

export default Article;
