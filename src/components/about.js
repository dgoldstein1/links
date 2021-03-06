import React from "react";
import Footer from "./footer";
import "../css/MainView.css";
import architectureImage from "../images/architecture.png";
import hikingPhoto from "../images/hiking.jpg";

function About(p) {
  return (
    <div className="about-and-settings">
      <nav>
        <a href="#Overview">Overview</a>
        <a href="#Architecture">Architecture</a>
        <a href="#Source Code" className="sublink-1">
          Source Code
        </a>
        <a href="#Backend" className="sublink-1">
          Backend
        </a>
        <a href="#Frontend" className="sublink-1">
          Frontend
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
        <a href="#Wikipedia Refs / Redirects" className="sublink-1">
          Wikipedia Refs / Redirects
        </a>
        <a href="#About Me">About Me</a>
        <a href="#Contact">Contact</a>
      </nav>
      <h1 id="Overview">Overview</h1>
      <p>
        A flexible and interactive framework to find connections and paths
        between different parts of the web which otherwise would go unoticed.{" "}
        <br />
        <br /> I've started with going through the English corpus of
        wikipedia.org, since it is well documented and easy to debug, and
        creating links between articles. Users can then find random articles,
        see what they're neighbors are, and find paths between two seemingly
        unreleated areas of knowledge!
      </p>
      <h1 id="Architecture">Architecture</h1>
      <img alt="architecture" src={architectureImage} />
      <h5 id="Source Code">Source Code</h5>
      <ul>
        <li>
          <a href="https://github.com/dgoldstein1/crawler">Cralwer</a>
        </li>
        <li>
          <a href="https://github.com/dgoldstein1/twoWayKeyValue">
            Two Way KV Store
          </a>
        </li>
        <li>
          <a href="https://github.com/dgoldstein1/graphApi">
            Big Data Graph Store
          </a>
        </li>
        <li>
          <a href="https://github.com/dgoldstein1/links">Links UI</a>
        </li>
        <li>
          <a href="https://github.com/dgoldstein1/websiteAnalytics-frontend">
            Traffic Monitoring UI
          </a>
        </li>
        <li>
          <a href="https://github.com/dgoldstein1/websiteAnalytics-backend">
            Traffic Monitoring Backend
          </a>
        </li>
      </ul>
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
      <p>
        The UI is a React app, with the graph powered by{" "}
        <a href="http://sigmajs.org/">sigmajs</a>. There isn't much to the UI
        since I believe in creating a intentional and clean backend to keep the
        frontend simple. Once compiled, the static assetts are served up by an
        nginx container.
      </p>
      <h5 id="Metrics">Metrics</h5>
      <p>
        Keeping system-wide metrics have been really useful for both debugging
        and also predicting issues before they occurr. Every service in the
        system reports <a href="https://prometheus.io/">prometheus</a> metrics.
        These are collected and reported to a{" "}
        <a href="/admin/grafana"> running grafana dashboard </a>. Please feel
        free to look, the username:password is "admin:admin" for now.
        <br />
        <br />
        I've also wanted to keep track of information on visitors coming to this
        site. Google Analytics seemed complicated and looked like it cost money,
        so I created my own{" "}
        <a href="https://github.com/dgoldstein1/websiteAnalytics-backend">
          website analytics api
        </a>{" "}
        and{" "}
        <a href="https://github.com/dgoldstein1/websiteAnalytics-frontend">
          {" "}
          analytics UI
        </a>{" "}
        which is open source and free, as long as you can create a mongo
        connection. You can see the visits to this website by going to{" "}
        <a href="/traffic"> the UI at this link</a>
      </p>
      <h1 id="Challenges">Challenges</h1>
      <h5 id="Money">Money</h5>
      <p>
        From the beginning, I knew I didn't want to deploy a side project on an
        expensive infrastructure. From the beginning, I knew AWS, Openshift, or
        a sophisticated mesh infrastructure were out of the question. After
        doing some research on the web, I settled on using a cloud platform and
        GKE as my provider. I found that gke gives $300 in free credits and that
        I could run everything in my cluster on very lean machines except the
        crawler.
        <br />
        <br />
        So I set a budget of ~$5 a month to run most of my cluster on GKE and
        worked out a solution to run the web crawlers on a few Rasberry Pis I
        have in my apartment. This saves $10-15 / month since web crawling
        requires an upper tier of pod resources (usually 4cpus) and the crawler
        needs to be run around the clock for the first 1-2 weeks of deployment.
      </p>
      <h5 id="Storage">Storage</h5>
      <p>
        Another issue I encountered from the beginning is storage. Wikipedia has
        around 6 million articles. Each article is about 4 degrees of separation
        from any other, meaning the graph is very connected. Doing some early
        research, I found that each article has between 10-1000 links to
        articles, meaning O(n) could be 6 billion edges.
      </p>
      <h5 id="Speed">Speed</h5>
      <p>
        Speed is always a question when making a crawling-based app. For
        scraping wikipedia, I set out to scrape all articles in about two weeks.
        For 6 million articles, that's about 5 links scraped per second which is
        slow enough to not bother the wikipedia servers but fast enough to keep
        a move on, especially if more than one crawler is running.
        <br />
        <br />A second consideration with speed is db lookups. To combat this,
        I've structured all the data so that all queries run in O(n) time, and
        most-- node, edge, and searching-- are actually O(1). The downside to
        this is that the data is ridged. Everything is stored by an integer node
        Id in a key:value format, which makes it hard to scale out new metadata
        or make system-wide updates. To do this, I would create a metadata store
        based on something like postgres or mongodb. However, this would cost
        money to scale to 6 million entries * size(metadata) and would take some
        engineering time. Thankfully I've been able to rely on being able to
        fetch all the metadata I need on the front-end at runtime.
      </p>
      <h5 id="Wikipedia Refs / Redirects">Wikipedia Refs / Redirects</h5>
      <p>
        This is the newest and trickiest challenge I've faced, and I haven't
        fully solved it. It occurrs when a link redirects to another URL, such
        as "/wiki/american_presidents" redirecting automatically to
        "/wiki/list_of_american_presidents". This is an issue because a) I'm
        adding a node which doesn't actually exist as a page
        "/wiki/american_presidents" and b) I'm missing all the links which
        should be attributed to "/wiki/list_of_american_presidents".
        <br />
        <br />
        Wikipedia and others have solved this issue by creating a big metadatadb
        (sql in wikipedia's case), which keeps track of these links. This would
        be a big hassle to do, and also very site-specific, whereas the
        intention for links is to create a more dynamic crawler. Another option
        for this stack would be to follow each link to see if there's a
        redirect. This is an issue, however, because it would mean following
        each and every link, which cases a 10-100x performance decrease in
        crawling and also looks like I'm spamming a website. I haven't fixed
        this yet-- any recommendations would be welcome!!
      </p>
      <h1 id="About Me">About Me</h1>
      <p>
        Originally from Sharon, Massachusetts, I graduated Macalester College in
        Saint Paul, Minnesota and now live happily with my wife in
        Charlottesville, VA. In my spare time I enjoy hiking in Shenandoah
        National Park, running, biking, and on rainy days, playing piano by the
        window, solving math problems, or curling up with a good book.
      </p>
      <img
        alt="hiking-in-corfu"
        src={hikingPhoto}
        style={{ maxHeight: "500px" }}
      />
      <h1 id="Contact">Contact</h1>
      <p>
        <a href="mailto:dgoldstein01@gmail.com">Email</a> --{" "}
        <a href="https://github.com/dgoldstein1">Github</a>
      </p>
      <Footer />
    </div>
  );
}

export default About;
