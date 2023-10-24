import { select, range } from "d3";
import { makeData } from "./makeData";
import { vizData } from "./vizData";

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

let t = 0;
setInterval(() => {
  const n = 10 + Math.sin(t) * 5;
  const data = makeData(n, t);
  svg.call(vizData, data);

  t = t + 0.01;
}, 1000 / 60);
