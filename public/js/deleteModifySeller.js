const deleteSeller = async (id) => {
  const url = `/api/v1/users/deleteUser/${id}`;

  await axios.delete(url);

  alert("Seller has been deleted successfully");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign("/manage-sellers");
  }, 800);
};

const modifySeller = async (id, updatedData) => {
  const url = `/api/v1/users/modifyUser/${id}`;

  await axios.patch(url, updatedData);

  alert("Seller has been Modified successfully");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign(`/manage-sellers/modify/${id}`);
  }, 800);
};

const deleteSellerButton = document.querySelector(".btn--delete");
const modifySellerButton = document.querySelector(".btn--accept");

if (deleteSellerButton) {
  const currentUrl = window.location.href;
  const sellerID = currentUrl.split("/")[4];
  // Pass a function reference to the event listener
  deleteSellerButton.addEventListener("click", () => {
    deleteSeller(sellerID);
  });
}

if (modifySellerButton) {
  const currentUrl = window.location.href;
  const sellerID = currentUrl.split("/")[5];
  modifySellerButton.addEventListener("click", () => {
    const updatedData = {
      name: document.getElementById("sellerName").value,
      email: document.getElementById("sellerEmail").value,
      billingAddress: document.getElementById("billing").value,
      phone: document.getElementById("phone").value,
    };
    modifySeller(sellerID, updatedData);
  });
}
