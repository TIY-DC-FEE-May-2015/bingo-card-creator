var express = require('express');
var path = require('path');
var lessMiddleware = require('less-middleware');
var u = require("underscore")

var app = express();

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "hbs")

var createColumnNumbers = function(min, max, row) {
  var range = u.range(min, max)
  var sample = u.sample(range, 5)
  
  return u.map(sample, function(num, index) { 
    return { 
      value: num,
      row: index,
      column: row
    } 
  })
}

app.get("/card", function(req, res){
  var n = createColumnNumbers(31, 46, 2)
  n[2] = { value: "Free!", free: true, row: 2, column: 2 }

  res.render("card", {
    b: createColumnNumbers(1, 16, 0),
    i: createColumnNumbers(16, 31, 1),
    n: n,
    g: createColumnNumbers(46, 61, 3),
    o: createColumnNumbers(61, 76, 4),
  })
})


app.get("/test", function(req, res){
  res.render("card", {
    b: [
      { value: 7 }, 
      { value: 13 }, 
      { value: 5 }, 
      { value: 2 },
      { value: 12 }
    ],
    i: [
      { value: 19 }, 
      { value: 30 }, 
      { value: 26 }, 
      { value: 23 }, 
      { value: 18 }
    ],
    n: [
      { value: 35 }, 
      { value: 41 }, 
      { value: "Free!", marked: true }, 
      { value: 38 }, 
      { value: 42 }
    ],
    g: [
      { value: 49 }, 
      { value: 55 }, 
      { value: 60 }, 
      { value: 58 }, 
      { value: 57 }
    ],
    o: [
      { value: 63 }, 
      { value: 65 }, 
      { value: 62 }, 
      { value: 70 }, 
      { value: 68 }
    ]
  })
})

module.exports = app;
