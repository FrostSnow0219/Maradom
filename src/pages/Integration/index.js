import * as React from "react";
import data from "../../article-data.json";

import DetailSidebar from "../../components/DetailSidebar";
import Header from "../../components/Header";
const Integration = () => {
  return (
    <div>
      <Header />
      <DetailSidebar
        id={data[6].id}
        title={data[6].title}
        subtitle={data[6].description}
        title_style="integration__title"
        logo={data[6].image1}
        content={data[6].content}
        content_image={data[6].content_image}
      />
    </div>
  );
};

export default Integration;
