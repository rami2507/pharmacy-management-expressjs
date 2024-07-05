document.addEventListener("DOMContentLoaded", function () {
  const medicamentNumberInput = document.getElementById("medicamentNumber");
  const nextLink = document.getElementById("nextLink");

  medicamentNumberInput.addEventListener("input", function () {
    const value = medicamentNumberInput.value;
    nextLink.href = `/create-sale/free-sale/${value}`;
  });
});
