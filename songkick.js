$(document).ready(function() {

    let artistID = "";
    let pagesIncrement = "";
    let increment = 0;
    let apiKey = "WUuzx3ptS12OHmPR";
    let queryURL1 = "";
    let queryURL2 = "";
    let queryURL3 = "";

    $(".artist-input").on("keyup", function (event) {
        if (event.keyCode === 13) {
            $("#search-btn").click();
        }
    })

    //artist search api
    $("#search-btn").on("click", function() {

        clearResults();

        let artistName = $(".artist-input").val().trim();
        queryURL1 = "https://api.songkick.com/api/3.0/search/artists.json?apikey="
        + apiKey
        + "&query=" + artistName;

        $("#artist-name").text(artistName);

        $.ajax({
            url : queryURL1,
            method : "GET"
        }).then(function(response) {
            artistID = response.resultsPage.results.artist[0].id;

            //query URLs
            queryURL2 = "https://api.songkick.com/api/3.0/artists/"
                + artistID
                + "/gigography.json?apikey=" + apiKey
                + pagesIncrement
                + "&order=desc";
            queryURL3 = "https://api.songkick.com/api/3.0/artists/"
                + artistID
                + "/calendar.json?apikey=" + apiKey;

            artistGigography(artistID);
            upcomingShows(artistID);
        })
    })

    //gig history & upcoming shows api's
    function artistGigography() {

        $.ajax({
            url : queryURL2,
            method : "GET"
        }).then(function(response) {

            let totalResults = response.resultsPage.results.event.length;

            let gigs = response.resultsPage.results.event;

            for (var i = 0; i < gigs.length; i++) {
                let gigsBox = $("#gig-history");
                let date = moment(gigs[i].start.date).format("dddd, MMMM Do YYYY");
                let venue = gigs[i].venue.displayName;
                let city = gigs[i].location.city;

                let gig = $("<div>").addClass("border mb-3 p-3 gig" + i)
                let dateBox = $("<h4>").addClass("date").text(date);
                let venueBox = $("<h4>").addClass("event").text(venue);
                let cityBox = $("<h4>").addClass("event").text(city);

                gig.append(dateBox);
                gig.append(venueBox);
                gig.append(cityBox);

                gigsBox.append(gig);
            }

            //increment page results
            if (totalResults === 50) {
                increment++
                pagesIncrement = "&page=" + increment;

                queryURL2 = "https://api.songkick.com/api/3.0/artists/"
                + artistID
                + "/gigography.json?apikey=" + apiKey
                + pagesIncrement
                + "&order=desc";

                artistGigography();
            } else return;

        }).catch()

    }

    function upcomingShows() {

        $.ajax({
            url : queryURL3,
            method : "GET"
        }).then(function(response) {
    
            let gigs = response.resultsPage.results.event;
            let gigsTotal = response.resultsPage.totalEntries;

            if (gigsTotal === 0) {
                let gigsBox = $("#upcoming-shows");
                let noGigsBox = $("<h4>").addClass("noGigs").text("None...");
                noGigsBox.addClass("text-center")
                gigsBox.append(noGigsBox);
                gigsBox.append("<br>");
            } else {
    
            for (var i = 0; i < gigs.length; i++) {
                    let gigsBox = $("#upcoming-shows");
                    let date = moment(gigs[i].start.date).format("dddd, MMMM Do YYYY");
                    let venue = gigs[i].venue.displayName;
                    let city = gigs[i].location.city;
    
                    let gig = $("<div>").addClass("border mb-3 p-3 gig" + i)
                    let dateBox = $("<h4>").addClass("date").text(date);
                    let venueBox = $("<h4>").addClass("event").text(venue);
                    let cityBox = $("<h4>").addClass("event").text(city);
    
                    gig.append(dateBox);
                    gig.append(venueBox);
                    gig.append(cityBox);
    
                    gigsBox.append(gig);
    
            }
        }
    
        }).catch()
    }

    function clearResults() {
        $("#gig-history").empty();
        $("#upcoming-shows").empty();
    }

});