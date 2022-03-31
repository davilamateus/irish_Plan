 function travelIn(){
    let dateTravel = parseInt(userOptions.date_travel);
    let now = new Date().getTime();



    let x = setInterval(()=> {
        let countdown = dateTravel - now;
        let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        let hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((countdown % (1000 * 60)) / 1000);


        if(days <10){document.querySelector(".countdown--days h3").innerHTML = `0${days}`}
        else{document.querySelector(".countdown--days h3").innerHTML = days};

        if(hours <10){document.querySelector(".countdown--time h3").innerHTML = `0${hours}`}
        else{document.querySelector(".countdown--time h3").innerHTML = hours};

        if(minutes<10){document.querySelector(".countdown--minutes h3").innerHTML = `0${minutes}`}
        else{document.querySelector(".countdown--minutes h3").innerHTML = minutes};

        if(seconds<10){document.querySelector(".countdown--secontes h3").innerHTML = `0${seconds}`}
        else{document.querySelector(".countdown--secontes h3").innerHTML = seconds};

}, 1000);}
