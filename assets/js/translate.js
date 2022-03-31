let laguagePtHome = document.querySelector('.langague--pt');
let laguageEnHome = document.querySelector('.langague--en');
let laguagePtLogin = document.querySelector('.langague--pt--login');
let laguageEnLogin = document.querySelector('.langague--en--login');



let t = (el, text)=>{
    document.querySelector(el).innerHTML = text;
}

let tP = (el, text)=>{
    document.querySelector(el).setAttribute('placeholder', text);
}

console.log(localStorage.getItem('lang'))

function translage (){

if(localStorage.getItem('lang')=='pt-BR'){
    if(laguagePtHome){
        lanaguegePtHome()
    }
    if(laguagePtLogin){
        lanaguegePtLogin()
    }
}

    function lanaguegePtHome(){

    t('.countdown--header h3'  , 'Faltam');
    t('.euro--header h3'  , 'Euro Hoje');
    t('.finance--add--header h2'  , 'Euro Hoje');
    t('.euro--view--more--title h2'  , 'Euro Hoje');
    t('.finance--add--header h2'  , 'Euro Hoje');
    t('.to--do--list--header h3'  , 'Lista de Tarefas');
    t('.temperature--header  h3'  , 'Temperatura');
    t('.finance--header  h3'  , 'Financeiro');
    t('.notice--view--more--01'  , 'Ver mais');
    t('.notice--view--more--02'  , 'Ver mais');
    t('.time--header h4'  , 'Horas');
    t('.wind--header h4'  , 'Ventos');
    t('.sky--header h4'  , 'Céu');
    t('.notice--back p'  , 'Voltar');
    t('.notice--next p'  , 'Próximo');
    t('.sky--header h4'  , 'Céu');
    t('.to--do--list--add--header h2'  , 'Adicionar Tarefa');
    t('.to--do--list--input--box span'  , 'Descrição;');
    tP('#to--do--list--titleAdd', 'Ir ao dentista...');
    t('.countdown--days span', 'dias');
    t('.countdown--time span', 'horas');
    t('.countdown--minutes span', 'min');
    t('.countdown--secontes span', 'seg');
    t('#add--to--do--btn', 'Salvar tarefa');
    t('.view--finance--falt--title', 'Falta');
    t('.view--finance--planing--title', 'Planejamento');
    t('.finance--meta h3', 'Planejamento');
    t('.finance--missing h3', 'Falta');
    t('.finance--add--inputs h2', 'Editar item');
    t('.finance--add--inputs--box span', 'Descrição:');
    tP('#finance--input--text', 'Compra de euro...');
    t('.finance--input--value', 'Valor:');
    t('.finance--add--salve', 'Salvar');
    t('.finance--add--delete', 'Deletar');
    t('.edit--user--header h2', 'Editar Conta');
    t('.edit--user--planning div span', 'Planejamento');
    t('.edit--user--travel--in div span', 'Data da Viagem');
    t('.edit--user--city div span', 'Cidade');
    t('.edit--user--edit--password div span', 'Senha');
    t('.edit--user--save', 'Salvar');
    t('.change--password--header h2', 'Trocar Senha');
    t('.change--password--wrong', 'Senha errada.');
    t('.change--password--new span', 'Nova senha:');
    t('.change--password--new--confirm span', 'Confirmar senha:');

        setTimeout(() => {

            function tT(el, trans){
                if(document.querySelector(el)){document.querySelector(el).innerHTML = trans}         
            
            }

            tT('.Buy_EUROS', 'Comprar Euros');
            tT('.Schedule_GRNB', 'Agendar GRNB');
            tT('.Go_to_the_doctor', 'Ir ao Médico');
            tT('.Go_to_the_dentist', 'Ir ao Dentista');
            tT('.Buy_travel_health_insurance', 'Comprar seguro saúde');
            tT('.Buy_english_course', 'Comprar curso de Inglês');
            tT('.Get_passport', 'Agendar GRNB');


        }, 500);


  

    
}

    function lanaguegePtLogin(){

    t('#signUpBtn', 'Cadastrar');
    t('.login--or--signUp--p', 'Entre com seus dados.');
    t('.password--title', 'Senha');
    t('.remember p', 'Lembrar');
    t('.login--enter', 'Entrar');
    t('.btn--forgot', 'Esqueceu a senha?');
    t('.form--signUp p', 'Preencha com seus dados:');
    t('.first--name--sign', 'Nome:');
    t('.password--sign', 'Senha:');
    t('.password--sign--confirm', 'Confirme a senha:');
    t('.signUp--enter', 'Cadastrar');
        
    }




if(laguagePtHome){
laguagePtHome.addEventListener('click',()=>{
    localStorage.setItem('lang','pt-BR');
    window.location.href = './';
    lanaguegePtHome()
    })
    laguageEnHome.addEventListener('click',()=>{
        localStorage.setItem('lang','en');
        window.location.href = './';
    })

}

if(laguagePtLogin){
laguagePtLogin.addEventListener('click',()=>{
    localStorage.setItem('lang','pt-BR');
    window.location.href = './';
    lanaguegePtLogin()
})
laguageEnLogin.addEventListener('click',()=>{
    localStorage.setItem('lang','en');
    window.location.href = './';
} )
}
}