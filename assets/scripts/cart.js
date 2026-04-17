let nazivi = document.querySelector(".nazivi");
let kolicine = document.querySelector(".kolicine");
const proizvodi = document.querySelectorAll(".proizvod");
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
    if (proizvodi) {
        for (let i = 0; i < proizvodi.length; i++) {
            if (Number(kos.get(data.categories[selected].products[i].name)) > 0) {
                proizvodi[i].querySelector(".broj").style.display = "block";
            }
        }

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