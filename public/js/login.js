const loginPharmacist = async (email, password) => {
  try {
    const res = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      timeout: 30000, // Note: fetch does not support timeout natively
    });
    if (res.ok) {
      alert("Hi, You are logged in successfully");
      window.setTimeout(() => {
        location.assign("/pharmacistDashboard");
      }, 1500);
    }
    // if (
    //   res.data.status === "success" &&
    //   res.data.data.user.role === "pharmacist"
    // ) {
    //   alert("Hi Pharmacist, You are logged in successfully");
    //   window.setTimeout(() => {
    //     location.assign("/pharmacistDashboard");
    //   }, 1500);
    // }
    // if (
    //   res.data.status === "success" &&
    //   res.data.data.user.role === "manager"
    // ) {
    //   alert("Hi Manager, You are logged in successfully");
    //   window.setTimeout(() => {
    //     location.assign("/managerDashboard");
    //   }, 1500);
    // }
    // if (res.data.status === "success" && res.data.data.user.role === "seller") {
    //   alert("Hi Seller, You are logged in successfully");
    //   window.setTimeout(() => {
    //     location.assign("/sellerDashboard");
    //   }, 1500);
    // }
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
};

// DOM ELEMENTS
const pharmacistForm = document.querySelector(".form");

// EXECUTING

if (pharmacistForm) {
  pharmacistForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    loginPharmacist(email, password);
  });
}
