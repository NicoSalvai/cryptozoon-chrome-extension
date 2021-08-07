document.getElementById("submit").addEventListener('click',buttonClicked);
document.getElementById("show-alerts").addEventListener('click',alarmLoaded);
document.getElementById("cryptozoon-btn").addEventListener('click',openCryptoZoon);
document.getElementById("github-btn").addEventListener('click',openGitlab);

function openGitlab(){
    chrome.tabs.create({url: "https://github.com/NicoSalvai/cryptozoon-chrome-extension"})
}

function openCryptoZoon(){
    chrome.tabs.create({url: "https://app.cryptozoon.io/fight-monster"})
}

function alarmLoaded(){
    chrome.alarms.get("CRYPTO_ZOON_ALARM").then((alarm) => {
        document.getElementById("alert").innerHTML = "Next fight is in: " + minToHourAndMin((alarm.scheduledTime - new Date().getTime())/60000) + " hours";
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
    let hour = Math.trunc(minuteCount/60);
    let minute = minuteCount - (hour*60);
    return "" + hour + ":" + Math.round(minute);
}