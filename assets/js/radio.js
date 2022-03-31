
let radioSlider = document.querySelector(".radio--slider");
let radioSrc = document.querySelector(".radio--src");
let radioVolume = document.querySelector(".radio--volume");
let radioPlay =  document.querySelector(".radio--play");
let radioPause = document.querySelector(".radio--stop");
let radioBack =  document.querySelector(".radio--back");
let radioNext =  document.querySelector(".radio--next");
let radioImg = document.querySelector(".radio--img");
let radioTitle = document.querySelector(".radio--title");

const getRadio = async () => {
    var res = await fetch(`api/radio.php?action=get`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });
     radios = await res.json();
     
    radioJson = radios;
 
    let volumeBox = document.querySelector('.volume--box');
    
    radioVolume.addEventListener("mouseout",()=>{
    setTimeout(()=> { 

        volumeBox.style.opacity = '0';
        setTimeout(()=>{
            volumeBox.style.display = "none";
         },350)},3500)
 })
 
 radioVolume.addEventListener("mouseover",()=>{
    volumeBox.style.display = "grid";
     setTimeout(()=>{
        volumeBox.style.opacity = '1';
     }, 100)
 })
 
 radioSlider.addEventListener("click",()=>{
     let volumeSet = (radioSlider.value)/100;
     radioSrc.volume = volumeSet;
 
         if(volumeSet > 0.75){
            radioVolume.innerHTML = '<i class="fa-light fa-volume-high"></i>';
             
         }
         if(volumeSet <= 0.75 && volumeSet > 0.4){
            radioVolume.innerHTML = '<i class="fa-light fa-volume"></i>';
             
         }
         if(volumeSet <= 0.4  && volumeSet >= 0.1){
            radioVolume.innerHTML = '<i class="fa-light fa-volume-low"></i>';
        }
         if(volumeSet == 0.01 ){
            radioVolume.innerHTML = '<i class="fa-light fa-volume-off"></i>';
         }
 } )
 
 
 
 radioPlay.addEventListener("click", playRadio)
 function playRadio(){
    radioPlay.style.display = "none";
    radioPause.style.display = "grid";
    radioSrc.play();
 
 }
 
 radioPause.addEventListener("click", pauseRadio)
 
 function pauseRadio()
 {
    radioPause.style.display = "none";
     radioPlay.style.display = "grid";
     radioSrc.pause();
 
 
 }
 
 
 
 let radioID = 0;
 radioBack.addEventListener("click", ()=> {
     if(radioID == 0 ){radioID = (radioJson.length)-1}
     else{radioID--}
     selectRadio()
     radioSrc.play();
    });
 
    radioNext.addEventListener("click", ()=> {
     if(radioID == (radioJson.length)-1){radioID = 0}
     else{radioID++ }
     selectRadio()
     radioSrc.play();
    });
 
 
 function selectRadio(){
    radioSrc.setAttribute("src", radioJson[radioID].url);
    radioImg.setAttribute("src", radioJson[radioID].img);
    if(localStorage.getItem('lang')=='pt-BR'){
        document.querySelector(".radio--title").innerHTML =  `<span class="you--are--listen">Você esta ouvindo </span>${radioJson[radioID].title}`;

    } else{
        document.querySelector(".radio--title").innerHTML =  `<span class="you--are--listen">You are listen </span>${radioJson[radioID].title}`;
    }
    
 }
 
 selectRadio()
 
 radioJson.map((item)=>{
     let radioListDiv = document.querySelector(".radio--option--list--radios").cloneNode(true);
     let radioListImg = document.createElement("img");
     radioListImg.src = item.img;
     radioListDiv.appendChild(radioListImg);
     let radioListTitle = document.createElement("span");
     radioListTitle.innerHTML= item.title;
     radioListDiv.appendChild(radioListTitle);
     document.querySelector(".radio--option--list").appendChild(radioListDiv);
     radioListDiv.addEventListener("click",()=>{
        radioSrc.setAttribute("src", item.url);
         radioImg.setAttribute("src", item.img);
         radioTitle.innerHTML =  `${item.title}`;
     })
 })

 let radioOptionList =  document.querySelector(".radio--option--list");
 let radioOptions = document.querySelector(".radio--option");
 radioOptionList.style.display = "none";
 radioOptions.addEventListener("click",()=>{
     if(radioOptionList.style.display === "none"){radioOptionList.style.display = "block"}
     else{radioOptionList.style.display = "none"};
 })
 
  
    

}
getRadio()