import { scaleLinear, extent, axisLeft, axisBottom, max } from "d3";

export const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let colorValue;
  let margin;
  let radius;
  let stroke;

  const my = (selection) => {
    const x = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      // range starts at min value
      //.domain(extent(data, yValue))
      // start axes at zero
      .domain([0, max(data, yValue)])
      .range([height - margin.bottom, margin.top]);

    // create some 0:(x, y) data
    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      fillColor: `${
        colorValue(d) == "setosa"
          ? "#cc41ff"
          : colorValue(d) == "versicolor"
          ? "#05bbaa"
          : "#eb5951"
      }`,
      title: `(${xValue(d)}, ${yValue(d)})`,
    }));

    // console.log(marks);

    // draw the graph - join circles to the data
    const circles = selection
      .selectAll("circle")
      .data(marks)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", radius)
      .attr("fill", (d) => d.fillColor)
      .attr("stroke", stroke)
      .append("title")
      .text((d) => d.title);

    // set the x and y axes
    selection
      .selectAll(".y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(axisLeft(y));

    selection
      .selectAll(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(axisBottom(x));
  };

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width;
  };

  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height;
  };

  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };

  my.xValue = function (_) {
    return arguments.length ? ((xValue = _), my) : xValue;
  };

  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue;
  };

  my.colorValue = function (_) {
    return arguments.length ? ((colorValue = _), my) : colorValue;
  };

  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };

  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius;
  };

  my.stroke = function (_) {
    return arguments.length ? ((stroke = _), my) : stroke;
  };

  return my;
};
