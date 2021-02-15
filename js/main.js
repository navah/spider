// $(document).ready(function() {



  /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */







  ////////////////////////// Data //////////////////////////////

  var categories = ["acting",
  "believability of the world and characters",
  "dialogue",
  "hair + makeup",
  "wardrobe",
  "creative use of language to avoid censorship",
  "victimization of a female character",
  "font",
  "plotholes",
  "crying"
  ]

  var data1 = [

  		[//color-1
  		{axis:categories[0],value:3},
  		{axis:categories[1],value:2},
  		{axis:categories[2],value:1},
  		{axis:categories[3],value:1},
  		{axis:categories[4],value:2.5},
  		{axis:categories[5],value:4.5},
  		{axis:categories[6],value:5},
  		{axis:categories[7],value:3},
  		{axis:categories[8],value:2.5},
  		{axis:categories[9],value:3},
  		],

  		[//color-1
  		{axis:categories[0],value:5},
  		{axis:categories[1],value:2.5},
  		{axis:categories[2],value:1.5},
  		{axis:categories[3],value:5},
  		{axis:categories[4],value:3.5},
  		{axis:categories[5],value:1.5},
  		{axis:categories[6],value:1.5},
  		{axis:categories[7],value:3},
  		{axis:categories[8],value:2.5},
  		{axis:categories[9],value:3},
  		],

  		[//color-1
  		{axis:categories[0],value:1},
  		{axis:categories[1],value:2.5},
  		{axis:categories[2],value:1},
  		{axis:categories[3],value:4},
  		{axis:categories[4],value:3.5},
  		{axis:categories[5],value:2},
  		{axis:categories[6],value:3},
  		{axis:categories[7],value:3},
  		{axis:categories[8],value:2.5},
  		{axis:categories[9],value:3},
  		]

  		];


  	var data2 = [

  			[//color-1
  			{axis:categories[0],value:1},
  			{axis:categories[1],value:2},
  			{axis:categories[2],value:4},
  			{axis:categories[3],value:2},
  			{axis:categories[4],value:2},
  			{axis:categories[5],value:2.5},
  			{axis:categories[6],value:5},
  			],

  			[//color-1
  			{axis:categories[0],value:5},
  			{axis:categories[1],value:4.5},
  			{axis:categories[2],value:5},
  			{axis:categories[3],value:4},
  			{axis:categories[4],value:3},
  			{axis:categories[5],value:3.5},
  			{axis:categories[6],value:1},
  			],

  			[//color-1
  			{axis:categories[0],value:5},
  			{axis:categories[1],value:2.5},
  			{axis:categories[2],value:4},
  			{axis:categories[3],value:2},
  			{axis:categories[4],value:1.5},
  			{axis:categories[5],value:1},
  			{axis:categories[6],value:1},
  			]

  			];






  //////////////////////// Set-Up //////////////////////////////

  var margin = {top: 100, right: 100, bottom: 100, left: 100},
  	width = Math.min(500, window.innerWidth - 10) - margin.left - margin.right,
  	height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

  // var color = d3.scale.ordinal()
  // 	.range(["#ff40f7","#fff35b","#51ff42"]);
  //
  // var color1 = d3.scale.ordinal()
  // 	.range(["#67ff9b","#73a2ff","#cb4dff"]);

  var color = d3.scale.ordinal()
  	.range(["#e82706","#ffb000","#0abfe0"]);

  var color1 = d3.scale.ordinal()
  	.range(["#3deb00","#4098ff","#fe14df"]);

  var pixels = 500;


  //var pattern = ["url(#horizontal-stripe-3)","#fff35b","#51ff42"];

  //////////////////// Draw the Chart //////////////////////////

  var radarChartOptions = {
    pixels: pixels,
    color: color
  };



  var radarChartOptions1 = {
    pixels: pixels,
    color: color1
  };






  // });