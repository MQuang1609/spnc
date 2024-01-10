document.addEventListener("DOMContentLoaded", function () {
  const openPdfButton = document.getElementById("openPdfButton");
  const closePdfButton = document.getElementById("closePdfButton");
  const pdfViewer = document.getElementById("pdfViewer");
  const pdfContainer = document.getElementById("pdfContainer");

  openPdfButton.addEventListener("click", function () {
    const pdfUrl = "../assets/tailieu/tknp1.pdf"; // Đường dẫn đến file PDF của bạn
    pdfViewer.src = pdfUrl;
    pdfContainer.style.display = "block";
    closePdfButton.style.display = "block";
    openPdfButton.style.display = "none";
  });

  closePdfButton.addEventListener("click", function () {
    pdfContainer.style.display = "none";
    pdfViewer.src = ""; // Reset the PDF source to stop it from loading
    closePdfButton.style.display = "none";
    openPdfButton.style.display = "block";
  });
});
