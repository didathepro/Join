/** The function `showSummaryName` retrieves the first element from the `loggedInUsers` array and displays it in the HTML element with the id 'nameSummary'. */
function showSummaryName() {
    let name = document.getElementById('nameSummary');
    name.innerHTML = loggedInUsers[0];
}


/** The function `greet` sets the inner HTML of an element with the id 'greetingTime' to a greeting based on the current time of day. */
function greet() {
    let greeting = defineDayTime();
    let message = document.getElementById('greetingTime');
    message.innerHTML = greeting;
}


/** The function `defineDayTime` determines the appropriate greeting based on the current time of day. */
function defineDayTime() {
    let today = new Date();
    let time = today.getHours();
    let greeting;
    if (time < 6) { greeting = 'Good night,&nbsp;'; }
    else if (time < 12) { greeting = 'Good morning,&nbsp;'; }
    else if (time < 18) { greeting = 'Good afternoon,&nbsp;'; }
    else if (time < 24) { greeting = 'Good evening,&nbsp;'; };
    return greeting;
}