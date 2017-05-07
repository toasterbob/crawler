var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var pageToVisit = "http://www.arstechnica.com";
console.log("Visiting page " + pageToVisit);
request(pageToVisit, function(error, response, body) {
   if(error) {
     console.log("Error: " + error);
   }
   // Check status code (200 is HTTP OK)
   console.log("Status code: " + response.statusCode);
   if(response.statusCode === 200) {
     // Parse the document body
     var $ = cheerio.load(body);
     console.log("Page title:  " + $('title').text());
    //  console.log($('body').text());
     console.log(searchForWord($, "science"));
     console.log(collectInternalLinks($));
   }
});

function searchForWord($, word) {
  var bodyText = $('html > body').text();
  if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
    return bodyText.toLowerCase().indexOf(word.toLowerCase())
  }
  return false;
}


function collectInternalLinks($) {
  var allRelativeLinks = [];
  var allAbsoluteLinks = [];
 
  var relativeLinks = $("a[href^='/']");
  relativeLinks.each(function() {
      allRelativeLinks.push($(this).attr('href'));

  });

  var absoluteLinks = $("a[href^='http']");
  absoluteLinks.each(function() {
      allAbsoluteLinks.push($(this).attr('href'));
  });

  console.log("Found " + allRelativeLinks.length + " relative links");
  console.log("Found " + allAbsoluteLinks.length + " absolute links");
}
