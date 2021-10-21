// Get Data From LocalStorage & Show It
function userNameDisplay() {
  let userName = document.getElementById("userGreetingName");
  userName.innerText = localStorage.getItem("userName");
  let lastLogin = document.getElementById("lastLoginDetail");
  lastLogin.innerText = localStorage.getItem("time");
  console.log(localStorage.getItem("time"));
}

userNameDisplay();
