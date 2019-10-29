import React from "react";
import Footer from "./footer";

function About(p) {
  return (
    <div>
      <nav>
        <a href="#Overview">Overview</a>
        <a href="#Architecture">Architecture</a>
        <a href="#Backend" className="sublink-1">
          Backend
        </a>
        <a href="#Frontend" className="sublink-1">
          Frontend
        </a>
        <a href="#Deployment" className="sublink-1">
          Deployment
        </a>
        <a href="#Metrics" className="sublink-1">
          Metrics
        </a>
        <a href="#Overview">Challenges</a>
        <a href="#Money" className="sublink-1">
          Money
        </a>
        <a href="#Storage" className="sublink-1">
          Storage
        </a>
        <a href="#Speed" className="sublink-1">
          Speed
        </a>
        <a href="#Wikipedia Refs" className="sublink-1">
          Wikipedia Refs
        </a>
        <a href="#Source Code">Source Code</a>
        <a href="#About Me">About Me</a>
        <a href="#Contact">Contact</a>
      </nav>
      <Footer />
    </div>
  );
}

export default About;
