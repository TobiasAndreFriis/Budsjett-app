function bytteTilForbruk(){
    document.getElementById("budsjett-h2").style.color = "grey";
    document.getElementById("forbruk-h2").style.color = "black";
    let tittelOgKnapp = `
    <input placeholder="Legg til forbruk..." id="forbruk-tittel" class="tittel" onkeydown="if(event.key === 'Enter'){ leggTilForbruk(); }">
    <button onclick="leggTilForbruk()" class="header-knapp">+</button>
    `
    let tittelOgKnappDiv = document.getElementById("tittel-og-knapp");
    tittelOgKnappDiv.innerHTML = "";
    tittelOgKnappDiv.innerHTML = tittelOgKnapp;
    document.getElementById("budsjett-container").style.display = "none";
    document.getElementById("forbruk-container").style.display = "flex";
    leggeTilGrupper()
}

function leggTilForbruk(){
    const container = document.getElementById("forbruk-container");
    document.getElementById("forbruk-container-p").style.display = "none";
    const nyItem = document.createElement("div");
    nyItem.className = "forbruk-item"
    const forbrukTittel = document.getElementById("forbruk-tittel");
    const forbrukTittelValue = forbrukTittel.value;
    console.log(forbrukTittelValue)
    nyItem.innerHTML = `
    <label class="forbruk-label">${forbrukTittelValue}</label>
    <div class="forbruk-verdi">
        <select id="gruppe-valg-${forbrukTittelValue}" placeholder="Gruppe..." class="forbruk-item-gruppe" style="width: 100px;">
        <option>Gruppe...</option>
        </select>
        <input placeholder="Beløp..." id="forbruk-verdi-${forbrukTittelValue}" class="forbruk-item-tall">
        <button class="forbruk-item-knapp" onclick="endreForbrukLabel('${forbrukTittelValue}')">Endre</button>
    </div>
    `
    container.appendChild(nyItem);
    forbrukTittel.value = "";
    leggeTilGrupper()
}

function endreForbrukLabel(forbrukTittelValue){
    let gruppe = document.getElementById(`gruppe-valg-${forbrukTittelValue}`);
    if(gruppe.value === "gruppe"){return;}
    let budsjettVerdi = document.getElementById(`budsjett-verdi-${gruppe.value}`).value;
    if(budsjettVerdi === ""){budsjettVerdi = 0;}
    let sumForbruk = parseInt(localStorage.getItem(gruppe.value));
    let forbrukVerdi = document.getElementById(`forbruk-verdi-${forbrukTittelValue}`).value;
    console.log(sumForbruk, forbrukVerdi, budsjettVerdi)
    if(sumForbruk === null){sumForbruk = 0;}
    sumForbruk += parseInt(forbrukVerdi);
    localStorage.setItem(gruppe.value, sumForbruk);
    console.log(typeof(budsjettVerdi))
    let sum = parseInt(budsjettVerdi) - sumForbruk;
    document.getElementById(`budsjett-forbruk-label-${gruppe.value}`).innerText = budsjettVerdi+"-"+sumForbruk+"="+sum;
    console.log(localStorage.getItem(gruppe.value))
}

function leggeTilGrupper(){
    let selectItems = document.querySelectorAll(".forbruk-item-gruppe");

    selectItems.forEach(select => {
        select.innerHTML = "";
        optionBlank = document.createElement("option");
        optionBlank.textContent = "Gruppe...";
        optionBlank.value = "gruppe"
        select.appendChild(optionBlank);
        for(let i = 0; i < localStorage.length; i++){
            if(localStorage.getItem(i) != null){
                let options = document.createElement("option")
                options.value = localStorage.getItem(i).toLocaleLowerCase();
                options.textContent = localStorage.getItem(i);
                select.appendChild(options);
            }
        }

    })
}