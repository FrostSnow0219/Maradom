import * as React from "react";
import data from "../../article-data.json";

import DetailSidebar from "../../components/DetailSidebar";
import Header from "../../components/Header";
const OpenSource = () => {
  return (
    <div>
      <Header />
      <DetailSidebar
        id={data[7].id}
        title={data[7].title}
        subtitle={data[7].description}
        title_style="opensource__title"
        logo={data[7].image1}
        content={data[7].content}
        content_image={data[7].content_image}
      />
    </div>
  );
};

export default OpenSource;
