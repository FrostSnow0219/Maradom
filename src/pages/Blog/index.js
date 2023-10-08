import React from "react";

const data = [
  {
    url: "building-a-smart-home-from-voice-assistant-to-major-dom-v-1-0",
    bg_url: "/images/blog.svg",
    release: "Latest",
    title: "MajorDom finally finished the ladning age design",
  },
  {
    url: "inside-major-dom-v-1-0-exploring-the-architecture-of-a-new-smart-home-systemcurrent status",
    bg_url: "/images/blog.svg",
    release: "Tag",
    title: "MajorDom finally finished the ladning age design",
  },
  {
    url: "localize-ios-app-in-5-minutes",
    bg_url: "/images/blog.svg",
    release: "Tag",
    title: "MajorDom finally finished the ladning age design",
  },
  {
    url: "stark-the-voice-assistants-framework",
    bg_url: "/images/blog.svg",
    release: "Tag",
    title: "MajorDom finally finished the ladning age design",
  },
  {
    url: "current status",
    bg_url: "/images/blog.svg",
    release: "Tag",
    title: "MajorDom finally finished the ladning age design",
  },
  {
    url: "current status",
    bg_url: "/images/blog.svg",
    release: "Tag",
    title: "MajorDom finally finished the ladning age design",
  },
];

const Blog = () => {
  return (
    <div className="blog__container">
      {data.map((item) => (
        <div className="blog-item">
          <a className="blog-item__img" href={`blog/${item.url}`}>
            <img
              src={item.bg_url}
              alt=""
              width="originWidth"
              height="originHeight"
            />
          </a>
          <span className="blog-item__release">{item.release}</span>
          <div className="blog-item__title">{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
