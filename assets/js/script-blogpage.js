/* Prikaz blogova iz JSON-a */
function prikazBlogova(){
  $.getJSON('assets/json/blogovi.json', function(data){
    var listaPostova = data.blogovi; 
    
    function ispisKartica(blog) {
      return `
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <div>
              <img src="${blog.slika}" class="img-fluid rounded-start blog-lista-slika" alt="...">
            </div>
          </div>
          <div class="col-md-8">
          <div class="card-body">
              <p class="card-text">
                <small class="text-muted">
                  <time><i class="fas fa-calendar-alt mr-2"></i> ${formatiranjeDatuma(blog.datum)}</time>
                </small>
              </p>
              <h2 class="card-title">${blog.naslov}</span></h2>
              <hr width="250px" style="margin: 5px 0">
              <small class="text-muted" style="margin-right: 10px;">Kategorije: </small>${formatiranjeKategorija(blog.kategorije)}
              <p class="card-text" style="margin-top: 20px;">${duzinaFilter(blog.tekst)}</p>
              <a class="dugme my-3" href="blog-post-${blog.id}.html">Saznaj vise</a>
            </div>
          </div>
        </div>
      </div>
      `;
    }

    document.getElementById("demo").innerHTML = `
    ${listaPostova.map(ispisKartica).join("")} `;
    

    function duzinaFilter(objekat){
      var tekst = objekat
      var trazenaDuzina = 350
      if (tekst.length > trazenaDuzina){
        var skracenTekst = tekst.substring(0, trazenaDuzina);
        return skracenTekst + "..."
      }
      else{
        return tekst
      }
    }


    function formatiranjeKategorija(objekat){
      var listaKategorija = objekat

      /* Svi 'objekti' iz kategorija se stavljaju u niz */
      var kategorijaItems = []
      for(i=0; i<listaKategorija.length; i++){
        kategorijaItems.push(listaKategorija[i])
      }

      /* Pravi se novi niz i dodaje tekst oko elemeneta kategorijaItems niza */
      var kategorijeSaTekstom = []
      for(i=0;i<kategorijaItems.length; i++){
        kategorijeSaTekstom.push(`<small class="text-muted"><a href="#" style="text-decoration: none; color: red;">${kategorijaItems[i]}</a> | </small>`)
      }

      /* Svi elementi kategorijeSaTekstom niza se dodaju u 1 string*/
      var KategorijeOutput = ""
      for(i=0; i < kategorijeSaTekstom.length; i++){
        KategorijeOutput += kategorijeSaTekstom[i]
      }

      /* KategorijeOutput se vraca */
      return KategorijeOutput
    }

    
    function formatiranjeDatuma(objekat){
      var RAWdatum = objekat;
      var date = new Date(RAWdatum);
      
      const dani = ['Nedelja','Ponedeljak','Utorak','Sreda','Cetvrtak','Petak','Subota'];
      const meseci = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];

      const datumOutput =  `${dani[date.getDay()]}, ${date.getDate().toString()}. ${meseci[date.getMonth()]} ${date.getFullYear().toString()}.`
      return datumOutput
  
    }

    
  });
}
// prikazBlogova(); - Blogovi Hard-Coded upisani u index.html

