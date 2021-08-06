document.getElementById("submit").addEventListener('click',buttonClicked);
document.getElementById("show-alerts").addEventListener('click',alarmLoaded);


function alarmLoaded(){
    chrome.alarms.get("CRYPTO_ZOON_ALARM").then((alarm) => {
        document.getElementById("alert").innerHTML = "Next fight is in: " + minToHourAndMin((alarm.scheduledTime - new Date().getTime())/60000) + " hours";
        console.log(alarm.scheduledTime)
        //I'm in milliseconds, divide by 1000 for seconds
    })
}

function buttonClicked(){
    sendToContentScripts({"method":"getZoansTimers"},showZoansTimers);
}

function sendToContentScripts(message,callback){
    let params = {
        active: true,
        currentWindow: true
    }
    chrome.tabs.query(params).then((tab) => {
        gotTabs(tab,message,callback);
    })
}

function gotTabs(tab,message,callback){
    chrome.tabs.sendMessage(tab[0].id, message, null, callback);
}

function showZoansTimers(response){
    let data = JSON.parse(response);
    console.log(data);

    let minutes = getMinFromArray(data.timers);
    
    chrome.alarms.clear("CRYPTO_ZOON_ALARM");
    chrome.alarms.create('CRYPTO_ZOON_ALARM', {
        periodInMinutes: minutes
    });
    document.getElementById("alert").innerHTML=minutes + " min until next fight";
}

function getMinFromArray(array){
    return Math.min(array)
}

function minToHourAndMin(minuteCount){
    console.log(minuteCount)
    let hour = Math.trunc(minuteCount/60);
    let minute = minuteCount - (hour*60);
    return "" + hour + ":" + Math.round(minute);
}