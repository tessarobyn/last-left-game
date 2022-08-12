function backHome() {
  window.location.href = "index.html";
}

const homeButton = document.getElementById("home");
homeButton.addEventListener("click", () => {
  backHome();
});
