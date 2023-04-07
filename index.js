// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.get("/api", (req, res) => {
  const date = new Date(Date.now());
  res.json({"unix": date.getTime(), "utc": convertDay(date.getDay()) + ", " + date.getDate() + " " + convertMonth(date.getMonth()) + " " + date.getFullYear() + " " + date.getUTCHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0') + " GMT"});
})
app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  let dateObj;
  if(date.includes("-")) dateObj = new Date(date);
  else dateObj = new Date(+date);
  if(isNaN(dateObj.getTime())){
    res.json({"error": "Invalid Date"})
  }

  res.json({"unix": dateObj.getTime(), "utc": convertDay(dateObj.getDay()) + ", " + dateObj.getDate() + " " + convertMonth(dateObj.getMonth()) + " " + dateObj.getFullYear() + " " + dateObj.getUTCHours().toString().padStart(2, '0') + ":" + dateObj.getMinutes().toString().padStart(2, '0') + ":" + dateObj.getSeconds().toString().padStart(2, '0') + " GMT"});

});
function convertDay(day){
  if(day === 1) return "Mon";
  if(day === 2) return "Tue";
  if(day === 3) return "Wed";
  if(day === 4) return "Thu";
  if(day === 5) return "Fri";
  if(day === 6) return "Sat";
  return "Sun"
}
function convertMonth(month){
  if(month === 0) return "Jan";
  if(month === 1) return "Feb";
  if(month === 2) return "Mar";
  if(month === 3) return "Apr";
  if(month === 4) return "May";
  if(month === 5) return "Jun";
  if(month === 6) return "Jul";
  if(month === 7) return "Aug";
  if(month === 8) return "Sep";
  if(month === 9) return "Oct";
  if(month === 10) return "Nov";
  return "Dec"
}
