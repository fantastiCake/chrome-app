
function getTime() {
    const currentDate = new Date;
    const now = {
        hour: String(currentDate.getHours()),
        minute: String(currentDate.getMinutes()),
        second: String(currentDate.getSeconds())
    }
    return now;
}

function makeTimeForm(time) {
    const formedTime = time;
    if(formedTime.hour.length == 1)
        formedTime.hour = '0' + formedTime.hour;
    if(formedTime.minute.length == 1)
        formedTime.minute = '0' + formedTime.minute;
    if(formedTime.second.length == 1)
        formedTime.second = '0' + formedTime.second;
    return `${formedTime.hour}:${formedTime.minute}:${formedTime.second}`;
}

function setTime() {
    const clockArea = document.querySelector(".clock-area");
    const now = getTime();
    const formedNow = makeTimeForm(now);
    clockArea.innerText = formedNow;
}

function init() {
    setInterval(setTime, 1000);
}

init();