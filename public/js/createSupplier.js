const createSupplier = async (supplier) => {
  try {
    const url = "/api/v1/suppliers/createSupplier";

    await axios.post(url, supplier);

    alert("Supplier has been added successfully");

    setTimeout(() => {
      location.assign("/manage-suppliers");
    }, 800);
  } catch (err) {
    alert(err.response);
    console.log(err.response.data.message);
  }
};

const addSupplierButton = document.querySelector(".btn--accept");

if (addSupplierButton) {
  addSupplierButton.addEventListener("click", () => {
    const supplier = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      emailAddress: document.getElementById("emailAddress").value,
      billingAddress: document.getElementById("billingAddress").value,
      phone: document.getElementById("phone").value,
    };
    createSupplier(supplier);
  });
}
