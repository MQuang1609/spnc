document.addEventListener("DOMContentLoaded", function () {
  var showBtn = document.getElementById("showBtn");
  var imageContainer = document.getElementById("image-container");
  var closeBtn = document.getElementById("closeBtn");
  var isImageVisible = false;

  showBtn.addEventListener("click", function () {
    imageContainer.style.display = "block";
    isImageVisible = true;
  });

  closeBtn.addEventListener("click", function () {
    if (isImageVisible) {
      imageContainer.style.display = "none";
      isImageVisible = false;
    }
  });
});
