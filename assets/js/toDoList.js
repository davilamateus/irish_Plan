let toDoListItens = document.querySelector(".to--do--list--itens");
let toDoListPercentText =  document.querySelector(".to--do--list--percent--text");
let toDoListPercentRow =  document.querySelector(".to--do--list--percent--row");
let toDoListTitle =  document.querySelector('.to--do--list--title button');
let toDoListAdd =  document.querySelector('.to--do--list--add');
let toDoListAddBg = document.querySelector('.to--do--list--add--bg')
let toDoListAddClose = document.querySelector('.to--do-list--add--close')
let toDoListAddBtn = document.querySelector('#add--to--do--btn');
let toDoListTitleAdd = document.querySelector('#to--do--list--titleAdd').value;

function toDoList(){
var output_to_do_lis = ''
    const getToDoList = async () => {
        const res = await fetch("api/toDoList.php?action=get", {
            method: "POST",
            body: JSON.stringify({ "id_user": userOptions.id_user}),
            headers: {
                "Content-Type": "application/json"
            }
        });
         output = await res.json();
         output_to_do_list = output
    toDoListItens.innerHTML = "";
    output_to_do_list.map((item)=>{
        var id_item = item.id;
        var id_status = item.status;
        let toDolistDiv = document.createElement("div");
        if(id_status == 'comply'){toDolistDiv.classList.add(`comply`);}
        else{toDolistDiv.classList.add(`no-comply`);}
        toDolistDiv.setAttribute("id", `${id_item}`);
        toDolistDiv.addEventListener("click", async () => {
            var statusToDoList = '';
            if(item.status == 'comply'){statusToDoList = 'no-comply'}
            else{ statusToDoList = 'comply'};
            const res = await fetch("api/toDoList.php?action=update", {
                method: "POST",
                body: JSON.stringify({
                    "id": item.id,
                    "status": statusToDoList
                })
            });

 
            toDolistDiv.setAttribute('status', `${id_status}`);

            getToDoList()
            translage()



    

                });

                toDoListItens.appendChild(toDolistDiv);
        let toDoListTitle = document.createElement("p");
        toDoListTitle.setAttribute('class', `${(item.title).replace(/\s+/g, '_')}`)
        toDoListTitle.innerHTML = `${item.title}`;
        toDolistDiv.appendChild(toDoListTitle);
        let trashSvg = document.createElement("span");
        trashSvg.innerHTML = `<i class="fa-light fa-trash-list"></i>`;
        trashSvg.addEventListener("click",  async () => {
                const res = await fetch("api/toDoList.php?action=delete", {
                    method: "POST",
                    body: JSON.stringify({ "id": item.id}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            getToDoList();
            translage()

    
            });
        toDolistDiv.appendChild(trashSvg);    

        });


    let complyList = 0;
    output_to_do_list.map((item) => { if(item.status == "comply"){ return complyList++}});
    let percentList = ((complyList/output_to_do_list.length) *100).toFixed();
    toDoListPercentText.innerHTML = `${complyList}/${output_to_do_list.length }`;
    toDoListPercentRow.style.width = `${percentList}%`;



};

getToDoList();

// insert To do list
toDoListTitle.addEventListener('click',()=>{
    toDoListAdd.style.display = 'grid';     
    setTimeout(() => {
        toDoListAdd.style.opacity = '1';    
    }, 1);
})

toDoListAddBg.addEventListener('click',()=>{
    toDoListAdd.style.opacity = '0';    
    setTimeout(() => {   
        toDoListAdd.style.display = 'none';
    }, 500);
})

toDoListAddClose.addEventListener('click',()=>{
    toDoListAdd.style.opacity = '0';    
    setTimeout(() => {   
        toDoListAdd.style.display = 'none';
    }, 500);
})



toDoListAddBtn.addEventListener("click", async () => {
    let toDoListTitleAdd = document.querySelector('#to--do--list--titleAdd').value;
        const res = await fetch("api/toDoList.php?action=add", {
            method: "POST",
            body: JSON.stringify({ "id_user": userOptions.id_user, "title": toDoListTitleAdd }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const output = await res.json();
        getToDoList()
        lanaguegePtHome()
});

}

