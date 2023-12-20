function changeColor(buttonNumber) {
  // Đặt mọi nút về trạng thái ban đầu
  resetButtons();

  // Tìm nút được bấm và thêm class 'red' để đổi màu
  var button = document.querySelector(
    ".button:nth-child(" + buttonNumber + ")"
  );
  button.classList.add("red");
}

function resetButtons() {
  var buttons = document.querySelectorAll(".button");
  buttons.forEach(function (button) {
    button.classList.remove("red");
  });
}
