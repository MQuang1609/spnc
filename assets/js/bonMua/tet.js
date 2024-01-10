//<![CDATA[
var pictureSrc =
  "https://1.bp.blogspot.com/-CXx9jt2JMRk/Vq-Lh5fm88I/AAAAAAAASwo/XivooDn_oSY/s1600/hoamai.png"; //Link ảnh hoa muốn hiển thị trên web
var pictureWidth = 15; //Chiều rộng của hoa mai or đào
var pictureHeight = 15; //Chiều cao của hoa mai or đào
var numFlakes = 10; //Số bông hoa xuất hiện cùng một lúc trên trang web
var downSpeed = 0.01; //Tốc độ rơi của hoa
var lrFlakes = 10; //Tốc độ các bông hoa giao động từ bên trai sang bên phải và ngược lại

if (
  typeof numFlakes != "number" ||
  Math.round(numFlakes) != numFlakes ||
  numFlakes < 1
) {
  numFlakes = 10;
}

//draw the snowflakes
for (var x = 0; x < numFlakes; x++) {
  if (document.layers) {
    //releave NS4 bug
    document.write(
      '<layer id="snFlkDiv' +
        x +
        '"><imgsrc="' +
        pictureSrc +
        '" height="' +
        pictureHeight +
        '"width="' +
        pictureWidth +
        '" alt="*" border="0"></layer>'
    );
  } else {
    document.write(
      '<div style="position:absolute; z-index:9999;"id="snFlkDiv' +
        x +
        '"><img src="' +
        pictureSrc +
        '"height="' +
        pictureHeight +
        '" width="' +
        pictureWidth +
        '" alt="*"border="0"></div>'
    );
  }
}

//calculate initial positions (in portions of browser window size)
var xcoords = new Array(),
  ycoords = new Array(),
  snFlkTemp;
for (var x = 0; x < numFlakes; x++) {
  xcoords[x] = (x + 1) / (numFlakes + 1);
  do {
    snFlkTemp = Math.round((numFlakes - 1) * Math.random());
  } while (typeof ycoords[snFlkTemp] == "number");
  ycoords[snFlkTemp] = x / numFlakes;
}

//now animate
function flakeFall() {
  if (!getRefToDivNest("snFlkDiv0")) {
    return;
  }
  var scrWidth = 0,
    scrHeight = 0,
    scrollHeight = 0,
    scrollWidth = 0;
  //find screen settings for all variations. doing this every time allows for resizing and scrolling
  if (typeof window.innerWidth == "number") {
    scrWidth = window.innerWidth;
    scrHeight = window.innerHeight;
  } else {
    if (
      document.documentElement &&
      (document.documentElement.clientWidth ||
        document.documentElement.clientHeight)
    ) {
      scrWidth = document.documentElement.clientWidth;
      scrHeight = document.documentElement.clientHeight;
    } else {
      if (
        document.body &&
        (document.body.clientWidth || document.body.clientHeight)
      ) {
        scrWidth = document.body.clientWidth;
        scrHeight = document.body.clientHeight;
      }
    }
  }
  if (typeof window.pageYOffset == "number") {
    scrollHeight = pageYOffset;
    scrollWidth = pageXOffset;
  } else {
    if (
      document.body &&
      (document.body.scrollLeft || document.body.scrollTop)
    ) {
      scrollHeight = document.body.scrollTop;
      scrollWidth = document.body.scrollLeft;
    } else {
      if (
        document.documentElement &&
        (document.documentElement.scrollLeft ||
          document.documentElement.scrollTop)
      ) {
        scrollHeight = document.documentElement.scrollTop;
        scrollWidth = document.documentElement.scrollLeft;
      }
    }
  }
  //move the snowflakes to their new position
  for (var x = 0; x < numFlakes; x++) {
    if (ycoords[x] * scrHeight > scrHeight - pictureHeight) {
      ycoords[x] = 0;
    }
    var divRef = getRefToDivNest("snFlkDiv" + x);
    if (!divRef) {
      return;
    }
    if (divRef.style) {
      divRef = divRef.style;
    }
    var oPix = document.childNodes ? "px" : 0;
    divRef.top = Math.round(ycoords[x] * scrHeight) + scrollHeight + oPix;
    divRef.left =
      Math.round(
        xcoords[x] * scrWidth -
          pictureWidth / 2 +
          (scrWidth / ((numFlakes + 1) * 4)) *
            (Math.sin(lrFlakes * ycoords[x]) -
              Math.sin(3 * lrFlakes * ycoords[x]))
      ) +
      scrollWidth +
      oPix;
    ycoords[x] += downSpeed;
  }
}

//DHTML handlers
function getRefToDivNest(divName) {
  if (document.layers) {
    return document.layers[divName];
  } //NS4
  if (document[divName]) {
    return document[divName];
  } //NS4 also
  if (document.getElementById) {
    return document.getElementById(divName);
  } //DOM (IE5+, NS6+, Mozilla0.9+, Opera)
  if (document.all) {
    return document.all[divName];
  } //Proprietary DOM - IE4
  return false;
}

window.setInterval("flakeFall();", 100);
//]]>
document.addEventListener("DOMContentLoaded", function () {
  const openPdfButton = document.getElementById("openPdfButton");
  const closePdfButton = document.getElementById("closePdfButton");
  const pdfViewer = document.getElementById("pdfViewer");
  const pdfContainer = document.getElementById("pdfContainer");

  openPdfButton.addEventListener("click", function () {
    const pdfUrl = "../../assets/tailieu/tknp1.pdf"; // Đường dẫn đến file PDF của bạn
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
