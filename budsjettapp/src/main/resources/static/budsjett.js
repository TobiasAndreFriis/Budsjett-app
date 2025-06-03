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
    nyItem.innerHTML = `
    <label class="budsjett-label">${budsjettTittelValue}</label>
    <label class="budsjett-forbruk-label" id="budsjett-forbruk-label-${budsjettTittelValue.toLowerCase()}">0-0=0</label>
    <div class="budsjett-verdi">
        <input placeholder="Beløp..." id="budsjett-verdi-${budsjettTittelValue.toLowerCase()}" class="budsjett-item-tall">
        <button class="budsjett-item-knapp" onclick="endreBudsjettForbrukLabel('${budsjettTittelValue}')">Endre</button>
    </div>
    `
    container.appendChild(nyItem);
    localStorage.setItem(teller, budsjettTittelValue);
    localStorage.setItem(budsjettTittelValue.toLowerCase(), 0);
    teller++;
    budsjettTittel.value = "";
    leggTilSum();
}

function leggTilSum(){
    const wrapper = document.getElementById("budsjett-sum-wrapper");
    wrapper.style.display = "block";
    wrapper.innerHTML = "";
    const inntektValue = document.getElementById("budsjett-verdi-inntekt").value;
    let forbrukSum = 0;
    let budsjettValue;
    let budsjettSum = 0;

    for(let i = 0; i < teller; i++){
        if(localStorage.getItem(i)){
            budsjettValue = localStorage.getItem(i);
            budsjettSum += parseInt(document.getElementById(`budsjett-verdi-${budsjettValue.toLowerCase()}`).value);
            forbrukSum += parseInt(localStorage.getItem(budsjettValue.toLowerCase()));
        }
    }
    let resterende = inntektValue - forbrukSum;
    let hr = document.createElement("hr");
    hr.className = "grønn-hr"
    wrapper.append(hr);
    let sumP = document.createElement("p");
    sumP.className = "budsjett-sum";
    let sum;
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
    leggTilSum();
}