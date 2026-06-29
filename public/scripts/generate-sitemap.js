import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";

const hostname = "https://www.desire7clothing.com";

const sitemap = new SitemapStream({
  hostname,
});

const today = new Date().toISOString();

const pages = [
  {
    url: "/",
    priority: 1.0,
    changefreq: "daily",
  },
  {
    url: "/shop",
    priority: 0.95,
    changefreq: "daily",
  },
  {
    url: "/about",
    priority: 0.6,
    changefreq: "monthly",
  },
  {
    url: "/contact",
    priority: 0.6,
    changefreq: "monthly",
  },
  {
    url: "/privacy-policy",
    priority: 0.3,
    changefreq: "yearly",
  },
  {
    url: "/terms",
    priority: 0.3,
    changefreq: "yearly",
  },
];

pages.forEach((page) => {
  sitemap.write({
    url: page.url,
    changefreq: page.changefreq,
    priority: page.priority,
    lastmod: today,
  });
});

sitemap.end();

streamToPromise(sitemap)
  .then((data) => {
    fs.writeFileSync("./public/sitemap.xml", data.toString());
    console.log("✅ sitemap.xml generated successfully");
  })
  .catch((err) => {
    console.error(err);
  });