import React from "react";

function Navbar() {
  return (
    <div className="top-menu">
      <ul>
        <li>
          <a href="/merlin">Merlin</a>
          <img src="/images/arrow.svg" />
        </li>
        <li>
          <a href="/Archie">Archie</a>
        </li>
        <li>
          <a href="/Blog">Blog</a>
        </li>
        <li>
          <a href="/FAQ">FAQ</a>
        </li>
      </ul>
      <div className="">
        <div className="top-menu__footer">
          <div className="social">
            <a href="#" className="github"></a>
            <a href="#" className="kickstarter"></a>
            <a href="#" className="linked_in"></a>
            <a href="#" className="youtube"></a>
            <a href="#" className="instagram"></a>
            <a href="#" className="twitter"></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
