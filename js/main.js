// $(document).ready(function() {

// ----------------------------
// fns for use
// ----------------------------

function puts(str) {
  $('body').append(str+"<br>");
}

function collectData() {
  data = [];
    for (var i = 0; i < categories.length; i++) {
      rand = Math.floor(Math.random() * 5)
      var temp = {
        'axis': categories[i],
        'value': rand
      };
      data.push(temp);
      // puts(temp['axis']+" "+temp['value'])
    }
  return data;
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
// var color = d3.scale.ordinal()
// 	.range(["#ff40f7","#fff35b","#51ff42"]);
//
// var color1 = d3.scale.ordinal()
// 	.range(["#67ff9b","#73a2ff","#cb4dff"]);
var color = d3.scale.ordinal().range(["#e82706", "#ffb000", "#0abfe0"]);
var color1 = d3.scale.ordinal().range(["#3deb00", "#4098ff", "#fe14df"]);
var pixels = 500;
//var pattern = ["url(#horizontal-stripe-3)","#fff35b","#51ff42"];

// ----------------------------
// draw the chart
// ----------------------------

var radarChartOptions = {
  pixels: pixels,
  color: color
};
var radarChartOptions1 = {
  pixels: pixels,
  color: color1
};

$(document).ready(function() {
//Call function to draw the Radar chart
RadarChart(".c1", data0, radarChartOptions);

//Call function to draw the Radar chart
RadarChart(".c2", data2, radarChartOptions1);
});
