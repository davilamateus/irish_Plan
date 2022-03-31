

let pageLoading = document.querySelector('.page--loading');



const sessionIdUser = sessionStorage.getItem('id');
const localsessionIdUser = localStorage.getItem('id');
if( sessionIdUser|| localsessionIdUser){
    if(sessionIdUser){
        var userId = sessionStorage.getItem('id');
        var session = sessionStorage.getItem('session');
    } else{
        var userId = localStorage.getItem('id');
        var session = localStorage.getItem('session');
    }
}else{
    window.location.href = "login";
}

var userOptions = '';
var verificSession = async () => {
    var res = await fetch("api/login.php?action=verific", {
        method: "POST",
		body: JSON.stringify({ "id_user": userId, "session": session}),
		headers: {
            "Content-Type": "application/json"
		}
	});
    userOptions = await res.json();
	if(userOptions !== false){
        getUserData()

	} else{
        window.location.href = "login";
        
	}
};


verificSession()
var userData = '';
var getUserData = async () => {
    
    var res = await fetch("api/login.php?action=userData", {
        method: "POST",
        body: JSON.stringify({ "id_user": userId}),
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    userData = await res.json();
    if(userData !== false){
        travelIn()
        toDoList()
        weather()
		finance()
        perfil()
        editUser()
        translage()

        pageLoading.style.opacity = '0';

        setTimeout(() => {
            pageLoading.style.display = 'none'; 
            
        }, 1000);
	}
}

