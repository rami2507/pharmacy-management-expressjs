const createSeller = async (seller) => {
  try {
    const url = "/api/v1/users/createSeller";

    await axios.post(url, seller);

    alert("Seller has been added successfully");

    setTimeout(() => {
      location.assign("/manage-sellers");
    }, 800);
  } catch (err) {
    alert(err.response);
    console.log(err.response.data.message);
  }
};

const addSellerButton = document.querySelector(".btn--accept");

if (addSellerButton) {
  addSellerButton.addEventListener("click", () => {
    const seller = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      billingAddress: document.getElementById("billingAddress").value,
      phone: document.getElementById("phone").value,
      password: document.getElementById("password").value,
    };
    console.log(seller);
    createSeller(seller);
  });
}
