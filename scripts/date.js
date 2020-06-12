var createDate = function() {
    var d = new Date();
    var formattedDate = "";
    
    // +1 to start at 1 and not 0
    formattedDate += (d.getMonth() + 1) + "_";
    formattedDate += d.getDate() + "_";
    formattedDate += d.getFullYear();

    return formattedDate;
};

module.exports = createDate;