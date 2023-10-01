import * as React from "react";
import data from "../../article-data.json";

import DetailSidebar from "../../components/DetailSidebar";
import Header from "../../components/Header";
const Merlin = () => {
  return (
    <div>
      <Header />
      <DetailSidebar
        id={data[5].id}
        title={data[5].title}
        title_style="merlin"
        subtitle={data[5].description}
        logo={data[5].image1}
        content={data[5].content}
      />
    </div>
  );
};

export default Merlin;
