import * as React from "react";
import data from "../../article-data.json";

import DetailSidebar from "../../components/DetailSidebar";
import Header from "../../components/Header";
const TrueAutomation = () => {
  return (
    <div>
      <Header />
      <DetailSidebar
        id={data[0].id}
        title={data[0].title}
        title_style="true-automation__title"
        subtitle={data[0].description}
        logo={data[0].image1}
        content={data[0].content}
      />
    </div>
  );
};

export default TrueAutomation;
