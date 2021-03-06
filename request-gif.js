

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    // get the user's input text from the DOM
    var searchQuery = $("#tag").val(); // gets user input id tag
    console.log("searchQuery is " + searchQuery);

    // api request json url as a variable plus the search query input data
    var gif_JSON_url = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=Jackson+5+" + searchQuery;
    console.log("gif_JSON_url is " + gif_JSON_url);

    // gets user input for robo test and set as a variable
    var robotest = $("#testQ").val();

    //execute ajax function if not a robot:

    if (robotest == "5") {

    //ajax request object sent to the server as one communication

    $.ajax({

        url: gif_JSON_url, /* TODO where should this request be sent?
             gif_JSON_url leads to the json data list of the gif and data.image_original_url
             is the url we want and stringify will take out the backslashes*/

        success: function(data) {
            // if the response comes back successfully, the code in here will execute.

            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us


            console.log("we received a response!");
            console.log(data);

            // TODO
            // 1. set the source attribute of our image to the image_url of the GIF
            // 2. hide the feedback message and display the image
            var working_url = data.data.image_url;


            $("#gif").attr('src', working_url);
            setGifLoadedStatus(true);
        }, //ends success function

        error: function() {
            console.log("error!");
            /* if something went wrong,
             the code in here will execute instead of the success function
             give the user an error message */
                $("#feedback").text("Sorry, could not load GIF. Try again!");
                setGifLoadedStatus(false);

        } //ends error function

    }); //ends ajax

    } // ends IF statement TRUE actions


    else {
        $("#NoGifs").text("Riddle answer incorrect. No gifs for you."); //add no gifs for you line
    }; // ends ELSE statement FALSE actions

} // ends fetchAndDisplayGif function


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
    //$("#testQ").attr("hidden"), isCurrentlyLoaded);
    //can I just add lines to this?
}
