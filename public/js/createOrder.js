const createOrder = async (order) => {
  try {
    const url = "/api/v1/orders/createOrder";

    await axios.post(url, order);

    alert("Order has been created successfully");

    setTimeout(() => {
      location.assign("/manage-orders");
    }, 800);
  } catch (err) {
    alert(err.response);
    console.log(err.response.data.message);
  }
};

const createOrderButton = document.querySelector(".btn--accept");

if (createOrderButton) {
  createOrderButton.addEventListener("click", () => {
    const order = {
      medicamentName: document.getElementById("medicamentName").value,
      qte: document.getElementById("qte").value,
      supplier: document.getElementById("supplier").value,
    };
    createOrder(order);
  });
}
