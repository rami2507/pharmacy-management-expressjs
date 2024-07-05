const deleteOrder = async (id) => {
  const url = `/api/v1/orders/deleteOrder/${id}`;

  await axios.delete(url);

  alert("Order has been deleted successfully");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign("/manage-orders");
  }, 800);
};

const modifyOrder = async (id, updatedOrder) => {
  const url = `/api/v1/orders/modifyOrder/${id}`;

  await axios.patch(url, updatedOrder);

  alert("Order has been Modified successfully");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign(`/manage-orders/modify/${id}`);
  }, 800);
};

const deleteOrderButton = document.querySelector(".btn--delete");
const modifyOrderButton = document.querySelector(".btn--accept");

if (deleteOrderButton) {
  const currentUrl = window.location.href;
  const orderID = currentUrl.split("/")[4];
  // Pass a function reference to the event listener
  deleteOrderButton.addEventListener("click", () => {
    deleteOrder(orderID);
  });
}

if (modifyOrderButton) {
  const currentUrl = window.location.href;
  const orderID = currentUrl.split("/")[5];
  modifyOrderButton.addEventListener("click", () => {
    const updatedOrder = {
      medicamentName: document.getElementById("medicamentName").value,
      qte: document.getElementById("qte").value,
      supplier: document.getElementById("supplier").value,
    };
    modifyOrder(orderID, updatedOrder);
  });
}
