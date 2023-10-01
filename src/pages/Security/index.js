import * as React from "react";
import data from "../../article-data.json";

import DetailSidebar from "../../components/DetailSidebar";
import Header from "../../components/Header";
const Security = () => {
  return (
    <div>
      <Header />
      <DetailSidebar
        id={data[2].id}
        title={data[2].title}
        subtitle={data[2].description}
        title_style="security__title"
        logo={data[2].image1}
        content={data[2].content}
      />
    </div>
  );
};

export default Security;
