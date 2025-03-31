function bytteTilForbruk(){
    document.getElementById("budsjett-h2").style.color = "grey";
    document.getElementById("forbruk-h2").style.color = "black";
    let tittelOgKnapp = `
    <input placeholder="Legg til forbruk..." id="forbruk-tittel" class="tittel">
    <button onclick="leggTilForbruk()" class="header-knapp">+</button>
    `
    let tittelOgKnappDiv = document.getElementById("tittel-og-knapp");
    tittelOgKnappDiv.innerHTML = "";
    tittelOgKnappDiv.innerHTML = tittelOgKnapp;
    document.getElementById("budsjett-container").style.display = "none"
    document.getElementById("forbruk-container").style.display = "flex"
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
        <input placeholder="Sjanger..." class="forbruk-item-tall">
        <input placeholder="Beløp..." id="forbruk-verdi-${forbrukTittelValue}" class="forbruk-item-tall">
        <button class="forbruk-item-knapp" onclick="endreForbrukLabel(${forbrukTittelValue})">Endre</button>
    </div>
    `
    container.appendChild(nyItem);
    forbrukTittel.value = "";
}

function endreForbrukLabel(){

}