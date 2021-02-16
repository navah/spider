// colors.forEach(function(item, index) {
//   console.log(item, index);
// });


// ----------------------------
// data fns
// ----------------------------

function puts(str) {
  $('body').append(str + "<br>");
}

function collectData() {
  data = [];
  for (var i = 0; i < categories.length; i++) {
    rand = 1 + Math.floor(Math.random() * 4)
    var temp = {
      'axis': categories[i],
      'value': rand
    };
    data.push(temp);
    // puts(temp['axis']+" "+temp['value'])
  }
  return data;
}

function plotColors(cols) {
  colorScale = d3.scale.ordinal().range(cols);
  return colorScale;
}

// ----------------------------
// generate random data for now
// ----------------------------

var categories = [
  "acting",
  "believability of the world and characters",
  "dialogue",
  "hair + makeup",
  "wardrobe",
  "creative use of language to avoid censorship",
  "victimization of a female character",
  "font",
  "plotholes",
  "crying"
];

var data0 = [collectData(), collectData()];
var data1 = [collectData(), collectData(), collectData()];
var data2 = [collectData(), collectData(), collectData()];

// ----------------------------
// set up
// ----------------------------

var margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100
  },
  width = Math.min(500, window.innerWidth - 10) - margin.left - margin.right,
  height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
var pixels = 500;

// ----------------------------
// draw the chart
// ----------------------------

var radarChartOptions0 = {
  pixels: pixels,
  color: plotColors(["#e82706", "#ffb000", "#dce00a"])
};
var radarChartOptions1 = {
  pixels: pixels,
  color: plotColors(["#3deb00", "#4098ff", "#fe14df"])
};

var radarChartOptions2 = {
  pixels: pixels,
  color: plotColors(["#eb4d00", "#40ddff", "#a8ba14"])
};

$(document).ready(function() {
  RadarChart(".c1", data0, radarChartOptions0);

  RadarChart(".c2", data1, radarChartOptions1);

  RadarChart(".c3", data2, radarChartOptions2);
});
