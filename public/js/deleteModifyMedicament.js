console.log("JS FILE LINKED");

const deleteMedicament = async (id) => {
  const url = `/api/v1/medicaments/deleteMedicament/${id}`;

  await axios.delete(url);

  alert("Medicament has been deleted successfully");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign("/manage-medicaments/all-medicaments");
  }, 800);
};

const modifyMedicament = async (id, updatedData) => {
  const url = `/api/v1/medicaments/modifyMedicament/${id}`;

  await axios.patch(url, updatedData);

  alert("Medicament has been Modified successfully");

  // Reload or redirect after successful deletion
  setTimeout(() => {
    location.assign(`/manage-medicaments/all-medicaments`);
  }, 800);
};

const deleteMedicamentButton = document.querySelector(".btn--delete");
const modifyMedicamentButton = document.querySelector(".btn--accept");

if (deleteMedicamentButton) {
  const currentUrl = window.location.href;
  const medicamentID = currentUrl.split("/")[6];
  // Pass a function reference to the event listener
  deleteMedicamentButton.addEventListener("click", () => {
    deleteMedicament(medicamentID);
  });
}

if (modifyMedicamentButton) {
  const currentUrl = window.location.href;
  const medicamentID = currentUrl.split("/")[6];
  modifyMedicamentButton.addEventListener("click", () => {
    const updatedData = {
      name: document.getElementById("name").value,
      price: document.getElementById("price").value,
      expDate: document.getElementById("expDate").value,
      stockQte: document.getElementById("stockQte").value,
    };
    modifyMedicament(medicamentID, updatedData);
  });
}
