//Ucitavanje Navigacije, Footer-a i dodavanje active klase na link
$(function () {
   $("#nav-placeholder").load("nav.html");
      $("#footer-placeholder").load("footer.html");
});

setTimeout(function () {
  $(".kontakt-nav-link").addClass("active-nav");
  $('.navbar').addClass('nav-bg');
}, 500);
