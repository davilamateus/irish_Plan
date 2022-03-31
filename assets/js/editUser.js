function editUser(){

        const currentTime = new Date(document.querySelector('#travel--in--edit').value );
        let parsedTimestamp = new Date(userOptions.date_travel/1);;
        let dateNormalise = (parsedTimestamp.toISOString()).slice(0, -5);
        let editUserPhoto = document.querySelector('.edit--user--photo');
        let editUserName = document.querySelector('.edit--user--name');
        let editEmail = document.querySelector('#email--edit');
        let planningEdit = document.querySelector('#planning--edit');
        let cityEdit = document.querySelector('#city--edit');
        let travelInEdit = document.querySelector('#travel--in--edit');
        let editUserSave = document.querySelector('.edit--user--save');
        let editUserEditPassword =  document.querySelector('.edit--user--edit--password')
        let editUser = document.querySelector('.edit--user');
        let editUserBox = document.querySelector('.edit--user--box');
        let changePasswordBox = document.querySelector('.change--password--box');
        let passwordNew = document.querySelector('#change--new--password');
        let passwordRequeri = document.querySelector('.password--requeri');
        let saveNewPassword = document.querySelector('.save--new--password');
        let editUserBg = document.querySelector('.edit--user--bg');
        let editUserBtn =  document.querySelector('.perfil--right');
        let editPasswordClose = document.querySelector('.change--password--header img');
        let editUserCloseBtn = document.querySelector('.edit--user--header img');
        let lowerCaseLettersCheck = false;
        let upperCaseLettersCheck = false;
        let specCharacterCheck = false;
        let numbersCheck = false;
        let lengthCheck = false;
        let passwordCheck = false
        let passwordConfirmCheck = false
        const lowerCaseLetters = /[a-z]/g;
        const upperCaseLetters = /[A-Z]/g;
        const specCharacter = /[!@#$%^&*.,]/g;
        const numbers = /[0-9]/g;


        editUserPhoto.style.background = `url(${userOptions.user_img})`;
        editUserPhoto.addEventListener('mouseover',()=>{
            document.querySelector('.fa-camera').style.display = 'flex';
        })
        editUserPhoto.addEventListener('mouseout',()=>{
            document.querySelector('.fa-camera').style.display = 'none';
        })

        editUserName.innerHTML = `${nameNormalise} ${lastNameNormalise}`;
        editEmail.value = userData[0].email;
        planningEdit.value = userOptions.finance_goals;
        cityEdit.value = city;
        travelInEdit.value = dateNormalise;
        editUserSave.addEventListener('click', ()=>{
            const currentTime = new Date(travelInEdit.value );
            const updateUser = async () => {
            const res = await fetch("api/updateUser.php?action=update", {
                method: "POST",
                body: JSON.stringify({
                    "id": userData[0].id,
                    "email": document.querySelector('#email--edit').value,
                    "planning": document.querySelector('#planning--edit').value,
                    "city": document.querySelector('#city--edit').value,
                    "travel_in": currentTime.getTime()
                })
            });
            }
            
            updateUser()
            window.location.href = "";
        })
        editUserEditPassword.addEventListener('click',()=>{
            editUserBox.style.display = 'none';
            changePasswordBox.style.display = 'flex';
        })
        passwordNew.addEventListener('focusin', ()=>{
            passwordRequeri.classList.remove('display--none');
        })
        passwordNew.addEventListener('focusout', ()=>{
            passwordRequeri.classList.add('display--none');
        })
        passwordNew.value = "";
        passwordNew.addEventListener('keyup',()=>{
            let passwordRequeriLowercase = document.querySelector(".password--requeri--lowercase");
            let passwordRequeriUppercase = document.querySelector(".password--requeri--uppercase");
            let passwordRequeriSpecial= document.querySelector(".password--requeri--special");
            let passwordRequeriNumber = document.querySelector(".password--requeri--number");
            let passwordRequeriLeast = document.querySelector(".password--requeri--least");
            if(passwordNew.value.match(lowerCaseLetters)){
                passwordRequeriLowercase.classList.add('password--requeri--ok');
                lowerCaseLettersCheck = true;
            } else{
                passwordRequeriLowercase.classList.remove('password--requeri--ok');
            }

            if(passwordNew.value.match(upperCaseLetters)){
                upperCaseLettersCheck = true;
                passwordRequeriUppercase.classList.add('password--requeri--ok');
            } else{ 
                passwordRequeriUppercase.classList.remove('password--requeri--ok');
            }

            if(passwordNew.value.match(specCharacter)){
                specCharacterCheck = true;
                passwordRequeriSpecial.classList.add('password--requeri--ok');
            } else{
                passwordRequeriSpecial.classList.remove('password--requeri--ok');
            }

            if(passwordNew.value.match(numbers)){
                numbersCheck = true;
                passwordRequeriNumber.classList.add('password--requeri--ok');
            } else{ 
                passwordRequeriNumber.classList.remove('password--requeri--ok');
            }
            if(passwordNew.value.length >= 8){
                lengthCheck = true;
                passwordRequeriLeast.classList.add('password--requeri--ok');
            } else{ 
                passwordRequeriLeast.classList.remove('password--requeri--ok');
            }
                
            if(lowerCaseLettersCheck==true && upperCaseLettersCheck == true && specCharacterCheck == true && numbersCheck == true && lengthCheck == true){
                passwordCheck =true;
            } 
                
        })

        let changePasswordView = document.querySelector('.change--password--new div i');
        let changePassword = document.querySelector('#change--new--password');
        let passwordConfirm = document.querySelector('#change--new--confirm--password')
        let passwordReqeriConfirm = document.querySelector('.password--requeri--confirm');
        let passwordRequeriConfirmText = document.querySelector('.password--requeri--confirm-text');
        let changePasswordConfirmView = document.querySelector('.change--password--new--confirm div i');
        let changePasswordConfirm =  document.querySelector('#change--new--confirm--password');

        changePasswordView.addEventListener('mouseover', ()=>{
            changePassword.setAttribute('type', 'text');
        })

        changePasswordView.addEventListener('mouseout', ()=>{
            changePassword.setAttribute('type', 'password');
        })

        // confirm password

        passwordConfirm.addEventListener('focusin', ()=>{
            passwordReqeriConfirm.classList.remove('display--none');
        })
        passwordConfirm.addEventListener('focusout', ()=>{
            passwordReqeriConfirm.classList.add('display--none');
        })


        passwordConfirm.addEventListener('keyup',()=>{
            if(passwordNew.value === passwordConfirm.value){
            passwordRequeriConfirmText.classList.add('password--requeri--ok');
            passwordConfirmCheck = true;
                }else{
                passwordRequeriConfirmText.classList.remove('password--requeri--ok');
                }
        })
        changePasswordConfirmView.addEventListener('mouseover', ()=>{
            changePasswordConfirm.setAttribute('type', 'text');
        })

        changePasswordConfirmView.addEventListener('mouseout', ()=>{
            changePasswordConfirm.setAttribute('type', 'password');
        })

        saveNewPassword.addEventListener('click', ()=>{
            const password =  document.querySelector('#change--current--password').value;

            if(passwordCheck && passwordConfirmCheck){
            const newConfirmPassword =  changePasswordConfirm.value;
            const verificPassword = async () => {
                const res = await fetch("api/updateUser.php?action=verificPassword", {
                    method: "POST",
                    body: JSON.stringify({
                        "id": userData[0].id,
                        "password": password,
                        "new_password": newConfirmPassword,
                    })
                });
                var verificPasswordRes = await res.json();
                if(verificPasswordRes == false){
                    document.querySelector('#change--current--password').classList.add('input--error');
                    console.log('Erro')

                } 
            }
            verificPassword()
            }
                
        })


        editUserPhoto.addEventListener('click',()=>{
            var editPhoto = document.querySelector('#photo--edit');
            var idUser =  userOptions.id_user;
            editPhoto.addEventListener('change', ()=>{

                let data = new FormData();
                data.append('id_user', idUser);
                data.append('file', editPhoto.files[0]);


                const subtmiPhoto = async () => {
                    const res = await fetch(`api/updateUser.php?action=updatePhoto&id_user=${idUser}`, {
                        method: "POST",
                        credentials: 'same-origin',
                        body: data
            
                    });

                    setTimeout(() => {
                        verificSession()
                        editUser()
                        
                    }, 1000);
                }     
                    subtmiPhoto()  
            })
            
        })

        editUserBg.addEventListener('click' , close)
        editUserCloseBtn.addEventListener('click' , close)

        function close(){
            editUser.style.opacity = '0';
            setTimeout(() => {
                editUser.style.display = 'none';
            }, 300);
        }

        editUserBtn.addEventListener('click' , ()=>{
            editUser.style.display = 'flex';

            setTimeout(() => {
                editUser.style.opacity = '1';       
            }, 10);
        })

        editPasswordClose.addEventListener('click', ()=>{

            changePasswordBox.style.display = 'none';
            editUserBox.style.display = 'flex';

        })
}

