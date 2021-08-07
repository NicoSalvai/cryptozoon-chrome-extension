/*
chrome.runtime.onInstalled.addListener(() => {

});

chrome.storage.local.get("name", data => {

});

*/
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "CRYPTO_ZOON_ALARM") {
        chrome.notifications.create('CRYPTO_ZOON_FIGHT_ALERT', {
            type: 'basic',
            iconUrl: './img/icon.png',
            title: 'You have a fight',
            message: 'You have at least a fight in CryptoZoon',
            priority: 1
        });
        chrome.notifications.onClicked.addListener((notificationId) => { chrome.tabs.create({url: "https://app.cryptozoon.io/fight-monster"})})
        chrome.alarms.clear("CRYPTO_ZOON_ALARM");
    }
});