var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("http:/www.nytimes.com", function (error, res, body) {
        var $ = cheerio.load(body);

        var articles = [];

        $(".theme-summary").each(function (i, element) {
            var heading = $(this).children(".story-heading").text().trim();
            var summary = $(this).children(".summary").text().trim();

            // if able to be scraped
            if (heading && summary) {
                
                // regex to clean up heading & summary
                var cleanHeading = heading.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var cleanSummary  = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        
                var addDate = {
                    headline: cleanHeading,
                    summary: cleanSummary
                };
                
                articles.push(addDate);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;