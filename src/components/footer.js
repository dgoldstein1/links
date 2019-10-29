import React from "react";
import "../css/Splash.css";

function Footer(p) {
  return (
    <footer className="App-footer">
      © 2019 David Goldstein |{" "}
      <a href="http://davidcharlesgoldstein.com?ref=links-ui">
        Personal Website
      </a>{" "}
      | <a href="/LICENSE">License</a> | <a href="/VERSION">Version</a>
    </footer>
  );
}

export default Footer;
