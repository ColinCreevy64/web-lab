const kategorije = document.querySelectorAll("li");
const naslov = document.querySelector("h2");
let selected = 0;

kategorije[0].style.fontWeight = 700;
for (let i = 0; i < proizvodi.length; i++) {
        proizvodi[i].querySelector("img").src = data.categories[selected].products[i].image;
        proizvodi[i].querySelector(".proi").innerHTML = data.categories[selected].products[i].name + "<br>" + data.categories[selected].name;
}

function brojac(index) {
    let kos = ucitaj_kosaru();
    let vrijednost = kos.get(data.categories[selected].products[index].name);
    proizvodi[index].querySelector(".broj").innerText = vrijednost;
    if (vrijednost > 0) proizvodi[index].querySelector(".broj").style.display = "block";
    else proizvodi[index].querySelector(".broj").style.display = "none";
}

function promjena_kategorije(index) {
    kategorije[selected].style.fontWeight = 300;
    selected = index;
    naslov.innerText = data.categories[selected].name;
    kategorije[selected].style.fontWeight = 700;
    for (let i = 0; i < proizvodi.length; i++) {
        proizvodi[i].querySelector("img").src = data.categories[selected].products[i].image;
        proizvodi[i].querySelector(".proi").innerHTML = data.categories[selected].products[i].name + "<br>" + data.categories[selected].name;
        brojac(i);
    }
}

function dodaj_kosaricu(index) {
    dodaj(data.categories[selected].products[index].name);
    brojac(index);
    zbrojac();
}

naslov.innerText = data.categories[selected].name;
zbroj.style.display = "none";

for (let i = 0; i < kategorije.length; i++) {
    kategorije[i].innerText = data.categories[i].name;
    kategorije[i].addEventListener("click", () => promjena_kategorije(i));
}

for (let i = 0; i < proizvodi.length; i++) {
    let kolica = document.createElement("p");
    kolica.innerText = "🛒";
    kolica.style.display = "none";
    kolica.setAttribute("class", "kolica");
    kolica.addEventListener("click", () => dodaj_kosaricu(i));
    proizvodi[i].querySelector("div").append(kolica);
    proizvodi[i].querySelector("img").addEventListener("mouseenter", () => kolica.style.display = "block");
    proizvodi[i].querySelector("img").addEventListener("mouseleave", () => kolica.style.display = "none");

    let broj = document.createElement("p");
    let kos = ucitaj_kosaru();
    broj.innerText = kos.get(data.categories[selected].products[i].name);
    broj.style.display = "none";
    broj.setAttribute("class", "broj");
    proizvodi[i].querySelector("div").append(broj);
}



