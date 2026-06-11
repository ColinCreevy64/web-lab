async function dohvat_kategorija() {
    const j = await fetch('/getCategories');
    const data = await j.json();
    return data;
}

async function ispis_kategorija() {
    const data = await dohvat_kategorija();

    for (let i = 0; i < kategorije.length; i++) {
        kategorije[i].innerText = data[i];
        kategorije[i].addEventListener("click", () => promjena_kategorije(i));
    }
}

async function dohvat_proizvoda(id) {
    const j = await fetch('/getProducts/' + id);
    const data = await j.json();
    return data;
}

async function dohvat_kosare() {
    const j = await fetch('/cart/getAll');
    const data = await j.json();
    return data;
}

async function zbrojac() {            //racunanje ukupnog broja proizvoda
    if (zbroj) {
        let kos = await dohvat_kosare();
        let z = kos.reduce((a, b) => a + b, 0);
        if (z === 0) {
            zbroj.innerHTML = "0";
            zbroj.style.display = "none";
        }
        else {
            zbroj.innerHTML = z;
            zbroj.style.display = "block";
        }
    }
}

async function dodaj(p) {             //dodavanje proizvoda u kosaru, koristen u app.js
    const k = await dohvat_proizvoda(selected);
    const j = await fetch('/cart/add/' + (selected * k.length + p))

    ispis_naziva();
}

async function dodaj_home(p) {             //dodavanje proizvoda u kosaru, koristen u app.js
    const k = await dohvat_proizvoda(selected);
    const j = await fetch('/cart/add/' + (selected * k.length + p))
}

async function oduzeti(p) {        //micanje proizvoda iz kosare u cart
    const k = await dohvat_proizvoda(selected);
    const j = await fetch('/cart/remove/' + (selected * k.length + p))

    ispis_naziva();
}

async function ispis_naziva() {           //azuriranje 
    let p = await dohvat_proizvoda(selected);
    let kos = await dohvat_kosare();
    let kat = await dohvat_kategorija();
    console.log(p);

    proizvodi = document.querySelectorAll(".proizvod");

    if (document.querySelector(".moto")) {          //kad na glavnoj stranici
        let rod = document.querySelector(".proizvodi");
        rod.innerText = "";
        broj_proizvoda = p.length;
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
            broj.innerText = kos[selected * p.length + i];
            broj.style.display = "none";
            broj.setAttribute("class", "broj");
            j.querySelector("div").append(broj);

            if (Number(kos[selected * p.length + i]) > 0) {
                j.querySelector(".broj").style.display = "block";
            }
        }
        proizvodi = document.querySelectorAll(".proizvod");

        zbrojac();
    }

    if (nazivi) {               //kad na kosarica stranici
        nazivi.innerHTML = "<h4>NAZIV PROIZVODA</h4>";
        kolicine.innerHTML = "<h4>KOLICINA</h4>";
        for (let c = 0; c < kat.length; c++) {
            let pr = await dohvat_proizvoda(c);

            for (let d = 0; d < pr.length; d++) {
                if (Number(kos[c * pr.length + d]) !== 0) {

                    let i = document.createElement("div");
                    i.setAttribute("class", "i");

                    let ime = document.createElement("h5");
                    ime.innerText = pr[d].name;
                    i.append(ime);

                    nazivi.append(i);

                    let kolicina = document.createElement("div");
                    kolicina.setAttribute("class", "kolicina");

                    let minus = document.createElement("button");
                    minus.innerText = "-";
                    kolicina.append(minus);
                    minus.addEventListener("click", () => oduzeti(c * pr.length + d))

                    let kol = document.createElement("h5");
                    kol.innerText = kos[c * pr.length + d];
                    kolicina.append(kol);

                    let plus = document.createElement("button");
                    plus.innerText = "+";
                    kolicina.append(plus);
                    plus.addEventListener("click", () => dodaj(c * pr.length + d))

                    kolicine.append(kolicina);
                }
            }
        } 
        zbrojac();
    }
}

let selected = 0;
let nazivi = document.querySelector(".nazivi");
let kolicine = document.querySelector(".kolicine");
let proizvodi = document.querySelectorAll(".proizvod");
let naslov = document.querySelector("h2");
let zbroj = document.querySelector(".zbroj");
document.addEventListener("DOMContentLoaded", () => ispis_naziva());

