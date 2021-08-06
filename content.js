chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(message);
    if(message["method"] === "getZoansTimers"){
        let zoansTimers = getZoansTimers();
        sendResponse(JSON.stringify(zoansTimers));
    }
}

function getZoansTimers(){
    let htmlObjs = document.getElementsByClassName("card-fight-zoan");
    let zoans = {timers:[]}

    for(i = 0; i < htmlObjs.length; i++){
        let next_time_parts = htmlObjs[i].innerHTML.split("next time")[1].split("<span>")[1].split("</span>")[0].split(":");
        let next_time_in_mins = parseInt(next_time_parts[0])*60 + parseInt(next_time_parts[1]);
        zoans.timers.push(next_time_in_mins)
    }
    console.log(zoans)
    return zoans;
}