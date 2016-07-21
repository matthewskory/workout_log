$(function() {
    var WorkoutLog = (function($, undefined) {
        var API_BASE = "http://localhost:3000/api/";
        var userDefinitions = [];

        var setAuthHeader = function(sessionToken) {
            window.localStorage.setItem("sessionToken", sessionToken);
            // Set the authorization header
            // This can be done on individual calls
            // here we showcase ajaxSetup as a global tool
            $.ajaxSetup({
                "headers": {
                    "Authorization": sessionToken
                }
            });
        };

        // public
        return {
            API_BASE: API_BASE,
            setAuthHeader: setAuthHeader
        };
    })(jQuery);

    // Ensure .disabled aren't clickable
    $(".nav-tabs a[data-toggle=tab]").on("click", function(e) {
        var token = window.localStorage.getItem("sessionToken");
        if ($(this).hasClass("disabled") && !token) {
            //prevents the default (clickable) from being clickable
            e.preventDefault();
            return false;
        }
    });

    // setHeader if we have a session (refresh of browser)
    var token = window.localStorage.getItem("sessionToken");
    if (token) {
        WorkoutLog.setAuthHeader(token);
    }

    // expose this to the other workoutlog modules
    window.WorkoutLog = WorkoutLog;
});

// test API call
// $("#testAPI").on("click", function() {
//     console.log("it's working");


//     var test = $.ajax({
//         type: "GET",
//         url: "http://localhost:3000/api/test"
//     });

//     test.done(function(data) {
//         console.log(data);
//     });

//     test.fail(function() {
//         console.log("Oh SNAP!");
//     });
// });