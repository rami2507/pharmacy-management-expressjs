const createMedicament = async (medicament) => {
  try {
    const url = "/api/v1/medicaments/createMedicament";

    await axios.post(url, medicament);

    alert("Medicament has been Created successfully");

    setTimeout(() => {
      location.assign("/manage-medicaments/all-medicaments");
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
      name: document.getElementById("name").value,
      price: document.getElementById("price").value,
      expDate: document.getElementById("expDate").value,
      stockQte: document.getElementById("stockQte").value,
      parOrdonnance: document.getElementById("checkOrdonnonce").value,
    };
    createMedicament(medicament);
  });
}
