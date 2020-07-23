$(document).ready(function() {

    var articleContainer = $('.article-container');

    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
    $(".clear").on("click", handleArticleClear);


    initPage = () => {
    $.get("/api/headlines?saved=false").then(function(data) {
      articleContainer.empty();

      if(data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
    }
    // handles appending HTML holding article data to the page
    // Using an array of json  containing all articles in the db
    renderArticles = (articles) => {

      var articleCards = [];

      for(var i=0; i < articles.length; i++) {
        articleCards.push(createCard(articles[i]));
      }

      articleContainer.append(articleCards);
    }

    createCard = (article) => {
  
      // This function takes in a single JSON object for an article/headline
      // It constructs a jQuery element containing all of the formatted HTML for the
      // article card
      var card = $("<div class='card'>");
      var cardHeader = $("<div class='card-header'>").append(
        $("<h3>").append(
          $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
            .attr("href", article.url)
            .text(article.headline),
          $("<a class='btn btn-success save'>Save Article</a>")
        )
      );

      var cardBody = $("<div class='card-body'>").text(article.summary);

      card.append(cardHeader, cardBody);
    // attach the article's id to the jQuery element
    // will use this when trying to figure out which article the user wants to save

    card.data("_id", article._id);
    // return the constructed card jQuery element
    return card;

  }

  renderEmpty = () => {
    // This function renders some HTML to the page explaining we don't have any articles to view
    // Using a joined array of HTML string data because it's easier to read/change than a concatenated string
    var emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
        "</div>",
        "<div class='card'>",
        "<div class='card-header text-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<div class='card-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    // Appending this data to the page
    articleContainer.append(emptyAlert);
  }


  handleArticleSave = () => {
    // This function is triggered when the user wants to save an article
    // When we rendered the article initially, we attached a javascript object containing the headline id
    // to the element using the .data method. Here we retrieve that.
    var articleToSave = $(this)
      .parents(".card")
      .data();

    // Remove card from page
    $(this)
      .parents(".card")
      .remove();

    articleToSave.saved = true;
    // Using a patch method to be semantic since this is an update to an existing record in our collection
    $.ajax({
      method: "PUT",
      url: "/api/headlines/" + articleToSave._id,
      data: articleToSave
    }).then(function(data) {
      // If the data was saved successfully
      if (data.saved) {
        // Run the initPage function again. This will reload the entire list of articles
        initPage();
      }
    });
  }

  handleArticleScrape = () => {
    // This function handles the user clicking any "scrape new article" buttons
    $.get("/api/fetch").then(function(data) {
      // If we are able to successfully scrape the NYTIMES and compare the articles to those
      // already in our collection, re render the articles on the page
      // and let the user know how many unique articles we were able to save
      initPage();
      bootbox.alert($("<h3 class='text-center m-top-80'>").text(data.message));
    });
  }

  handleArticleClear = () => {
    $.get("api/clear").then(function() {
      articleContainer.empty();
      initPage();
    });
  }
});