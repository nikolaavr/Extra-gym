"use strict"

//Pocetak funkcije za dodavanje "active" klase u navigaciji
var url = window.location.pathname;
var imeFajla = url.substring(url.lastIndexOf('/')+1).slice(0, -5);

//dodavanje senke na navigaciji kad se skroluje
$(window).on("scroll", function() {
  if($(window).scrollTop()) {
      $('nav').addClass('nav-bg');
    }

    else {
      $('nav').removeClass('nav-bg');
    }
  
})


let sideDugmici = document.querySelectorAll('.dot-dugme')
// console.log(sideDugmici)
let noviHeadStyle = document.head.appendChild(document.createElement("style"));


// Visina svakog sektora posebno (koji ima klasu ".sektor"), se dodaje u niz visineSektor[]
let sektori = document.querySelectorAll(".sektor")
var visineSektora = []
function kreirajVisineSektora(){
  for(let i = 0; i < sektori.length; i++){
    visineSektora[i] = sektori[i].clientHeight;
  }
  console.log(visineSektora);
  return visineSektora
}
kreirajVisineSektora()


// Pravljenje novog niza sa izracunatom sumom visina do svakog narednog sektora. Zbog window.scroll f-je
var sumeSektora = []
function kreirajGranicuZaSektore(){
  let sum = -100
  for(let i = 0; i < visineSektora.length; i++){
    sum = sum + visineSektora[i]
    sumeSektora[i] = sum
  }    
  console.log(sumeSektora);
  return sumeSektora
}
kreirajGranicuZaSektore()



$(window).scroll(function() {    
  //Funkcije se ponovo pozivaju ovde jer ukoliko se resize-uje ekran, visine sektora nece biti
  //iste nego ce se povecati i samim tim active klasa na side navigaciji ne pokazuje pravu
  //vrednost nego onu sa ucitavanja stranice
  kreirajVisineSektora();
  kreirajGranicuZaSektore()
    var scroll = $(window).scrollTop();
    var granicaPromeneBoje1 = 1350;
    var granicaPromeneBoje2 = 4450;
    var granicaPromeneBoje3 = 5700;

    if(scroll < granicaPromeneBoje1 || scroll  >= granicaPromeneBoje2){
      noviHeadStyle.innerHTML = "";
      for(let i = 0; i < sideDugmici.length; i++){
        sideDugmici[i].firstChild.firstChild.style.color = "#fff"
        // Mora 2x firstChild jer se s prvim dohvata <b>, a s drugim <a> tag
      }
    }
    else if(scroll >= granicaPromeneBoje1 && scroll <granicaPromeneBoje2){
      noviHeadStyle.innerHTML = `
      .dot-container::before{background: black !important;}
      .dot-container::after{background: black !important;}`;
      for(let i = 0; i < sideDugmici.length; i++){
        sideDugmici[i].firstChild.firstChild.style.color = "#000"
        // sideDugmici[i].setAttribute("style", "color:#000")
        // let idElementa = document.getElementById(sideDugmici[i].getAttribute("id"))
        // idElementa.style.color = "#000"
      }
    }
    if(scroll >= granicaPromeneBoje3){
      noviHeadStyle.innerHTML = `
      .dot-container::before{background: black !important;}
      .dot-container::after{background: black !important;}`;
      for(let i = 0; i < sideDugmici.length; i++){
        sideDugmici[i].firstChild.firstChild.style.color = "#000"
      }
    }
    else if(scroll >= granicaPromeneBoje2){
      noviHeadStyle.innerHTML = "";
      for(let i = 0; i < sideDugmici.length; i++){
        sideDugmici[i].firstChild.firstChild.style.color = "#fff"
      }
    }



    //Dodavanje active klase na dot dugme u zavisnosti od scroll-a
    if (scroll < sumeSektora[0]) {
      console.log("caoooo")
      brisanjeActiveKlaseDugmica()
      sideDugmici[0].classList.add('active-text')
    }
    else if (scroll >= sumeSektora[0] && scroll < sumeSektora[1]) {
      brisanjeActiveKlaseDugmica()
      sideDugmici[1].classList.add('active-text')
    }
    else if (scroll >= sumeSektora[1] && scroll < sumeSektora[2]) {
      brisanjeActiveKlaseDugmica()
      sideDugmici[2].classList.add('active-text')
    }
    else if (scroll >= sumeSektora[2] && scroll < sumeSektora[3]) {
      brisanjeActiveKlaseDugmica()
      sideDugmici[3].classList.add('active-text')
    }
    else if (scroll >= sumeSektora[3] && scroll < sumeSektora[4]) {
      brisanjeActiveKlaseDugmica()
      sideDugmici[4].classList.add('active-text')
    }
    else if (scroll >= sumeSektora[4] && scroll < sumeSektora[5]){
      brisanjeActiveKlaseDugmica()
      sideDugmici[5].classList.add('active-text')
    }    
    else if (scroll >= sumeSektora[5]){
      brisanjeActiveKlaseDugmica()
      sideDugmici[6].classList.add('active-text')
    }

});

function brisanjeActiveKlaseDugmica(){
  for(let i = 0; i < sideDugmici.length; i++){
    sideDugmici[i].classList.remove("active-text")
  }
}

/* Prikaz blogova iz JSON-a na pocetnoj*/
function prikazBlogovaNaPocetnoj(){
  $.getJSON('assets/json/blogovi.json', function(data){
    var listaPostova = data.blogovi;
    
    //Pravljenje liste kategorija
    function kategorije(kategorije) {
      return `
      <div class="pocetna-blog-kateg">kategorije: 
      ${kategorije.map(kategorija => `<small class="text-muted"><a href="#" style="text-decoration: none; color: red;">${kategorija}</a> | </small>`).join(" ")}
      </div>`;
    }

    //Skracivanje duzine teksta
    function duzinaFilter(objekat){
      var tekst = objekat
      var trazenaDuzina = 200
      if (tekst.length > trazenaDuzina){
        var skracenTekst = tekst.substring(0, trazenaDuzina);
        return skracenTekst + "..."
      }
      else{
        return tekst
      }
    }

    function ispisHTMLBlogova(blog) {
      return `
        <div class="col">
          <div class="card h-100">
            <img src="${blog.slika}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">
                <small class="text-muted">
                  <time datetime="2020-05-25 12:00:00"><i class="fas fa-calendar-alt mr-2"></i> <span>${blog.datum}</span></time>
                </small>
              </p>
              <h5 class="card-title">${blog.naslov}</h5>
              <span>${kategorije(blog.kategorije)}</span>
              <p class="card-text">${duzinaFilter(blog.tekst)}</p>
            </div>
            <a href="#" class="pocetna-blog-dugme">Saznaj više</a>
          </div>
        </div>
      `;
    }

    document.getElementById("pocetna-blogovi-placeholder").innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
    ${listaPostova.slice(0, 3).map(ispisHTMLBlogova).join("")} `;
  });
}
if(imeFajla === "index"){
  prikazBlogovaNaPocetnoj();
}

/* Prikaz trenera iz JSON-a na pocetnoj*/
function prikazTreneraNaPocetnoj(){
  $.getJSON('assets/json/treneri.json', function(data){
    var listaTrenera = data.treneri;

    function ispisHTMLTrenera(trener) {
      return `
      <div class="col-md-6 col-lg-3">
        <div class="img-block mb-5">
          <img src="${trener.profilnaSlika}" class="img-fluid  img-thumbnail rounded-circle"
            alt="${trener.id}">
          <div class="content mt-2">
            <h4>${trener.ime} ${trener.prezime}</h4>
            <p class="text-muted">${trener.struka}</p>
          </div>
        </div>
      </div>
      `;
    }

    document.getElementById("treneri-json").innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
    ${listaTrenera.slice(0,4).map(ispisHTMLTrenera).join("")} `;
  });
}
if(imeFajla === "index"){
  prikazTreneraNaPocetnoj();
}

/* Prikaz trenera iz JSON-a na stranici "O nama"*/
function prikazTreneraONama(){
  $.getJSON('assets/json/treneri.json', function(data){
    var listaTrenera = data.treneri;

    function ispisHTMLTrenera(trener) {
      return `
      <div class="col-md-6 col-lg-3">
        <div class="img-block mb-5">
          <img src="${trener.profilnaSlika}" class="img-fluid  img-thumbnail rounded-circle"
            alt="${trener.id}">
          <div class="content mt-2">
            <h4>${trener.ime} ${trener.prezime}</h4>
            <p class="text-muted">${trener.struka}</p>
          </div>
        </div>
      </div>
      `;
    }

    document.getElementById("treneri-json-duza-lista").innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
    ${listaTrenera.map(ispisHTMLTrenera).join("")} `;
  });
}
if(imeFajla === "o-nama"){
  prikazTreneraONama();
}


/* Pocetna - elementi koji imaju animaciju na onScroll dogadjaj */
const pocetnaS2Okvir = document.getElementById("pocetna-s2-okvir")
const pocetnaS2Slika = document.getElementById("pocetna-s2-slika")
const pocetnaS2Tekst = document.getElementById("pocetna-s2-tekst")

const pocetnaS3Tekst = document.getElementById("pocetna-s3-tekst")
const pocetnaS3Kartica1 = document.getElementById("pocetna-s3-kartica1")
const pocetnaS3Kartica2 = document.getElementById("pocetna-s3-kartica2")
const pocetnaS3Kartica3 = document.getElementById("pocetna-s3-kartica3")
const pocetnaS3Kartica4 = document.getElementById("pocetna-s3-kartica4")

const pocetnaS4naslov = document.querySelector("#sektor4 .naslov")
const pocetnaS4podnaslov = document.querySelector("#sektor4 .podnaslov")
const pocetnaS4BlogPlaceholder = document.querySelector("#pocetna-blogovi-placeholder")

const pocetnaS5naslov = document.querySelector("#sektor5 .naslov")
const pocetnaS5podnaslov = document.querySelector("#sektor5 .podnaslov")
const pocetnaS5treneri = document.querySelector("#treneri-json")

const pocetnaS6naslov = document.querySelector("#sektor6 .naslov")
const pocetnaS6podnaslov = document.querySelector("#sektor6 .podnaslov")
const pocetnaS6Kalendar = document.querySelector(".calendar")

// Pocetna - Animacija za onScroll dogadjaj
window.addEventListener('scroll', prikaz)
prikaz()
function prikaz(){
  
  // Trigeri za animaciju
  const triggerBottom1 = window.innerHeight / 5 * 1;
  const triggerBottom2 = window.innerHeight / 5 * 2;
  const triggerBottom3 = window.innerHeight / 5 * 3;
  const triggerBottom4 = window.innerHeight / 5 * 4;
  const triggerBottom5 = window.innerHeight / 5 * 5;

  // Animacija - Pocetna - S2 - O nama
  if(pocetnaS2Okvir.getBoundingClientRect().top <= triggerBottom4){
    pocetnaS2Slika.classList.add('show');
    pocetnaS2Okvir.classList.add('show');
    pocetnaS2Tekst.classList.add('show');
  }
  else{
    pocetnaS2Slika.classList.remove('show');
    pocetnaS2Okvir.classList.remove('show');
    pocetnaS2Tekst.classList.remove('show');
  }

  // Animacija - Pocetna - S3 - Cenovnik
  if(pocetnaS3Tekst.getBoundingClientRect().top <= triggerBottom5){
    pocetnaS3Tekst.classList.add('show');
  }
  else{
    pocetnaS3Tekst.classList.remove('show');
  }
  if(pocetnaS3Kartica1.getBoundingClientRect().top <= triggerBottom3){
    pocetnaS3Kartica1.classList.add('show');
    pocetnaS3Kartica2.classList.add('show');
    pocetnaS3Kartica3.classList.add('show');
    pocetnaS3Kartica4.classList.add('show');
  }
  else{
    pocetnaS3Kartica1.classList.remove('show');
    pocetnaS3Kartica2.classList.remove('show');
    pocetnaS3Kartica3.classList.remove('show');
    pocetnaS3Kartica4.classList.remove('show');
  }

  // Animacija - Pocetna - S4 - Blog
  if(pocetnaS4naslov.getBoundingClientRect().top <= triggerBottom4){
    pocetnaS4naslov.classList.add('show');
    pocetnaS4BlogPlaceholder.classList.add('show');
    pocetnaS4podnaslov.classList.add('show');
  }
  else{
    pocetnaS4naslov.classList.remove('show');
    pocetnaS4BlogPlaceholder.classList.remove('show');
    pocetnaS4podnaslov.classList.remove('show');
  }

  // Animacija - Pocetna - S5 - Treneri
  if(pocetnaS5podnaslov.getBoundingClientRect().top <= triggerBottom4){
    pocetnaS5podnaslov.classList.add('show');
    pocetnaS5naslov.classList.add('show');
    pocetnaS5treneri.classList.add('show');
  }
  else{
    pocetnaS5podnaslov.classList.remove('show');
    pocetnaS5naslov.classList.remove('show');
    pocetnaS5treneri.classList.remove('show');
  }

  // Animacija - Pocetna - S2 - Termini
  if(pocetnaS6naslov.getBoundingClientRect().top <= triggerBottom4){
    pocetnaS6naslov.classList.add('show');
    pocetnaS6podnaslov.classList.add('show');
  }
  else{
    pocetnaS6naslov.classList.remove('show');
    pocetnaS6podnaslov.classList.remove('show');
  }
  if(pocetnaS6Kalendar.getBoundingClientRect().top <= triggerBottom4){
    pocetnaS6Kalendar.classList.add('show');
  }
  else{
    pocetnaS6Kalendar.classList.remove('show');
  }
}