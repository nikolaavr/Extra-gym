//Nova galerija na stranici O nama
var sve = document.querySelectorAll(".fancybox");
var sve_list = [...sve]


function testSVE() {
  sve_list.forEach(sve => {
    sve.setAttribute("data-fancybox", "galerijaSVE");
  })
}
testSVE();

$(document).ready(function () {

  Fancybox.bind('[data-fancybox="galerijaSVE"]', {
    caption: function (fancybox, carousel, slide) {
      return (
        `${slide.index + 1} / ${carousel.slides.length} <br />` + slide.caption
      );
    },
  });
});
