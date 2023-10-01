import { useState, useEffect, useContext } from "react";
import TopBanner from "../components/TopBanner";
import MainSlider from "../components/MainSlider";
import Article from "../components/Article";

import { Fragment } from "react";
import TrueAutomation from "./TrueAutomation";
import Privacy from "./Privacy";
import Merlin from "./Merlin";
import Integration from "./Integration";
import Archie from "./Archie";
import AutoEcosystem from "./AutoEcosystem";
import Security from "./Security";
import OpenSource from "./OpenSource";

import { ArticleContext } from "../utils/context";
function Home() {
  const { page, setPage } = useContext(ArticleContext);
  return (
    <div>
      <div>
        <TopBanner />
        <MainSlider />
        <Article />
      </div>
      <div className="detail-sidebar">
        <div
          id="true-automation"
          className=""
          style={{
            position: "fixed",
            left: "100%",
            top: 0,
            transitionDuration: "1s",
          }}
        >
          <TrueAutomation />
        </div>
        <div
          id="privacy"
          style={{
            position: "fixed",
            left: "100%",
            top: 0,
            transitionDuration: "1s",
          }}
        >
          <Privacy />
        </div>
        <div
          id="merlin"
          style={{
            position: "fixed",
            left: "100%",
            top: 0,
            transitionDuration: "1s",
          }}
        >
          <Merlin />
        </div>
        <div
          id="integration"
          style={{
            position: "fixed",
            left: "100%",
            top: 0,
            transitionDuration: "1s",
          }}
        >
          <Integration />
        </div>
        <div
          id="autonomous-ecosystem"
          style={{
            position: "fixed",
            left: "100%",
            top: 0,
            transitionDuration: "1s",
          }}
        >
          <AutoEcosystem />
        </div>
        <div
          id="security"
          style={{
            position: "fixed",
            left: "100%",
            top: 0,
            transitionDuration: "1s",
          }}
        >
          <Security />
        </div>
        <div
          id="archie"
          style={{
            position: "fixed",
            left: "100%",
            top: 0,
            transitionDuration: "1s",
          }}
        >
          <Archie />
        </div>
        <div
          id="open-source"
          style={{
            position: "fixed",
            left: "100%",
            top: 0,
            transitionDuration: "1s",
          }}
        >
          <OpenSource />
        </div>
      </div>
    </div>
  );
}
export default Home;
