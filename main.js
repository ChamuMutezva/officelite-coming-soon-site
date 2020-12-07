const inputs = Array.from(document.querySelectorAll(".feedback"));
let resetInputs = true;
const form = document.querySelector("form")

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

        timeRemaining.days < 10 ?
            daysLeft.innerHTML = `0${timeRemaining.days} <span> Days</span` :
            daysLeft.innerHTML = `${timeRemaining.days} <span> Days</span`

        timeRemaining.hours < 10 ?
            hoursLeft.innerHTML = `0${timeRemaining.hours} <span> Hours</span` :
            hoursLeft.innerHTML = `${timeRemaining.hours} <span> Hours</span`

        timeRemaining.mins < 10 ?
            minsLeft.innerHTML = `0${timeRemaining.mins} <span> Min</span` :
            minsLeft.innerHTML = `${timeRemaining.mins} <span> Min</span`

        timeRemaining.seconds < 10 ?
            secsLeft.innerHTML = `0${timeRemaining.seconds} <span> Sec</span` :
            secsLeft.innerHTML = `${timeRemaining.seconds} <span> Sec</span`

        if (timeRemaining.totalTime <= 0) {
            daysLeft.innerHTML = "00"
            hoursLeft.innerHTML = "00"
            minsLeft.innerHTML = "00"
            secsLeft.innerHTML = "00"

            clearInterval(timesInterval)
        }
    }, 1000)
}

initialiseClock("secs", "mins", "hours", "days", deadline)

//contact page
inputs.forEach((input, idk) => {
    console.log(idk);

    input.addEventListener("invalid", function () {
        // input.nextElementSibling.classList.add("errorDisplay");
        // input.closest("label").classList.add("invalidInput")
        const confirmed = document.querySelectorAll(".confirmation")
        const errorDisplay = document.querySelectorAll(".error")
        console.log(errorDisplay[idk])
        confirmed[idk].classList.add("confirmed")
        errorDisplay[idk].classList.add("confirmed")
        input.classList.add("invalidInput")
    })

    input.addEventListener("input", function () {
        if (input.validity.valid) {
            // input.nextElementSibling.classList.remove("errorDisplay");
            input.classList.remove("invalidInput")
            // input.closest("label").classList.add("invalidInput")
           // const confirmed = document.querySelectorAll(".confirmation")
            const errorDisplay = document.querySelectorAll(".error")
            errorDisplay[idk].classList.remove("confirmed")
        } else {
            resetInputs = false;
        }
    })

})

if (form !== null) {
    form.addEventListener("submit", (evt) => {
        console.log(evt.target);
        evt.preventDefault();
        if (resetInputs) {
            //clear all inputs when data is correct
            inputs.forEach((input, idk) => {
                console.log("Clear all");
                input.value = "";
                const confirmed = document.querySelectorAll(".confirmation")
                confirmed[idk].classList.remove("confirmed")
            })
            alert("Thank you, form successfully submitted")
        }
        

    })

}

