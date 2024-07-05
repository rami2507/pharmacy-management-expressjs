const createSaleGros = async (medicament) => {
  try {
    const url = "/api/v1/sales/createSale/gros/gros";

    await axios.post(url, medicament);

    alert("Gros SALE has been Created successfully");

    setTimeout(() => {
      location.assign("/view-sales");
    }, 800);
  } catch (err) {
    alert(err.response);
    console.log(err.response.data.message);
  }
};

const addMedicamentButton = document.querySelector(".btn--accept");

if (addMedicamentButton) {
  addMedicamentButton.addEventListener("click", () => {
    const medicament = {
      medName: document.getElementById("medName").value,
      qte: document.getElementById("qte").value,
      pharmacy: {
        phName: document.getElementById("phName").value,
        phAddress: document.getElementById("phAddress").value,
        phone: document.getElementById("phone").value,
      },
    };
    createSaleGros(medicament);
  });
}
