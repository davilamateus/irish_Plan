
let nameNormalise = '';
let lastNameNormalise = '';
let userImg = '';

function perfil(){
   let first_name = userData[0].first_name;
   let last_name = userData[0].last_name;
   let imgPerfilHtml = document.querySelector('.perfil--img');
   let namePerfilHtml = document.querySelector('.user--name');
   let perfilLogoff = document.querySelector('.perfil--medium div');

   nameNormalise = (first_name[0].toUpperCase())+(first_name.slice(1).toLowerCase())
   lastNameNormalise = (last_name[0].toUpperCase())+(last_name.slice(1).toLowerCase())
   userImg = userOptions.user_img
   imgPerfilHtml.style.background = `url(${userImg})`
   namePerfilHtml.innerHTML = `${nameNormalise}!`


   perfilLogoff.addEventListener('click', ()=>{
      localStorage.clear()
      sessionStorage.clear()

      setTimeout(() => {
         window.location.href = "/login"
      }, 100);
   })


   }

