let teller = 0;
if(teller === 0){localStorage.clear()}
function bytteTilBudsjett(){
    document.getElementById("budsjett-h2").style.color = "black";
    document.getElementById("forbruk-h2").style.color = "grey";
    let tittelOgKnapp = `
    <input placeholder="Legg til budsjett..." id="budsjett-tittel" class="tittel" onkeydown="if(event.key === 'Enter'){ leggTilBudsjett(); }">
    <button onclick="leggTilBudsjett()" class="header-knapp">+</button>
    `
    let tittelOgKnappDiv = document.getElementById("tittel-og-knapp");
    tittelOgKnappDiv.innerHTML = "";
    tittelOgKnappDiv.innerHTML = tittelOgKnapp;   

    document.getElementById("budsjett-container").style.display = "flex"
    document.getElementById("forbruk-container").style.display = "none" 

    if(teller > 0){ //Oppdatere sum delen hvis det er gjort en endring i forbruk
        leggTilSum();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("budsjett-tittel");
    if (input) {
        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                leggTilBudsjett();
            }
        });
    }
});

function leggTilBudsjett(){
    const container = document.getElementById("budsjett-item-container");
    document.getElementById("budsjett-container-p").style.display = "none";
    const nyItem = document.createElement("div");
    nyItem.className = "budsjett-item"
    const budsjettTittel = document.getElementById("budsjett-tittel");
    const budsjettTittelValue = budsjettTittel.value;
    nyItem.id = `budsjett-item-${budsjettTittelValue}`
    nyItem.innerHTML = `
    <label class="budsjett-label">${budsjettTittelValue}</label>
    <label class="budsjett-forbruk-label" id="budsjett-forbruk-label-${budsjettTittelValue.toLowerCase()}">0-0=0</label>
    <div class="budsjett-verdi">
        <input placeholder="Beløp..." id="budsjett-verdi-${budsjettTittelValue.toLowerCase()}" type="number" class="budsjett-item-tall" onkeydown="if(event.key === 'Enter'){ endreBudsjettForbrukLabel('${budsjettTittelValue}'); }">
        <button class="budsjett-item-knapp" onclick="endreBudsjettForbrukLabel('${budsjettTittelValue}')">Endre</button>
    </div>
    <ul id="kontekstmeny-${budsjettTittelValue}" class="kontekstmeny"><li onclick="fjernBudsjettItem('${budsjettTittelValue}')">Fjern</li></ul>
    `
    container.appendChild(nyItem);
    localStorage.setItem(teller, budsjettTittelValue);
    localStorage.setItem(budsjettTittelValue.toLowerCase(), 0);
    teller++;
    budsjettTittel.value = "";
    leggTilSum();

    //Få opp fjern knapp når item høyre klikkes
    const itemDelete = document.getElementById(`budsjett-item-${budsjettTittelValue}`);
    const itemDeleteMeny = document.getElementById(`kontekstmeny-${budsjettTittelValue}`);
    itemDelete.addEventListener("contextmenu", function(e) {
        e.preventDefault(); // Hindre standardmenyen
        itemDeleteMeny.style.display = "block";
        itemDeleteMeny.style.left = `${e.clientX}px`;
        itemDeleteMeny.style.top = `${e.clientY}px`;

    });
}

function leggTilSum(){
    const wrapper = document.getElementById("budsjett-sum-wrapper");
    wrapper.style.display = "block"; //Gjør sum delen synlig
    wrapper.innerHTML = ""; //Resetter sum hver gang så det ikke blir lagt til uendelig mange under hverandre
    let inntektValue = parseInt(document.getElementById("budsjett-verdi-inntekt").value);
    if(Number.isNaN(inntektValue)){inntektValue = 0;} //For å ikke få NaN verdi i summen
    let forbrukSum = 0;
    let budsjettValue;
    let budsjettSum = 0;

    for(let i = 0; i < teller; i++){ //Plusser sammen alle budsjett og forbruk verdiene
        if(localStorage.getItem(i)){
            budsjettValue = localStorage.getItem(i);
            budsjettSum += parseInt(localStorage.getItem(`budsjett-verdi-${budsjettValue.toLowerCase()}`));
            if(Number.isNaN(budsjettSum)){budsjettSum = 0;}
            forbrukSum += parseInt(localStorage.getItem(budsjettValue.toLowerCase()));
        }
    }
    let resterende = inntektValue - forbrukSum;
    let hr = document.createElement("hr");
    hr.className = "grønn-hr"
    wrapper.append(hr);
    let sumP = document.createElement("p");
    sumP.className = "budsjett-sum";
    sumP.innerText = `
        Total inntekt: ${inntektValue}
        \nTotal budsjett: ${budsjettSum}
        \nTotal forbruk: ${forbrukSum}
        \n\nResterende beløp: ${resterende} 
    `
    wrapper.append(sumP);

    //Bla gjennom alle budsjett verdier med localstorgae? For hver iterasjon skal man få verdi for både forbruk-sum og budsjett item
    //Plassere sum diven under alle budsjett items ved appende sum hver gang det legges til et nytt item.
}

function endreBudsjettForbrukLabel(budsjettTittelValue){
    let budsjettVerdi = document.getElementById(`budsjett-verdi-${budsjettTittelValue.toLowerCase()}`).value;
    let sumForbruk = localStorage.getItem(budsjettTittelValue.toLowerCase());
    let sum = budsjettVerdi - sumForbruk;
    document.getElementById(`budsjett-forbruk-label-${budsjettTittelValue.toLowerCase()}`).innerText = budsjettVerdi+"-"+sumForbruk+"="+sum;
    localStorage.setItem(`budsjett-verdi-${budsjettTittelValue.toLowerCase()}`, budsjettVerdi)
    leggTilSum();
}

function fjernBudsjettItem(budsjettTittelValue){
    console.log(budsjettTittelValue)
    let item = document.getElementById(`budsjett-item-${budsjettTittelValue}`);
    let itemBeløp = localStorage.getItem(`budsjett-verdi-${budsjettTittelValue.toLowerCase()}`);
    console.log(itemBeløp)

    //Fjerne localstorages til budsjettet, aka sum for forbrukene til gruppen
        //Må også fjerne budsjett fra localstorage som bruker teller. Hvis ikke lagres den flere ganger, og sum bli dobbel
    //Resett gruppe til alle forbruk som bruker budsjettet
        //Bla gjennom alle localstorages, hvis det er en som inneholder denne gruppen i små bokstaver så endre den til "gruppe"


    localStorage.removeItem(`budsjett-verdi-${budsjettTittelValue.toLowerCase()}`)
    item.remove();
    bytteTilBudsjett();
}