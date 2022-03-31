function finance(){

    let financeInputText  = document.querySelector('#finance--input--text');
    let financeInputValue = document.querySelector('#finance--input--value');
    let financeValueMeta = document.querySelector('.finance--meta--value');
    let financeEditAddContainer =  document.querySelector('.finance--edit--add--container');
    let financeAddContainer = document.querySelector('.finance--add--container');
    let financeEditOrAddTitle = document.querySelector('.finance--add--inputs h2');
    let financeBtnsAdd = document.querySelector('.finance--add--btns');
    let financeBtnsEdit = document.querySelector('.finance--edit--btns');
    let financeBtnSave = document.querySelector('.finance--add--salve');
    let financeBtnDelete = document.querySelector('.finance--add--delete');
    let financeList = document.querySelector('.finance--list');
    let valueTotal = 0;
    let percentNumber = document.querySelector('.porcentNumber');
    let viewFinanceMeta = document.querySelector('.view--finance--meta');
    let viewFinanceMissing = document.querySelector('.view--finance--missing');
    let financeMissingValue = document.querySelector('.finance--missing--value');
    let viewFinanceTotal =  document.querySelector('.view--finance--total span');
    let financeTotalValue = document.querySelector('.finance--total--value');
    let creditBtn = document.querySelector('.finance--add--credit');
    let financeAddBtn = document.querySelector('.add--finance');
    let financeAdd = document.querySelector('.finance--add');
    let financeAddClose = document.querySelector('.finance--add--close');
    let financeAddClose2 = document.querySelector('.finance--add--close2');
    let financeAddBg = document.querySelector('.finance--add--bg');
    let userFinance = [];
    let btnAddNewFinance = document.querySelector('.btn--add--new--finance');
    let financeAddInputsH2 = document.querySelector('.finance--add--inputs h2')
    let userGoals = userOptions.finance_goals;



    financeValueMeta.innerHTML = `$${userGoals}`;
    const getFinance = async () => {
            financeList.innerHTML = ''
            var res = await fetch(`api/finance.php?action=get&id_user=${userOptions.id_user}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
            userFinance = await res.json();
            
            if(userFinance == false){userFinance = [{"value":0, "date_of_create":'', "description": '.'}]} 
            userFinance.map((item)=>{ 
                userFinance = [];
                valueTotal = valueTotal+ parseFloat(parseFloat(item.value).toFixed(2))
                var financeDiv = document.createElement('div');
                financeDiv.classList.add('finance--div');
                var financeDebitOrCredit = document.createElement('div')
                if(parseInt(item.value)>0){financeDebitOrCredit.classList.add('finance--debit--circle')} 
                else{financeDebitOrCredit.classList.add('finance--credit--circle')}
                var financeValueDate = document.createElement('div');
                financeValueDate.classList.add('finance--value--date');
                var financeValue = document.createElement('h3');
                financeValue.innerHTML = `$${item.value}`;
                var financeDate = document.createElement('p');
                financeDate.innerHTML = item.date_of_create;
                var financeOption = document.createElement('img');
                financeOption.setAttribute('id', item.id);
                financeOption.setAttribute('src','assets/img/optionsvg.svg');
                var itemId = item.id;
                financeOption.addEventListener('click',  () => {
                    var itemid = itemId;
                    financeBtnSave.setAttribute('id', itemid);
                    financeBtnDelete.setAttribute('id', itemid);
                    financeEditAddContainer.style.display = 'grid';
                    financeAddContainer.style.display = 'none';
                    financeInputText.value = item.description;
                    financeInputValue.value = item.value;
                    if(localStorage.getItem('lang')=='pt-BR'){
                        financeEditOrAddTitle.innerHTML = "Editar Financeiro";

                    }else{financeEditOrAddTitle.innerHTML = "Edit Finance";
                }
                    financeBtnsAdd.style.display = 'none';
                    financeBtnsEdit.style.display = 'flex';
                        });
                    
                    var financeDescription = document.createElement('span');
                    financeDescription.innerHTML = item.description;
                    financeList.appendChild(financeDiv);
                    financeDiv.appendChild(financeDebitOrCredit);
                    financeDiv.appendChild(financeValueDate);
                    financeDiv.appendChild(financeDescription);
                    financeDiv.appendChild(financeOption);
                    financeValueDate.appendChild(financeValue);
                    financeValueDate.appendChild(financeDate);
                });
                
            setTimeout(() => {
                var falt = userGoals - valueTotal;
                var porcent =parseInt((valueTotal*100)/userGoals);
                percentNumber.innerHTML = `${porcent}%`;
                viewFinanceMeta.innerHTML = `$${userGoals}`;
                if(falt<0){falt = 0};
                viewFinanceMissing.innerHTML = `-$${falt}`;
                financeMissingValue.innerHTML = `-$${falt}`;
                viewFinanceTotal.innerHTML = `$${valueTotal}`;
                financeTotalValue.innerHTML = `$${valueTotal}`;
        
                var ctx = document.getElementById("financeChart").getContext("2d");
                var chartStatus = Chart.getChart("financeChart"); 
                if (chartStatus != undefined) {chartStatus.destroy();}
                    
                var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
                gradientStroke.addColorStop(0, "#34EFAE");
                gradientStroke.addColorStop(1, "#34fffe2d");
                var myChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: ['Falt', 'Total'
                        ],
                            datasets: [{
                                backgroundColor:[
                                    '#F5F4F4',
                                    '#34EFAE'],
                                data: [(falt) , valueTotal],
                                borderRadius:[0,12],
                                borderWidth:10,
                                borderColor: ['#34efae00', '#34EFAE'],
                                borderAlign:'center',
                                spacing:-2,
                                shadowColor: gradientStroke
                            }]
                        },
                        options: {
                            responsive: true,
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
                    });
                }, 100);
                
            }
            getFinance();


        creditBtn.addEventListener("click", async () => {
            
            valueTotal = 0;
            financeEditAddContainer.style.display = 'none';
            financeAddContainer.style.display = 'grid';
            const res = await fetch("api/finance.php?action=add", {
                method: "POST",
                body: JSON.stringify({ "id_user": userOptions.id_user, "description": financeInputText.value, "value": 1*(financeInputValue.value) }),
                headers: {
                    "Content-Type": "application/json"
                }
            });        
                getFinance();         
    });

    // finance add open
    financeAddBtn.addEventListener('click',()=>{

        financeEditAddContainer.style.display = 'none';
        financeAddContainer.style.display = 'grid';
        financeAdd.style.display = 'flex';
        setTimeout(() => {
            financeAdd.style.opacity = '1';
        }, 10);
    })


    // finance close
    financeAddBg.addEventListener('click', close);
    financeAddClose2.addEventListener('click', close);
    financeAddClose.addEventListener('click',close);

    function close(){
        financeEditAddContainer.style.display= 'none';
        financeAdd.style.opacity = '0';
        setTimeout(() => {
            financeAdd.style.display = 'none';
        }, 1000);   
    }

    btnAddNewFinance.addEventListener('click', open);
    function open(){
        financeEditAddContainer.style.display = 'grid';
            financeAddContainer.style.display = 'none';
            financeAddInputsH2.innerHTML = "Add finance";
            financeInputText.value = '';
            financeInputValue.value = '';
            financeBtnsEdit.style.display = 'none';
            financeBtnsAdd.style.display = 'flex';
    
    }

    financeBtnSave.addEventListener('click',async () => {
        let financeEditAddContainer = document.querySelector('.finance--edit--add--container');

        financeEditAddContainer.style.display = 'none';
        financeAddContainer.style.display = 'grid';
        
        var res = await fetch("api/finance.php?action=update", {
            method: "POST",
            body: JSON.stringify({ "id": financeBtnSave.id, "description": financeInputText.value, "value": financeInputValue.value }),
            headers: {
                "Content-Type": "application/json"
            }
        });  
        financeList.innerHTML = '';
        valueTotal = 0;
        getFinance()
            })

        financeBtnDelete.addEventListener('click',async () => { 
            userFinance = '';
            financeEditAddContainer.style.display = 'none';
            financeAddContainer.style.display = 'grid';
            const res = await fetch(`api/finance.php?action=delete&id=${financeBtnDelete.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            financeList.innerHTML = '';
            valueTotal = 0;
            getFinance()

        });

    }