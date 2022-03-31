//Document

let rememberCircle = document.querySelector('.remember--radio--circle');
let remmeberBtn = document.querySelector(".remember");
let rememberTrueOrFalse = '';
let signUpBtn = document.querySelector('#signUpBtn');
let loginUpBtn = document.querySelector('#loginBtn');
let formSingUp = document.querySelector('.form--signUp');
let formLogin =  document.querySelector('.form--login');
let btnLogin = document.querySelector(".login--enter");
let addUserBtn = document.querySelector('.signUp--enter');
let loginPassword = document.querySelector('#loginPassword');
let viewPassword = document.querySelector('.div--password i');
let viewSignPassword = document.querySelector('.div--password--sign i');
let viewSignConfirmPassword = document.querySelector('.div--password--sign--confirm i');
let loginEmail = document.querySelector('#loginEmail');
let icorrectEmailPassword = document.querySelector('.icorrect--email--password');
let passwordSignUp = document.querySelector('#signUpPassword');
let passwordRequeri = document.querySelector('.password--requeri');
let signUpEmail = document.querySelector('#signUpEmail');
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let passwordConfirm = document.querySelector('#confirmPassword');
let passwordRequeriConfirm = document.querySelector('.password--requeri--confirm');
let passwordRequeriConfirmText = document.querySelector('.password--requeri--confirm-text');
let firstNameCheck = false;
let lastNameCheck = false;
let lowerCaseLettersCheck = false;
let upperCaseLettersCheck = false;
let specCharacterCheck = false;
let numbersCheck = false;
let lengthCheck = false;
let passwordCheck = false;
let passwordConfirmCheck = false;
let emailCheck = false;
let passwordRequeriLowercase = document.querySelector(".password--requeri--lowercase");
let passwordRequeriUppercase = document.querySelector(".password--requeri--uppercase");
let passwordRequeriSpecial = document.querySelector(".password--requeri--special");
let passwordRequeriNumber = document.querySelector(".password--requeri--number");
let passwordRequeriLeast = document.querySelector(".password--requeri--least");
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const specCharacter = /[!@#$%^&*.,]/g;
const numbers = /[0-9]/g;
const dot = /[.]/g
const arroba = '@'

// Remember
remmeberBtn.addEventListener('click',()=>{
	rememberCircle.classList.toggle('rememberSelect');
	rememberTrueOrFalse = rememberCircle.classList.contains('rememberSelect');	
});

// Header
signUpBtn.addEventListener('click',()=>{
	loginUpBtn.classList.toggle('login--select');
	signUpBtn.classList.toggle('login--select');
	formSingUp.classList.toggle('display--none');
	formLogin.classList.add('display--none');
});
loginUpBtn.addEventListener('click',()=>{
	signUpBtn.classList.toggle('login--select');
	loginUpBtn.classList.toggle('login--select');
	formSingUp.classList.toggle('display--none');
	formLogin.classList.toggle('display--none');
});


// View Password 
viewPassword.addEventListener('mouseover', ()=>{
	 loginPassword.setAttribute('type', 'text');
});
viewPassword.addEventListener('mouseout', ()=>{
	loginPassword.setAttribute('type', 'password');
});
viewSignPassword.addEventListener('mouseover', ()=>{
	passwordSignUp.setAttribute('type', 'text');
});
viewSignPassword.addEventListener('mouseout', ()=>{
	passwordSignUp.setAttribute('type', 'password');
});
viewSignConfirmPassword.addEventListener('mouseover', ()=>{
	passwordConfirm.setAttribute('type', 'text');
});
viewSignConfirmPassword.addEventListener('mouseout', ()=>{
	passwordConfirm.setAttribute('type', 'password');
});

//Login
btnLogin.addEventListener("click", enterUser);

function enterUser(){ 
	const enter = async () => {
	const res = await fetch("../api/login.php?action=login", {
		method: "POST",
		body: JSON.stringify({ "email": loginEmail.value, "password": loginPassword.value}),
		headers: {
			"Content-Type": "application/json"
		}
	});
	var output_user = await res.json();
	if(output_user !== false){
		if(rememberCircle.classList.contains('rememberSelect')){
			localStorage.setItem('id', (output_user[0]));
			localStorage.setItem('session', (output_user[1]));
			sessionStorage.setItem('id', (output_user[0]));	
			sessionStorage.setItem('session', (output_user[1]));	
			setTimeout(() => {
				window.location.href = "../";
			}, 100);
		}else{
			sessionStorage.setItem('id', (output_user[0]));	
			sessionStorage.setItem('session', (output_user[1]));	
						setTimeout(() => {
				window.location.href = "../";
			}, 100);
		}
	} else{
		icorrectEmailPassword.style.display= 'grid';
		loginPassword.classList.add('input--error');
		loginEmail.classList.add('input--error');
	}}
	enter()
};

//Sign Up
// Validate password
passwordSignUp.addEventListener('focusin', ()=>{
		passwordRequeri.classList.remove('display--none');
});
passwordSignUp.addEventListener('focusout', ()=>{
		passwordRequeri.classList.add('display--none');
});

passwordSignUp.addEventListener('keyup',()=>{

		if(passwordSignUp.value.match(lowerCaseLetters)){
			passwordRequeriLowercase.classList.add('password--requeri--ok');
			lowerCaseLettersCheck = true;
		} else{
		passwordRequeriLowercase.classList.remove('password--requeri--ok');
		}

		if(passwordSignUp.value.match(upperCaseLetters)){
			upperCaseLettersCheck = true;
			passwordRequeriUppercase.classList.add('password--requeri--ok');
		} else{ 
			passwordRequeriUppercase.classList.remove('password--requeri--ok');
		}

		if(passwordSignUp.value.match(specCharacter)){
			specCharacterCheck = true;
			passwordRequeriSpecial.classList.add('password--requeri--ok');
		} else{
			passwordRequeriSpecial.classList.remove('password--requeri--ok');
		}

		if(passwordSignUp.value.match(numbers)){
			numbersCheck = true;
			passwordRequeriNumber.classList.add('password--requeri--ok');
		} else{ 
			passwordRequeriNumber.classList.remove('password--requeri--ok');
		}
		if(passwordSignUp.value.length >= 8){
			lengthCheck = true;
			passwordRequeriLeast.classList.add('password--requeri--ok');
		} else{ 
			passwordRequeriLeast.classList.remove('password--requeri--ok');
		}
			
		if(lowerCaseLettersCheck==true && upperCaseLettersCheck == true && specCharacterCheck == true && numbersCheck == true && lengthCheck == true){
			passwordCheck =true;
		} 
})


// confirm password
passwordConfirm.addEventListener('focusin', ()=>{
	passwordRequeriConfirm.classList.remove('display--none');
});
passwordConfirm.addEventListener('focusout', ()=>{
	passwordRequeriConfirm.classList.add('display--none');
});
passwordConfirm.addEventListener('keyup',()=>{
	if(passwordSignUp.value === passwordConfirm.value){
	passwordRequeriConfirmText.classList.add('password--requeri--ok');
	 passwordConfirmCheck = true;
	}else{
		passwordRequeriConfirmText.classList.remove('password--requeri--ok');
		}
	});


addUserBtn.addEventListener("click", async () => {
	if(signUpEmail.value.match(dot) && signUpEmail.value.match(arroba) && (signUpEmail.value).length > 0){
		emailCheck = true;
		signUpEmail.classList.remove('input--error');
	} else{signUpEmail.classList.add('input--error');
		}
	if((firstName.value).length <= 0){
		firstName.classList.add('input--error');
	}else{firstName.classList.remove('input--error');
	firstNameCheck = true;
}
	if((lastName.value).length <= 0){
		lastName.classList.add('input--error');
	}else{lastName.classList.remove('input--error');
	lastNameCheck = true;
}
	if((passwordSignUp.value).length <= 0){
		passwordSignUp.classList.add('input--error');
	}else{passwordSignUp.classList.remove('input--error');
}

	if((passwordConfirm.value).length <= 0){
		passwordConfirm.classList.add('input--error');
	}else{passwordConfirm.classList.remove('input--error');
}

	if(passwordConfirmCheck == true && firstNameCheck ==true && lastNameCheck == true && emailCheck == true){
			const res = await fetch("../api/login.php?action=insertUser", {
				method: "POST",
				body: JSON.stringify({ "email": signUpEmail.value, "first_name": firstName.value, "last_name":lastName.value, "password": passwordConfirm.value}),
				headers: {
					"Content-Type": "application/json"
				}
			});
			var output = await res.json();
			if(output == 'emailFalse'){
				document.querySelector('.email--registered').style.display = 'flex';
				document.querySelector('#signUpEmail').classList.add('input--error');
			} else{
				loginEmail.value = signUpEmail.value;
				loginPassword.value = passwordConfirm.value;

				enterUser()
			}
	}
});












	
	
	




