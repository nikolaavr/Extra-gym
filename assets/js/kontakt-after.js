// FAQ na kontakt stranici

var coll = document.getElementsByClassName("collapsible");
var i;
coll[0].nextElementSibling.style.display = "block"

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    if (this == coll[0]) {
      this.classList.toggle("active");
      var sadrzaj = this.nextElementSibling;
      if (sadrzaj.style.display === "block") {
        sadrzaj.style.display = "none";
      } else {
        sadrzaj.style.display = "block";
      }
      coll[1].nextElementSibling.style.display = "none"
      coll[2].nextElementSibling.style.display = "none"
      coll[1].classList.remove("active");
      coll[2].classList.remove("active");
    }
    else if (this == coll[1]) {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
      coll[0].nextElementSibling.style.display = "none"
      coll[2].nextElementSibling.style.display = "none"
      coll[0].classList.remove("active");
      coll[2].classList.remove("active");
    }
    else if (this == coll[2]) {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
      coll[0].nextElementSibling.style.display = "none"
      coll[1].nextElementSibling.style.display = "none"
      coll[0].classList.remove("active");
      coll[1].classList.remove("active");
    }
  });
}