const wishSpan = document.querySelector(".span-wish");
const spanCart2 = document.querySelector(".span-cart");

document.addEventListener("DOMContentLoaded", () => {
  wishSpan.style.opacity = 1;

  addToCartNumber();
});

function addToCartNumber() {
  let addToCartNumbers = localStorage.getItem("cartNumbers");
  spanCart2.innerHTML = addToCartNumbers;

  let wishCartNumbers = localStorage.getItem("wishList");
  wishSpan.innerHTML = wishCartNumbers;
}

let menuBtn = document.querySelector(".fa-bars");
let sideNav = document.querySelector(".midNav ul");

sideNav.style.right = "-250px";
menuBtn.onclick = function () {
  if (sideNav.style.right == "-250px") {
    sideNav.style.right = "0";
    menuBtn.style.color = "#990066";
  } else {
    sideNav.style.right = "-250px";
    menuBtn.style.color = "#FFFFFF";
  }
};

const loginToggler = document.getElementById("toggle-login");
const signupToggler = document.getElementById("toggle-signup");
const AdminloginToggler = document.getElementById("toggle-admin");
const toggleLoginForm = document.getElementById("formlogIn");
const toggleSignupForm = document.getElementById("formSignUp");
const toggleAdminLoginForm = document.getElementById("formAdminlogIn");

loginToggler.onclick = function () {
  toggleLoginForm.style.display = "block";
  toggleSignupForm.style.display = "none";
  toggleAdminLoginForm.style.display = "none";
};

signupToggler.onclick = function () {
  toggleSignupForm.style.display = "block";
  toggleLoginForm.style.display = "none";
  toggleAdminLoginForm.style.display = "none";
};

AdminloginToggler.onclick = function () {
  toggleAdminLoginForm.style.display = "block";
  toggleLoginForm.style.display = "none";
  toggleSignupForm.style.display = "none";
};


let modal = document.getElementById("myModal");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//login
const userEmailLi = document.getElementById("userEmailLogIn");
const userPasswordLi = document.getElementById("userPassLogIn");
const lastLogin = new Date();

const logInFormBtn = document.getElementById("logInBtn");

logInFormBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (checkLoginInputs()) {
    localStorage.time = lastLogin;
    swal("Good job!", "Logged In Successfully !!!!", "success");
    greetLoggedInUser();
    emptyLoginInputs();
    setTimeout(() => {
      document.getElementById("myModal").style.display = "none";
    }, 1000);
    window.location.reload();
    userNameDisplay();
    greetLoggedInUser();
  } else {
    return false;
  }
});

const checkLoginInputs = () => {
  const userEmailValue = userEmailLi.value.trim();
  const userPassValue = userPasswordLi.value.trim();

  if (userEmailValue === "") {
    setErrorFor(userEmailLi, "Email Field Can't Be Blank !!");
  } else if (!isEmail(userEmailValue)) {
    setErrorFor(userEmailLi, "Invalid E-mail !!");
  } else {
    setSuccessFor(userEmailLi);
  }

  if (userPassValue === "") {
    setErrorFor(userPasswordLi, "Password Field Can't Be Blank !!");
  } else {
    setSuccessFor(userPasswordLi);
  }

  if (userEmailValue === "" && userPassValue === "") {
    swal("Ohh Noo!", "Create Account First !!", "error");
    return false;
  } else if (userEmailValue !== localStorage.getItem("userEmail")) {
    swal("Invalid E-mail!", "Enter Valid E-mail !!", "error");
    return false;
  } else if (userPassValue !== localStorage.getItem("userPassword")) {
    swal("Invalid Password ", "Enter Valid Password !!", "error");
    setErrorFor(userPasswordLi, "Enter Valid Password !");
    return false;
  } else if (
    userEmailValue === localStorage.getItem("userEmail") &&
    userPassValue === localStorage.getItem("userPassword")
  ) {
    return true;
  } else {
    return false;
  }
};

const emptyLoginInputs = () => {
  document.getElementById("userEmailLogIn").value = "";
  document.getElementById("userPassLogIn").value = "";
};

const greetLoggedInUser = () => {
  let targetArea = document.getElementById("userGreetingName");
  targetArea.innerHTML = localStorage.getItem("userName");
};

//signupform

const userNameSu = document.getElementById("userNameSignUp");
const userEmailSu = document.getElementById("userEmailSignUp");
const userPasswordSu1 = document.getElementById("userPassSignUp1");
const userPasswordSu2 = document.getElementById("userPassSignUp2");
const signUpFormBtn = document.getElementById("signUpBtn");

let userData = [];

signUpFormBtn.addEventListener("click", (e) => {
  localStorage.username = userNameSu;
  e.preventDefault();

  if (checkSignupInputs()) {
    swal("Good job!", "Created Account Successfully !!!!", "success");
    emptySignupInputs();
    setTimeout(() => {
      document.getElementById("myModal").style.display = "none";
    }, 1000);
    //window.location.reload();
    userNameDisplay();
    
  } else {
    return false;
  }
});

const checkSignupInputs = () => {
  const userNameValue = userNameSu.value;
  const userEmailValue = userEmailSu.value.trim();
  const userPassValue1 = userPasswordSu1.value.trim();
  const userPassValue2 = userPasswordSu2.value.trim();

  //user name validation
  if (userNameValue === "") {
    setErrorFor(userNameSu, "Name Can't Be Blank !!");
  } else {
    setSuccessFor(userNameSu);
    //userData.push(localStorage.setItem("userName", userNameValue));
  }

  //email validation
  if (userEmailValue === "") {
    setErrorFor(userEmailSu, "Email Field Can't Be Blank !!");
    return false;
  } else if (!isEmail(userEmailValue)) {
    setErrorFor(userEmailSu, "Invalid E-mail !!");
    return false;
  } else {
    setSuccessFor(userEmailSu);
    //userData.push(localStorage.setItem("userEmail", userEmailValue));
  }

  //password validation
  if (userPassValue1 === "" && userPassValue2 === "") {
    setErrorFor(userPasswordSu1, "Password Field Can't Be Blank !!");
    setErrorFor(userPasswordSu2, "Password Field Can't Be Blank !!");
  } else if (userPassValue1 === "") {
    setErrorFor(userPasswordSu1, "Enter YOur Password Your Password !!");
    return false;
  } else if (userPassValue2 === "") {
    setErrorFor(userPasswordSu2, "Again Write Your Password !!");
    return false;
  } else if (!passwordMatch(userPassValue1, userPassValue2)) {
    setErrorFor(userPasswordSu2, "Password Didn't Match !!");
    return false;
  } else {
    setSuccessFor(userPasswordSu1);
    setSuccessFor(userPasswordSu2);
    //userData.push(localStorage.setItem("userPassword", userPassValue2));
    return true;
  }
};

const emptySignupInputs = () => {
  document.getElementById("userNameSignUp").value = "";
  document.getElementById("userEmailSignUp").value = "";
  document.getElementById("userPassSignUp1").value = "";
  document.getElementById("userPassSignUp2").value = "";
};

const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form-control error";
};

const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

//email valid or not
const isEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

//password matche or not
const passwordMatch = (pass1, pass2) => {
  return pass1 === pass2;
};

function checkValidation() {
  let userName = localStorage.getItem("userName");
  let userEmail = localStorage.getItem("userEmail");
  if (userName || userEmail) {
    window.location.href = "wishList.html";
  } else {
    swal({
      title: "Please Login First to use this Feature!",
      icon: "warning",
    });
  }
}
