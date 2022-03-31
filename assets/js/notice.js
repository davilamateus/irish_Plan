

let pageCount = 0;
let noticesJson = '';
let noticeViewMore01 = document.querySelector('.notice--view--more--01');
let noticeViewMore02 = document.querySelector('.notice--view--more--02');
let imgNotice01 = document.querySelector(".img--notice--01");
let imgNotice02 = document.querySelector(".img--notice--02");
let titleNotice01 = document.querySelector(".title--notice--01");
let titleNotice02 = document.querySelector(".title--notice--02");
let category01 = document.querySelector(".category--01");
let category02 = document.querySelector(".category--02");
let description01 = document.querySelector(".description--01");
let description02 = document.querySelector(".description--02");
let notice02 = document.querySelector('.notice--02');
let noticeView = document.querySelector('.notice--view');
let noticeViewTopo = document.querySelector(".notice--view--topo");
let noticeViewDate = document.querySelector(".notice--view--date");
let noticeViewCategory = document.querySelector(".notice--view--category");
let noticeViewTitle = document.querySelector(".notice--view--title");
let noticeViewDescription = document.querySelector(".notice--view--description");
let noticeBack = document.querySelector('.notice--back');
let noticeNext = document.querySelector('.notice--next');
let noticeViewBg = document.querySelector('.notice--view--bg');

noticeBack.addEventListener('click',backPage)
noticeNext.addEventListener('click',nextPage)
      
function nextPage(){
    pageCount++;
    getNotice()
   }


function backPage(){    
    if(pageCount <= 0){
        pageCount=0;
        } else{
        pageCount--;
        getNotice()

    }
}
   
   const getNotice = async () => {
       var res = await fetch(`api/notice.php?action=get`, {
           method: "GET",
           headers: {"Content-Type": "application/json"}
        });
        notice = await res.json();
        
        noticesJson = notice;
        noticeViewMore01.setAttribute('id', pageCount);
        noticeViewMore01.addEventListener('click', viewMore);
        noticeViewMore02.addEventListener('click', viewMore);
        noticeViewMore02.setAttribute('id', pageCount+1);

        imgNotice01.style.backgroundImage = `url('${noticesJson[pageCount].img}')`;
         titleNotice01.innerHTML = `${noticesJson[pageCount].title}`;
         category01.innerHTML = `${noticesJson[pageCount].category}`;
         description01.innerHTML = `${noticesJson[pageCount].description.substr(0,40)}...`;

         if(pageCount <= noticesJson.length -2){
            notice02.style.display = 'grid';
            imgNotice02.style.backgroundImage = `url('${noticesJson[pageCount+1].img}')`;
             titleNotice02.innerHTML = `${noticesJson[pageCount+1].title}`;
             category02.innerHTML = `${noticesJson[pageCount+1].category}`;
             description02.innerHTML = `${noticesJson[pageCount+1].description.substr(0,40)}...`;


         }  else { notice02.style.display = 'none';
         pageCount = noticesJson.length-2
        
        }

   }

   getNotice()

   function viewMore(){
       
       const idNotice = this.id
       noticeView.style.display = 'flex';
       noticeViewTopo.style.background = `url(${noticesJson[idNotice].img})`;
       noticeViewDate.innerHTML = `${noticesJson[idNotice].create_datev}`;
       noticeViewCategory.innerHTML = `${noticesJson[idNotice].category}`;
       noticeViewTitle.innerHTML = `${noticesJson[idNotice].title}`;
       noticeViewDescription.innerHTML = `${noticesJson[idNotice].description}`;

   }


   noticeViewBg.addEventListener('click', ()=>{
    noticeView.style.display = 'none';
   })