//__BYTT_TIL_FORBRUK__//
function bytteTilForbruk(){
    document.getElementById("budsjett-h2").style.color = "grey";
    document.getElementById("forbruk-h2").style.color = "black";

    //HTML kode for å legge til forbruk
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


//__LEGG_TIL_FORBRUK_ELEMENT__//
function leggTilForbruk(){
    const container = document.getElementById("forbruk-container");
    document.getElementById("forbruk-container-p").style.display = "none";
    const nyItem = document.createElement("div");
    nyItem.className = "forbruk-item";
    const forbrukTittel = document.getElementById("forbruk-tittel");
    const forbrukTittelValue = forbrukTittel.value;
    nyItem.id = `forbruk-item-${forbrukTittelValue}`;

    //HTML kode for forbruk item
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

    container.appendChild(nyItem); //Legger forbruk item fysisk på nettsiden
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

//__ENDRE_LABEL_FORBRUK__//
function endreForbrukLabel(forbrukTittelValue){
    let gruppe = document.getElementById(`gruppe-valg-${forbrukTittelValue}`);
    if(gruppe.value === "gruppe"){return;}
    let budsjettVerdi = document.getElementById(`budsjett-verdi-${gruppe.value}`).value;
    if(budsjettVerdi === ""){budsjettVerdi = 0;}
    let sumForbruk = parseInt(localStorage.getItem(gruppe.value));
    let forbrukVerdi = document.getElementById(`forbruk-verdi-${forbrukTittelValue}`).value;
    if(forbrukVerdi === ""){forbrukVerdi = 0;}
    localStorage.setItem(`forbruk-item-${forbrukTittelValue}-beløp`, forbrukVerdi)
    localStorage.setItem(`forbruk-item-${forbrukTittelValue}-gruppe`, gruppe.value)
    console.log(sumForbruk, forbrukVerdi, budsjettVerdi)
    if(sumForbruk === null){sumForbruk = 0;}
    sumForbruk += parseInt(forbrukVerdi);
    localStorage.setItem(gruppe.value, sumForbruk);
    let sum = parseInt(budsjettVerdi) - sumForbruk;
    document.getElementById(`budsjett-forbruk-label-${gruppe.value}`).innerText = budsjettVerdi+"-"+sumForbruk+"="+sum;
    console.log(localStorage.getItem(gruppe.value))
}

//__LEGGE_TIL_GRUPPER_I_LISTE__//
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

//__LAGRE_VALGT_GRUPPE__//
function lagreValgtGruppe(forbrukTittelValue){
    let selectIdString = `gruppe-valg-${forbrukTittelValue}`;
    let select = document.getElementById(selectIdString);
    let value = select.value;
    localStorage.setItem(selectIdString, value)
}

//__SETT_VERDI_GRUPPE_TIL_ITEM__//
function settGruppeValue(){
    let selectItems = document.querySelectorAll(".forbruk-item-gruppe");

    selectItems.forEach(select => {
        let selectItem = document.getElementById(select.id);
        let value = localStorage.getItem(select.id);
        selectItem.value = value;
        
    })

}

//__FJERN_FORBRUK_ITEM__//
function fjernForbrukItem(itemId){
    let item = document.getElementById(itemId);
    let itemBeløp = localStorage.getItem(`${itemId}-beløp`); //Hente valgt beløp til item
    let itemGruppe = localStorage.getItem(`${itemId}-gruppe`); //Hente valgt gruppe til item
    let gruppeForbrukSum = localStorage.getItem(itemGruppe); //Hente hele summen til forbruk til den valgte gruppen
    gruppeForbrukSum -= itemBeløp;
    localStorage.setItem(itemGruppe, gruppeForbrukSum); //Ny forbruk sum til gruppe
    let budsjettVerdi = document.getElementById(`budsjett-verdi-${itemGruppe}`).value;
    if(budsjettVerdi === ""){budsjettVerdi = 0;}
    let sum = budsjettVerdi - gruppeForbrukSum;
    document.getElementById(`budsjett-forbruk-label-${itemGruppe}`).innerText = budsjettVerdi+"-"+gruppeForbrukSum+"="+sum;
    localStorage.removeItem(`${itemId}-beløp`);
    localStorage.removeItem(`${itemId}-gruppe`);
    item.remove();
    bytteTilForbruk();
}