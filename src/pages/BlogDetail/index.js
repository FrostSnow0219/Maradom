import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import path from "path";
// import fs from "fs/promises";
import { MDXProvider } from "@mdx-js/react";
// import { mdx } from "@mdx-js/mdx";
// import crack from "../../blog/stark-the-voice-assistants-framework.mdx";
const BlogDetail = () => {
  const { id } = useParams();
  console.log(id);
  const components = {
    h1: (props) => <h1 style={{ color: "red" }} {...props} />,
  };
  let MDXContent;
  useEffect(() => {
    MDXContent = React.lazy(() => import(`../..//blog/${id.id}.mdx`));
    console.log("content", MDXContent);
  }, []);
  return (
    <MDXProvider components={components}>
      <MDXContent />
    </MDXProvider>
  );
};
export default BlogDetail;
