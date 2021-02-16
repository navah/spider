function RadarChart(id, data, options) {

  var lineColor = "#999";
  var textColor = "#333"

  // ----------------------------
  // circle params
  // ----------------------------

  var cfg = {

    // circle width
    w: Math.min(pixels, window.innerWidth - 10) - margin.left - margin.right,
    // circle height
    h: Math.min(width, window.innerHeight - margin.top - margin.bottom - 20),
    // the margins of the SVG
    margin: {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100
    },
    levels: 5, // levels / concentric circles
    maxValue: 5, // outer circle value
    labelFactor: 1.35, // outer circle lable position
    wrapWidth: 100, // label text wrap (px)
    opacityArea: 0.15, // blob opacity
    dotRadius: 3, // value point rad (px?)
    opacityCircles: 0.0, // concentric circle opacity
    strokeWidth: 2, // blob stroke width (px)
    roundStrokes: true, // interpolate round? (cardinal-closed)
    color: d3
      .scale
      .category10(), // basic color fn (?)
    circleColor: lineColor, // circle grid line color
    spokeColor: lineColor, // circle grid spoke color
    circleWeight: 2.25, // not in use (?)
    spokeWeight: 1.25, // spoke line weight
    hoverOpacity: 0.6
    //nav: patterns

  };


  // ----------------------------
  // handle input args
  // ----------------------------

  // use options arg from RadarChart(id, data, options)
  if ('undefined' !== typeof options) {
    for (var i in options) {
      if ('undefined' !== typeof options[i]) {
        cfg[i] = options[i];
      }
    }
  }

  // max(maxValue_optin, actual_max_data_point)
  var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i) {
    return d3.max(i.map(function(o) {
      return o.value;
    }))
  }));

  // make sure there is one point/spoke per data point (category)
  var allAxis = (data[0].map(function(i, j) {
      return i.axis
    })),
    total = allAxis.length, // number of spokes
    radius = Math.min(cfg.w / 2, cfg.h / 2), // radius of outermost circle
    Format = d3.format(''), // previously was '%' formatting for labels
    angleSlice = Math.PI * 2 / total; // angle between spokes (radians)

  var rScale = d3
    .scale
    .linear()
    .range([0, radius])
    .domain([0, maxValue]);


  // ----------------------------
  // create container, SVG and g
  // ----------------------------

  // remove chart if id exists
  d3
    .select(id)
    .select("svg")
    .remove();

  // init svg
  var svg = d3
    .select(id)
    .append("svg")
    // .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
    // .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
    .attr("viewBox", `0 0 ${pixels} ${pixels}`)
    .attr("class", "radar" + id);

  // add group "g" and center it
  var g = svg
    .append("g")
    .attr("transform", "translate(" + (
    cfg.w / 2 + cfg.margin.left) + "," + (
    cfg.h / 2 + cfg.margin.top) + ")");


  // ----------------------------
  // glow filter (if needed)
  // ----------------------------

  var filter = g
      .append('defs')
      .append('filter')
      .attr('id', 'glow'),
    feGaussianBlur = filter
      .append('feGaussianBlur')
      .attr('stdDeviation', '2.5')
      .attr('result', 'coloredBlur'),
    feMerge = filter.append('feMerge'),
    feMergeNode_1 = feMerge
      .append('feMergeNode')
      .attr('in', 'coloredBlur'),
    feMergeNode_2 = feMerge
      .append('feMergeNode')
      .attr('in', 'SourceGraphic');

  // ----------------------------
  // concentric circles (grid levels)
  // ----------------------------

  // wrap circle grid and axes
  var axisGrid = g
    .append("g")
    .attr("class", "axisWrapper");

  // draw background cicles
  axisGrid
    .selectAll(".levels")
    .data(d3.range(1, (cfg.levels + 1)).reverse())
    .enter()
    .append("circle")
    .attr("class", "gridCircle")
    .attr("r", function(d, i) {
      return radius / cfg.levels * d;
    })
    .style("stroke", cfg.circleColor)
    .style("fill-opacity", cfg.opacityCircles)
    .style("filter", "none");
  // .style("filter" , "url(#glow)");

  // label concentric cirles (levels)
  axisGrid
    .selectAll(".axisLabel")
    .data(d3.range(1, (cfg.levels + 1)).reverse())
    .enter()
    .append("text")
    .attr("class", "axisLabel")
    .attr("x", 4)
    .attr("y", function(d) {
      return -d * radius / cfg.levels;
    })
    .attr("dy", "-0.2em")
    .style("font-size", "14px")
    .attr("fill", textColor)
    .text(function(d, i) {
      return Format(maxValue * d / cfg.levels);
    });


  // ----------------------------
  // radial axes (spokes)
  // ----------------------------

  // create spokes
  var axis = axisGrid
    .selectAll(".axis")
    .data(allAxis)
    .enter()
    .append("g")
    .attr("class", "axis");

  // spoke properties
  axis
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", function(d, i) {
      return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("y2", function(d, i) {
      return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .attr("class", "line")
    .style("stroke", cfg.spokeColor)
    .style("stroke-width", cfg.spokeWeight);

  // spoke labels
  axis
    .append("text")
    .attr("class", "legend")
      .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("x", function(d, i) {
      return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("y", function(d, i) {
      return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .text(function(d) {
      return d
    })
    .call(wrap, cfg.wrapWidth);


  // ----------------------------
  // draw blobs
  // ----------------------------

  // blob lines
  var radarLine = d3
    .svg
    .line
    .radial()
    .interpolate("linear-closed")
    .radius(function(d) {
      return rScale(d.value);
    })
    .angle(function(d, i) {
      return i * angleSlice;
    });
  if (cfg.roundStrokes) {
    radarLine.interpolate("cardinal-closed");
  }

  // wrapper for all data blobs
  var blobWrapper = g
    .selectAll(".radarWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarWrapper");

  // blob wrapper properties
  blobWrapper
    .append("path")
    .attr("class", "radarArea")
    .attr("d", function(d, i) {
      return radarLine(d);
    })
    .style("fill", function(d, i) {
      return cfg.color(i);
    })
    .style("fill-opacity", cfg.opacityArea)
    .on('mouseover', function(d, i) {
      //Dim all blobs (don't if commented)
      // d3
      //   .selectAll(".radarArea")
      //   .transition()
      //   .duration(200)
      //   .style("fill-opacity", 0.1);
      //Bring back the hovered over blob
      d3
        .select(this)
        .transition()
        .duration(200)
        .style("fill-opacity", cfg.hoverOpacity);
    })
    .on('mouseout', function() {
      // mouseout blob
      d3
        .selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", cfg.opacityArea);
    });

  // blob outlines
  blobWrapper
    .append("path")
    .attr("class", "radarStroke")
    .attr("d", function(d, i) {
      return radarLine(d);
    })
    .style("stroke-width", cfg.strokeWidth + "px")
    .style("stroke", function(d, i) {
      return cfg.color(i);
    })
    .style("fill", "none");
  // .style("filter" , "url(#glow)");

  // point dots
  blobWrapper
    .selectAll(".radarCircle")
    .data(function(d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarCircle")
    .attr("r", cfg.dotRadius)
    .attr("cx", function(d, i) {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("cy", function(d, i) {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style("fill", function(d, i, j) {
      return cfg.color(j);
    })
    .style("fill-opacity", 0.8);


  // ----------------------------
  // invisible points for tooltips
  // ----------------------------

  // wrap invisible tooltip circles
  var blobCircleWrapper = g
    .selectAll(".radarCircleWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarCircleWrapper");

  // invisible tooltip circles
  blobCircleWrapper
    .selectAll(".radarInvisibleCircle")
    .data(function(d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarInvisibleCircle")
    .attr("r", cfg.dotRadius * 1.5)
    .attr("cx", function(d, i) {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("cy", function(d, i) {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", function(d, i) {
      newX = parseFloat(d3.select(this).attr('cx')) - 10;
      newY = parseFloat(d3.select(this).attr('cy')) - 10;

      // tooltip
      tooltip
        .attr("class", "tooltip-box")
        .style('left', (d3.event.pageX + 15) + "px")
        .style('top', (d3.event.pageY + 15) + "px")
        // .style("background", cfg.color(i))
        // .style("background", d.color)
        .text(Format(d.value))
        .transition()
        .duration(200)
        .style('opacity', 1);
    })
    .on("mouseout", function() {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0);
    });

// TODO: finish matching tooltip-box to color
    var tooltip = d3
      .selectAll(id)
      .append("div")
      .attr("class", "tooltip-box")
      .style("background", 'red')
      .style("opacity", 0.0);

  // var tooltip = d3
  //   .selectAll(id)
  //   .append("div")
  //   .attr("class", "tooltip-box")
  //   .style("background", cfg.color(i))
  //   // .style("background", function(d, i, j) {
  //   //   return cfg.color(j);
  //   // })
  //   .style("opacity", 0.0);


  // ----------------------------
  // helper functions
  // ----------------------------

  //Taken from http://bl.ocks.org/mbostock/7555321

  // wrap SVG text, called for spoke labels!
  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
        words = text
          .text()
          .split(/\s+/)
          .reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  }


}
