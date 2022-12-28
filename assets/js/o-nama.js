//Ucitavanje Navigacije, Footer-a i dodavanje active klase na link
$(function () {
  $("#nav-placeholder").load("nav.html");
  $("#footer-placeholder").load("footer.html");
});

//Problem je resen sa setTimeout funkcijom sa 0.5s delay-om
setTimeout(function () {
  $(".o-nama-nav-link").addClass("active-nav");
  $('.navbar').addClass('nav-bg');
}, 500);