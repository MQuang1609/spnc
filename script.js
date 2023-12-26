document.addEventListener("DOMContentLoaded", function () {
  var showBtn = document.getElementById("showBtn");
  var article = document.getElementById("article");
  var closeBtn = document.getElementById("closeBtn");

  showBtn.addEventListener("click", function () {
    article.style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
    article.style.display = "none";
  });
});
