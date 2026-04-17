let selected = 0;
let nazivi = document.querySelector(".nazivi");
let kolicine = document.querySelector(".kolicine");
let proizvodi = document.querySelectorAll(".proizvod");
let broj_proizvoda = data.categories[selected].products.length;
const zbroj = document.querySelector(".zbroj");

function zbrojac() {
    if (zbroj) {
        let kos = ucitaj_kosaru();
        if (kos.size === 0) {
            zbroj.innerHTML = "0";
            zbroj.style.display = "none";
        }
        else {
            zbroj.innerHTML = [...kos.values()].map(k => Number(k)).reduce((sum, value) => sum + value, 0);
            zbroj.style.display = "block";
        }
    }
}

function ucitaj_kosaru() {
    let k = JSON.parse(localStorage.getItem("kosara"));
    if (!Array.isArray(k)) return new Map();

    return new Map(k);
}

function dodaj(p) {
    let kos = ucitaj_kosaru();
    if (kos.has(p)) {
        kos.set(p, kos.get(p) + 1);
    }
    else {
        kos.set(p, 1);
    }
    localStorage.setItem("kosara", JSON.stringify([...kos]));
}

function oduzeti(ime) {
    let kos = ucitaj_kosaru();
    let vrijednost = kos.get(ime);
    if (--vrijednost <= 0) kos.delete(ime);
    else kos.set(ime, vrijednost);

    localStorage.setItem("kosara", JSON.stringify([...kos]));
    ispis_naziva();
}

function dodati(ime) {
    let kos = ucitaj_kosaru();
    let vrijednost = kos.get(ime);
    kos.set(ime, ++vrijednost);

    localStorage.setItem("kosara", JSON.stringify([...kos]));
    ispis_naziva();
}

function ispis_naziva() {
    let kos = ucitaj_kosaru();
    proizvodi = document.querySelectorAll(".proizvod");

    console.log(kos);
    if (document.querySelector(".moto")) {
        let rod = document.querySelector(".proizvodi");
        rod.innerText = "";
        broj_proizvoda = data.categories[selected].products.length;
        console.log(broj_proizvoda);
        for (let i = 0; i < broj_proizvoda; i++) {
            let j = document.createElement("div");
            j.className = "proizvod";
            let k = document.createElement("div");
            k.className = "slika";
            let l = document.createElement("img");
            l.alt = "Slika";
            k.append(l);
            let m = document.createElement("p");
            m.className = "proi";
            m.innerHTML = "Proizvod x<br>Karegorije y";
            rod.append(j);
            j.append(k);
            k.append(l);
            j.append(m);

            let kolica = document.createElement("p");
            kolica.innerText = "🛒";
            kolica.style.display = "none";
            kolica.setAttribute("class", "kolica");
            kolica.addEventListener("click", () => dodaj_kosaricu(i));
            j.querySelector("div").append(kolica);
            j.querySelector("img").addEventListener("mouseenter", () => kolica.style.display = "block");
            j.querySelector("img").addEventListener("mouseleave", () => kolica.style.display = "none");

            let broj = document.createElement("p");
            let kos = ucitaj_kosaru();
            broj.innerText = kos.get(data.categories[selected].products[i].name);
            broj.style.display = "none";
            broj.setAttribute("class", "broj");
            j.querySelector("div").append(broj);

            if (Number(kos.get(data.categories[selected].products[i].name)) > 0) {
                j.querySelector(".broj").style.display = "block";
            }
        }
        proizvodi = document.querySelectorAll(".proizvod");

        zbrojac();
    }

    if (nazivi) {
        nazivi.innerHTML = "<h4>NAZIV PROIZVODA</h4>";
        kolicine.innerHTML = "<h4>KOLICINA</h4>";
        for (const key of kos.keys()) {
            let i = document.createElement("div");
            i.setAttribute("class", "i");

            let ime = document.createElement("h5");
            ime.innerText = key;
            i.append(ime);

            nazivi.append(i);

            let kolicina = document.createElement("div");
            kolicina.setAttribute("class", "kolicina");

            let minus = document.createElement("button");
            minus.innerText = "-";
            kolicina.append(minus);
            minus.addEventListener("click", () => oduzeti(key))

            let kol = document.createElement("h5");
            kol.innerText = kos.get(key);
            kolicina.append(kol);

            let plus = document.createElement("button");
            plus.innerText = "+";
            kolicina.append(plus);
            plus.addEventListener("click", () => dodati(key))

            kolicine.append(kolicina);
        } 
    }
}

document.addEventListener("DOMContentLoaded", () => ispis_naziva());

