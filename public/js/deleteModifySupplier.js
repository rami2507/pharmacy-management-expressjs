console.log("delete modify supplier");

const deleteSupplier = async (id) => {
  const url = `/api/v1/suppliers/deleteSupplier/${id}`;

  await axios.delete(url);

  alert("Supplier has been deleted successfully");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign("/manage-suppliers");
  }, 800);
};

const modifySupplier = async (id, updatedData) => {
  const url = `/api/v1/suppliers/modifySupplier/${id}`;

  await axios.patch(url, updatedData);

  alert("Supplier has been Modified successfully");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign(`/manage-suppliers/modify/${id}`);
  }, 800);
};

const deleteSupplierButton = document.querySelector(".btn--delete");
const modifySupplierButton = document.querySelector(".btn--accept");

if (deleteSupplierButton) {
  const currentUrl = window.location.href;
  const supplierID = currentUrl.split("/")[4];
  // Pass a function reference to the event listener
  deleteSupplierButton.addEventListener("click", () => {
    deleteSupplier(supplierID);
  });
}

if (modifySupplierButton) {
  const currentUrl = window.location.href;
  const supplierID = currentUrl.split("/")[5];
  modifySupplierButton.addEventListener("click", () => {
    const updatedData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      emailAddress: document.getElementById("emailAddress").value,
      billingAddress: document.getElementById("billingAddress").value,
      phone: document.getElementById("phone").value,
    };
    modifySupplier(supplierID, updatedData);
  });
}
