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
    leggeTilGrupper();
    settGruppeValue();
    for (let i = 0; i < localStorage.length; i++) {
        const nøkkel = localStorage.key(i);
        const verdi = localStorage.getItem(nøkkel);
        console.log(`${nøkkel}: ${verdi}`);
    }
}

function leggTilForbruk(){
    const container = document.getElementById("forbruk-container");
    document.getElementById("forbruk-container-p").style.display = "none";
    const nyItem = document.createElement("div");
    nyItem.className = "forbruk-item";
    const forbrukTittel = document.getElementById("forbruk-tittel");
    const forbrukTittelValue = forbrukTittel.value;
    nyItem.id = `forbruk-item-${forbrukTittelValue}`;
    nyItem.innerHTML = `
    <label class="forbruk-label">${forbrukTittelValue}</label>
    <div class="forbruk-verdi">
        <select id="gruppe-valg-${forbrukTittelValue}" onchange="lagreValgtGruppe('${forbrukTittelValue}')" placeholder="Gruppe..." class="forbruk-item-gruppe" style="width: 100px;">
        <option>Gruppe...</option>
        </select>
        <input placeholder="Beløp..." id="forbruk-verdi-${forbrukTittelValue}" class="forbruk-item-tall">
        <button class="forbruk-item-knapp" onclick="endreForbrukLabel('${forbrukTittelValue}')">Endre</button>
    </div>
    <ul id="kontekstmeny-${forbrukTittelValue}" class="kontekstmeny"><li onclick="fjernForbrukItem('forbruk-item-${forbrukTittelValue}')">Fjern</li></ul>
    `
    container.appendChild(nyItem);
    forbrukTittel.value = "";
    leggeTilGrupper();
    lagreValgtGruppe(forbrukTittelValue);
    settGruppeValue();
    const itemDelete = document.getElementById(`forbruk-item-${forbrukTittelValue}`);
    const itemDeleteMeny = document.getElementById(`kontekstmeny-${forbrukTittelValue}`);
    itemDelete.addEventListener("contextmenu", function(e) {
        e.preventDefault(); // Hindre standardmenyen
        itemDeleteMeny.style.display = "block";
        itemDeleteMeny.style.left = `${e.clientX}px`;
        itemDeleteMeny.style.top = `${e.clientY}px`;

    });
    document.addEventListener("click", function() {
        itemDeleteMeny.style.display = "none";
    });
}

function endreForbrukLabel(forbrukTittelValue){
    let gruppe = document.getElementById(`gruppe-valg-${forbrukTittelValue}`);
    if(gruppe.value === "gruppe"){return;}
    let budsjettVerdi = document.getElementById(`budsjett-verdi-${gruppe.value}`).value;
    if(budsjettVerdi === ""){budsjettVerdi = 0;}
    let sumForbruk = parseInt(localStorage.getItem(gruppe.value));
    let forbrukVerdi = document.getElementById(`forbruk-verdi-${forbrukTittelValue}`).value;
    localStorage.setItem(`forbruk-item-${forbrukTittelValue}-beløp`, forbrukVerdi)
    localStorage.setItem(`forbruk-item-${forbrukTittelValue}-gruppe`, gruppe.value)
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
    let antallForbruk = 0;
    selectItems.forEach(select => {
        antallForbruk++;
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
    localStorage.setItem("antallForbruk", antallForbruk)
}

function lagreValgtGruppe(forbrukTittelValue){
    let selectIdString = `gruppe-valg-${forbrukTittelValue}`;
    let select = document.getElementById(selectIdString);
    let value = select.value;
    localStorage.setItem(selectIdString, value)
}

function settGruppeValue(){
    let selectItems = document.querySelectorAll(".forbruk-item-gruppe");

    selectItems.forEach(select => {
        let selectItem = document.getElementById(select.id);
        let value = localStorage.getItem(select.id);
        selectItem.value = value;
        
    })

}

function fjernForbrukItem(itemId){
    let item = document.getElementById(itemId);
    let itemBeløp = localStorage.getItem(`${itemId}-beløp`);
    let itemGruppe = localStorage.getItem(`${itemId}-gruppe`);
    let gruppeForbrukSum = localStorage.getItem(itemGruppe);
    gruppeForbrukSum -= itemBeløp;
    localStorage.setItem(itemGruppe, gruppeForbrukSum)
    let budsjettVerdi = document.getElementById(`budsjett-verdi-${itemGruppe}`).value;
    let sum = budsjettVerdi - gruppeForbrukSum;
    document.getElementById(`budsjett-forbruk-label-${itemGruppe}`).innerText = budsjettVerdi+"-"+gruppeForbrukSum+"="+sum;
    item.remove();
    bytteTilForbruk();
}