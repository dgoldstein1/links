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
      <p>
        This project is a culmination of several smaller projects which came
        together slowly over the course of about a year of development in my
        free time. The main objective is to find connections and paths between
        different parts of the web which otherwise would go unoticed. <br />
        <br /> I've started with going through the English corpus of
        wikipedia.org, since it is well documented and easy to debug, and
        creating links between articles. Users can then find random articles,
        see what they're neighbors are, and find paths between two seemingly
        unreleated areas of knowledge!
      </p>
      <h1 id="Architecture">Architecture</h1>
      DIAGRAM
      <h5 id="Backend">Backend</h5>
      <p>
        The backend for this project consists of three major pieces: the
        cralwer, graph store, and indexer. The cralwer is the most memory
        intensive part. Its job is to scrape web pages, extract all relevant
        links, and POST them to the backend stores. The graph store is
        responsible for taking these links and storing them in an
        ultra-lightweight format. the indexer keeps track of IDs and names so
        that lookup is quick and searching is possible against the DB with 100M+
        nodes.
        <br />
        <br />
        After trying different massive-graph storage techniques, I settled on
        using the{" "}
        <a href="https://snap.stanford.edu/">
          Standford Network Analysis Project
        </a>{" "}
        as a base since it supports extra large datasets and provides utilities
        for further analysis on structural properties of graphs. I knew
        eventually I wanted to make available minimum spanning, centrality,
        clustering, and page rank, which is difficult to find out of the box.{" "}
        <a href="https://snap.stanford.edu/snappy/index.html">SNAP py</a> was
        originally written in C++ but ported to Python, making it fast at
        runtime but also easy to bring into a server environment, in my case
        using <a href="http://flask.palletsprojects.com/en/1.1.x/">flask</a>.
        <br />
        <br />
        The tradeoff with SNAP's light weight is that it doesn't scale well
        (everything is saved locally), and there's no extractable information on
        each node (nodes are saved only as integers). To mitigate this, I
        created a metadata DB which manages and stores these mappings. This
        server is based on{" "}
        <a href="https://blog.dgraph.io/post/badger/">Badger DB</a>, an
        lightweight, in-memory DB for Go. This takes pressure off of the graph
        store, helps with scaling, and allows for searching, getting random
        nodes, and disallowal of duplicate entries.
        <br />
        <br />
        The final piece of the puzzle came down to actually fetching information
        about these nodes when the user "selects" them in the UI. I toyed for a
        while with the idea about storing excerpts from the scraped htlm in the
        metadata DB, but this seemed duplicative since this information is
        rarely accessed and is already stored online. Instead I used wikipedia's
        fantastic{" "}
        <a href="https://en.wikipedia.org/w/api.php">
          publically acessible API
        </a>{" "}
        which supports opensearch, text snippets, and image extracts. Because
        wikipedia's corpus is extensive, this will also support future
        non-wikipedia projects such as graphing out synonyms or using different
        languages.
      </p>
      <h5 id="Frontend">Frontend</h5>
      <p>t</p>
      <h5 id="Deployment">Deployment</h5>
      <p>t</p>
      <h5 id="Metrics">Metrics</h5>
      <p>t</p>
      <h1 id="Challenges">Challenges</h1>
      <p>t</p>
      <h5 id="Money">Money</h5>
      <p>t</p>
      <h5 id="Storage">Storage</h5>
      <p>t</p>
      <h5 id="Speed">Speed</h5>
      <p>t</p>
      <h5 id="Wikipedia Refs">Wikipedia Refs</h5>
      <p>t</p>
      <h1 id="Source Code">Source Code</h1>
      <p>t</p>
      <h1 id="About Me">About Me</h1>
      <p>t</p>
      <h1 id="Contact">Contact</h1>
      <p>t</p>
      <Footer />
    </div>
  );
}

export default About;
