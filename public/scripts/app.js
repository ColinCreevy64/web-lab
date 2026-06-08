const kategorije = document.querySelectorAll("li");
const naslov = document.querySelector("h2");

kategorije[0].style.fontWeight = 700;
for (let i = 0; i < proizvodi.length; i++) {
        proizvodi[i].querySelector("img").src = data.categories[selected].products[i].image;
        proizvodi[i].querySelector(".proi").innerHTML = data.categories[selected].products[i].name + "<br>" + data.categories[selected].name;
}

async function brojac(index) {            //broj pojedinog proizvoda
    let p = await dohvat_proizvoda(selected);
    let kos = ucitaj_kosaru();
    let vrijednost = kos.get(p[index].name);
    proizvodi[index].querySelector(".broj").innerText = vrijednost;
    if (vrijednost > 0) proizvodi[index].querySelector(".broj").style.display = "block";
    else proizvodi[index].querySelector(".broj").style.display = "none";
}

async function promjena_kategorije(index) {
    kategorije[selected].style.fontWeight = 300;
    selected = index;
    let imena_kategorija = await dohvat_kategorija();
    naslov.innerText = imena_kategorija[selected];
    kategorije[selected].style.fontWeight = 700;
    let p = await dohvat_proizvoda(selected);
    broj_proizvoda = p.length;
    await ispis_naziva();
    for (let i = 0; i < broj_proizvoda; i++) {
        proizvodi[i].querySelector("img").src = p[i].image;
        proizvodi[i].querySelector(".proi").innerHTML = p[i].name + "<br>" + imena_kategorija[selected];
        brojac(i);
    }
}

function dodaj_kosaricu(index) {            //dodavanje u kosaru
    dodaj(data.categories[selected].products[index].name);
    brojac(index);
    zbrojac();
}

document.addEventListener("DOMContentLoaded", () => promjena_kategorije(selected));

//naslov.innerText = imena_kategorija[selected];
zbroj.style.display = "none";
ispis_kategorija();





