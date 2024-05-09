function showSummaryName (){
    let name = document.getElementById('nameSummary');
    name.innerHTML = loggedInUsers[0];

}

function greet() {
    let greeting = defineDayTime();

    let message = document.getElementById('greetingTime');
    message.innerHTML = greeting;
}

function defineDayTime() {
    let today = new Date();
    let time = today.getHours();
    let greeting;

    if (time < 6) {
        greeting = 'Good night,&nbsp;';
    } else if (time < 12) {
        greeting = 'Good morning,&nbsp;';
    } else if (time < 18) {
        greeting = 'Good afternoon,&nbsp;';
    } else if (time < 24) {
        greeting = 'Good evening,&nbsp;';
    };
    return greeting;
}