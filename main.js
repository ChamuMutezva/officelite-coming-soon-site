console.log("Hello world")
const deadline = 'January 11 2021 04:59:59 GMT+0200';

const getRemainingTime = (endtime) => {
    const totalTime = Date.parse(endtime) - Date.parse(new Date())
    const seconds = Math.floor((totalTime / 1000) % 60)
    const mins = Math.floor((totalTime / 1000 / 60) % 60)
    const hours = Math.floor((totalTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalTime / (1000 * 60 * 60 * 24));

    return {
        seconds,
        mins,
        hours,
        days,
        totalTime
    }
}


function initialiseClock(sec, min, hour, day, endtime) {
    console.log(sec)
    const daysLeft = document.getElementById(day)
    const hoursLeft = document.getElementById(hour)
    const minsLeft = document.getElementById(min)
    const secsLeft = document.getElementById(sec)

    const timesInterval = setInterval(() => {
        const timeRemaining = getRemainingTime(endtime)

        daysLeft.innerHTML = `${timeRemaining.days} <span> Days</span`
        hoursLeft.innerHTML = `${timeRemaining.hours} <span> Hours</span`
        minsLeft.innerHTML = `${timeRemaining.mins} <span> Minutes</span`
        secsLeft.innerHTML = timeRemaining.seconds > 10 ?
            `0${timeRemaining.seconds} <span> Seconds</span` :
            `${timeRemaining.seconds} <span> Seconds</span`

        if (timeRemaining.totalTime <= 0) {
            clearInterval(timesInterval)
        }
    }, 1000)
}

initialiseClock("secs", "mins", "hours", "days", deadline)
