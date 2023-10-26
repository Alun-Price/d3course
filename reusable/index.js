import { csv, select } from "d3";
import { scatterPlot } from "./scatterPlot";

// pull in the csv data file - nice way to split it up for readability
const csvUrl = [
  "https://gist.githubusercontent.com/",
  "curran/", // User
  "a08a1080b88344b0c8a7/", // Id of gist
  "raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/", // commit
  "iris.csv", // file name
].join("");

// turn those string data values into numbers
const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;

  return d;
};

// set the width and height relative to the window
const width = window.innerWidth;
const height = window.innerHeight;

// add the svg to the window
const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const main = async () => {
  svg.call(
    scatterPlot()
      .width(width)
      .height(height)
      .data(await csv(csvUrl, parseRow))
      .xValue((d) => d.sepal_length)
      .yValue((d) => d.petal_length)
      .colorValue((d) => d.species)
      .margin({
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
      })
      .radius(5)
      .stroke("black")
  );
};
main();
