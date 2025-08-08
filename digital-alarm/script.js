const clock = document.getElementById('clock');
const alarmInput = document.getElementById('alarmTime');
const setAlarmBtn = document.getElementById('setAlarm');
const alarmMsg = document.getElementById('alarmMsg');

let alarmTime = null;

function formatTime(date) {
    const hrs = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    const secs = String(date.getSeconds()).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

setInterval(() => {
    const now = new Date();
    const timeString = formatTime(now);
    clock.textContent = timeString;

    if (alarmTime && timeString === alarmTime) {
        alert("Alarm Ringing!");
        alarmMsg.textContent = "";
        alarmTime = null;
    }
}, 1000);

setAlarmBtn.addEventListener("click", () => {
    const inputVal = alarmInput.value;
    if (!inputVal) {
        alarmMsg.textContent = "Please select a time!";
        return;
    }

    const now = new Date();
    const [hour, minute] = inputVal.split(":");
    now.setHours(hour, minute, 0, 0);

    alarmTime = formatTime(now);
    alarmMsg.textContent = `Alarm set for ${alarmTime}`;
});
