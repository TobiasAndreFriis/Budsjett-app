function endreArkNavnBudsjett(){
    const tittel = document.getElementById("ark-tittel-budsjett");
    let ark = document.getElementById("ark-1");
    ark.innerText = "• "+tittel.value;
}

function endreArkNavnForbruk(){
    const tittel = document.getElementById("ark-tittel-forbruk");
    let ark = document.getElementById("ark-1");
    ark.innerText = "• "+tittel.value;
}