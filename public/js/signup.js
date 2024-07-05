/* eslint-disable */

const signup = async (name, email, billingAddress, phone, role, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: { name, email, billingAddress, phone, role, password },
    });
    if (res.data.status === "success") {
      alert("You are successfuly signed up");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

// DOM ELEMENTS
const signupForm = document.querySelector(".form2");

// EXECUTING

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const billingAddress = document.getElementById("billingAddress").value;
    const phone = document.getElementById("phone").value;
    const role = document.getElementById("typedecompte").value;
    const password = document.getElementById("password").value;
    // console.log(name, email, typedecompte, password);
    signup(name, email, billingAddress, phone, role, password);
  });
}
