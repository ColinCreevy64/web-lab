document.addEventListener("DOMContentLoaded", async () => {
    await load_header();
    const zbroj = document.querySelector(".zbroj");
    zbroj.style.display = "none";
    const naslov = document.querySelector("h2");

    let res = await fetch("/views/partials/footer");
    let html = await res.text();
    document.querySelector("footer").innerHTML = html;
})