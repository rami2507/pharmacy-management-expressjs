const createSale = async (medicaments, type) => {
  try {
    const url = `/api/v1/sales/createSale/${type}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ medicaments, type }), // Make sure this is an object with the array inside
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create sale");
    }

    const data = await response.json();
    alert(`total price: ${data.data.totalPrice} DA`);
    // alert("Sale has been created successfully");

    setTimeout(() => {
      location.assign("/create-sale");
    }, 800);
  } catch (error) {
    alert(`Error: ${error.message}`);
    console.error("Error creating sale:", error);
  }
};

const createSaleButton = document.querySelector(".btn--accept");

// TYEP OF SALE
const type = window.location.href.split("/")[4];

if (createSaleButton) {
  createSaleButton.addEventListener("click", () => {
    const medicamentElements = document.querySelectorAll(".medicament");
    let medicaments = [];
    medicamentElements.forEach((medicamentElement) => {
      // Get the medicament name and quantity input elements
      const nameInput = medicamentElement.querySelector('input[name="name"]');
      const qteInput = medicamentElement.querySelector('input[name="qte"]');

      // Create an object representing the medicament
      const medicament = {
        name: nameInput.value,
        qte: qteInput.value,
      };

      // Add the medicament object to the array
      medicaments.push(medicament);
    });
    createSale(medicaments, type);
  });
}
