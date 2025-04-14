let teller = 0;

function bytteTilBudsjett(){
    document.getElementById("budsjett-h2").style.color = "black";
    document.getElementById("forbruk-h2").style.color = "grey";
    let tittelOgKnapp = `
    <input placeholder="Legg til budsjett..." id="budsjett-tittel" class="tittel">
    <button onclick="leggTilBudsjett()" class="header-knapp">+</button>
    `
    let tittelOgKnappDiv = document.getElementById("tittel-og-knapp");
    tittelOgKnappDiv.innerHTML = "";
    tittelOgKnappDiv.innerHTML = tittelOgKnapp;   
    document.getElementById("budsjett-container").style.display = "flex"
    document.getElementById("forbruk-container").style.display = "none" 
}

function leggTilBudsjett(){
    const container = document.getElementById("budsjett-container");
    document.getElementById("budsjett-container-p").style.display = "none";
    const nyItem = document.createElement("div");
    nyItem.className = "budsjett-item"
    const budsjettTittel = document.getElementById("budsjett-tittel");
    const budsjettTittelValue = budsjettTittel.value;
    console.log(budsjettTittelValue)
    nyItem.innerHTML = `
    <label class="budsjett-label">${budsjettTittelValue}</label>
    <label class="budsjett-forbruk-label" id="budsjett-forbruk-label-${budsjettTittelValue}">0-0=0</label>
    <div class="budsjett-verdi">
        <input placeholder="Beløp..." id="budsjett-verdi-${budsjettTittelValue}" class="budsjett-item-tall">
        <button class="budsjett-item-knapp" onclick="endreBudsjettForbrukLabel('${budsjettTittelValue}')">Endre</button>
    </div>
    `
    container.appendChild(nyItem);
    if(teller === 0){localStorage.clear()}
    localStorage.setItem(teller, budsjettTittelValue);
    localStorage.setItem(budsjettTittelValue, 0);
    teller++;
    budsjettTittel.value = "";
}

function endreBudsjettForbrukLabel(budsjettTittelValue){
    let budsjettVerdi = document.getElementById(`budsjett-verdi-${budsjettTittelValue}`).value;
    let sumForbruk = localStorage.getItem(budsjettTittelValue);
    let sum = budsjettVerdi - sumForbruk;
    document.getElementById(`budsjett-forbruk-label-${budsjettTittelValue}`).innerText = budsjettVerdi+"-"+sumForbruk+"="+sum;
}