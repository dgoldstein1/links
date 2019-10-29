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
      <h1 id="Overview">Overview</h1>
      <p />
      <h1 id="Architecture">Architecture</h1>
      <p />
      <h5 id="Backend">Backend</h5>
      <p />
      <h5 id="Frontend">Frontend</h5>
      <p />
      <h5 id="Deployment">Deployment</h5>
      <p />
      <h5 id="Metrics">Metrics</h5>
      <p />
      <h1 id="Challenges">Challenges</h1>
      <p />
      <h5 id="Money">Money</h5>
      <p />
      <h5 id="Storage">Storage</h5>
      <p />
      <h5 id="Speed">Speed</h5>
      <p />
      <h5 id="Wikipedia Refs">Wikipedia Refs</h5>
      <p />
      <h1 id="Source Code">Source Code</h1>
      <p />
      <h1 id="About Me">About Me</h1>
      <p />
      <h1 id="Contact">Contact</h1>
      <p />
      <Footer />
    </div>
  );
}

export default About;
