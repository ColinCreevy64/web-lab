const kategorije = document.querySelectorAll("li");

async function brojac(index) {            //broj pojedinog proizvoda
    let p = await dohvat_proizvoda(selected);
    let kos = await dohvat_kosare();
    let kat = await dohvat_kategorija();

    let vrijednost = kos[selected * p.length + index];
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
        await brojac(i);
    }
}

async function dodaj_kosaricu(index) {            //dodavanje u kosaru
    await dodaj_home(index);
    await brojac(index);
    await zbrojac();
}

async function load_header() {
    let res = await fetch("/views/partials/header");
    let html = await res.text();
    document.querySelector("header").innerHTML = html;
}

//document.addEventListener("DOMContentLoaded", () => promjena_kategorije(selected));

window.addEventListener("pageshow", () => promjena_kategorije(selected));


ispis_kategorija();





