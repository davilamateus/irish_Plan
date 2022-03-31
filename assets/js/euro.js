let euroValue = document.querySelector('.euro--value');
let euroValueView = document.querySelector('.euro--view--more--value');
let color = '';
let colorBorder = '';
let euroStatusValue = document.querySelector('.euro--status span');
let euroStatusValueView = document.querySelector('.euro--view--more--taxa h2');
let euroStatusIcon = document.querySelector('.euro--status img');
let euroStatusIconView = document.querySelector('.euro--view--more--taxa img');
let viewMoreEuro = document.querySelector('.view--more--euro');
let euroView =  document.querySelector('.euro--view');
let dateNow = (new Date().getUTCDate())-1;
let closeViewEuroHtml = document.querySelector('.close--view--euro');
let closeViewEuroBG =  document.querySelector('.euro--view--bg');

let paypalTaxFixed = document.querySelector('.euro--view--paypal--tax--fixed');
let paypalTax = document.querySelector('.euro--view--paypal--tax');
let remesaTaxFixed = document.querySelector('.euro--view--remesa--tax--fixed');
let remesaTax = document.querySelector('.euro--view--remesa--tax');
let wiseTaxFixed = document.querySelector('.euro--view--wise--tax--fixed');
let wiseTax = document.querySelector('.euro--view--wise--tax');




let today = 'Now';
let yesterday = '1h ago';
let day2 = '2h ago';
let day3 = '3h ago';
let day4 = '4h ago';

if(localStorage.getItem('lang')=='pt-BR'){
     today = 'Agora';
     yesterday = '1h atrás';
     day2 = '2h atrás';
     day3 = '3h atrás';
     day4 = '4h atrás';
}


fetch("https://economia.awesomeapi.com.br/EUR-BRL/10?start_date=20200201&end_date=20250301").then((resp)=> resp.json().then((data) => { 
    euroValue.innerHTML = `R$${data[0].ask}`;
    euroValueView.innerHTML = `R$${data[0].ask}`;
    var value = data[0].ask;
    var taxa = ((((data[0].ask)*100)/data[1].ask)-100).toFixed(2);

    
    if(taxa <0){
        taxa = -1*taxa;
        color = '#E4FBF5';
        colorBorder = '#34EFAE';
        euroStatusIcon.setAttribute('src', 'assets/img/downeuro.svg');
        euroStatusIconView.setAttribute('src', 'assets/img/downeuro.svg');
        viewMoreEuro.style.backgroundColor = '#34EFAE';

        
    } else{
        color = '#fc5e4628';
        colorBorder = '#fc5f46';
        viewMoreEuro.style.backgroundColor = '#fc5f46';
        euroValue.style.color = '#fc5f46';
        euroStatusIcon.setAttribute('src', 'assets/img/upeuro.svg');
        euroStatusIconView.setAttribute('src', 'assets/img/upeuro.svg');

    }
    euroStatusValue.innerHTML = `${taxa}%`;
    euroStatusValueView.innerHTML = `${taxa}%`;
    euroStatusValue.style.color = colorBorder;
    euroValueView.style.color = colorBorder;
    euroStatusValueView.style.color = colorBorder;

// tax 
paypalTaxFixed.innerHTML = 'T.F = $0.35';
let paypalTaxValue = 0.019;
paypalTax.innerHTML = `Tax = ${paypalTaxValue*100}%`;

remesaTaxFixed.innerHTML = 'T.F = $0';
let remesaTaxValue = 0.0154;
remesaTax.innerHTML = `Tax = ${remesaTaxValue*100}%`;

wiseTaxFixed.innerHTML = 'T.F = $0.29';
let wiseTaxValue = 0.015;
wiseTax.innerHTML = `Tax = ${wiseTaxValue*100}%`;



  

     const ctx = document.getElementById('euro--today--Chart').getContext('2d');
     const myChart = new Chart(ctx, {
         type: 'line',
         data: {
             labels: [day4, day3, day2, yesterday, today],
             datasets: [{
                 label: "EUR",
                 display: true,
                 data: [data[4].ask, data[3].ask, data[2].ask, data[1].ask, data[0].ask],
                 pointRadius: 0,
                 backgroundColor: [
                    `${color}`
                   ],
                 borderColor: colorBorder,
                 borderWidth: 2,
                 tension: 0.4, 
             }]
         },
         options: {
             fill: true,
             plugins: {
                 labels: {
                     display: false,
                 },
                 legend: {
                     display: false,
                 },
             },
             scales: {
                 y: {
                     display: false,                     
                 },
                 x: {
                     display: false ,
                 }
                     
             }
         },
         responsive: true,
         maintainAspectRatio: false,
         scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero:true,
                     stepSize: 1
                 }
             }]
         }
     });

     const ctx2 = document.getElementById('euro--view--charts').getContext('2d');
     const myChart2 = new Chart(ctx2, {
         type: 'line',
         data: {
             labels: [day4, day3, day2, yesterday, today],
             datasets: [{
                 label: "EUR",
                 display: true,
                 data: [data[4].ask, data[3].ask, data[2].ask, data[1].ask, data[0].ask],
                 pointRadius: 3,
                 backgroundColor: [
                    `${color}`
                   ],
                 borderColor: colorBorder,
                 borderWidth: 3,
                 tension: 0.4,
             }]
         },
         options: {
             fill: true,
             plugins: {
                 labels: {
                     display: true,
                 },
                 legend: {
                     display: false,
                 },  
             },
             scales: {
                 y: {
                     display: true,
                 },
                 x: {
                     display: true ,
                 }         
             }
         },
         responsive: true,
         maintainAspectRatio: false,
         scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero:true,
                     stepSize: 1
                 }
             }]
         }
     })
 
 }) );

 closeViewEuroHtml.addEventListener('click',closeEuro);
 closeViewEuroBG.addEventListener('click',closeEuro);

 function closeEuro(){
    euroView.style.opacity ='0';
    setTimeout(() => {
        euroView.style.display ='none';
    }, 500);
 }

 viewMoreEuro.addEventListener('click', ()=>{
    euroView.style.display ='flex'
    setTimeout(() => {
        euroView.style.opacity ='1'
    }, 5);

 })