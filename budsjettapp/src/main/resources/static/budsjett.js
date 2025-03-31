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
    <label class="budsjett-forbruk-label" id="budsjett-forbruk-label-${budsjettTittelValue}">300/1000</label>
    <div class="budsjett-verdi">
        <input placeholder="Tall..." id="budsjett-verdi-${budsjettTittelValue}" class="budsjett-item-tall">
        <button class="budsjett-item-knapp" onclick="endreBudsjettForbrukLabel(${budsjettTittelValue})">Endre</button>
    </div>
    `
    container.appendChild(nyItem);
    budsjettTittel.value = "";
}

function endreBudsjettForbrukLabel(budsjettTittelValue){
    
    let budsjettVerdi = document.getElementById(`budsjett-verdi-${budsjettTittelValue}`).value;
    document.getElementById(`budsjett-forbruk-label-${budsjettTittelValue}`).innerText = "0/"+budsjettVerdi;
}