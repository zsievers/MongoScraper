var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
    scrapeHeadlines: function(req, res) {
        return scrape()
            .then(function(articles) {
                return db.Headline.create(articles);
            })
            .then(function(dbHeadline) {
                if (dbHeadline.length === 0) {
                    res.json({
                        message: "No new articles today. Check back later!"
                    });
                }
                else {
                    res.json({
                        message: `There are ${dbHeadline.length} new articles!`
                    });
                }
            })
            .catch(function(err) {
                res.json({
                    message: "- Scraped Articles -"
                });
            });
    }
};

// creating a function called scrapeHeadlines
// using the scrape() it pulls articles from the NY TIMES
// then inserting the articles into the db
// then if the headlines equals 0, message shoots back that there are no new Articles
// else, json response tells you how many new headlines came out today
// catching any errors along the way