window.onload = function () {
  console.log('Index page loaded');
  loadPortfolio();

  // Retrieve and convert fixedMonthlyExpenses to a number
  const fixedMonthlyExpenses = parseFloat(localStorage.getItem("fixedMonthlyExpenses"));
  if (!isNaN(fixedMonthlyExpenses)) {
      // Format the value with commas and display it
      document.getElementById("fixed-monthly-expenses").innerText = formatMoney(fixedMonthlyExpenses);
  } else {
      document.getElementById("fixed-monthly-expenses").innerText = "0.00";  // Default value if not found or invalid
  }

  // Retrieve and convert variableMonthlyExpenses to a number
  const variableMonthlyExpenses = parseFloat(localStorage.getItem("variableMonthlyExpenses"));
  if (!isNaN(variableMonthlyExpenses)) {
      // Format the value with commas and display it
      document.getElementById("variable-monthly-expenses").innerText = formatMoney(variableMonthlyExpenses);
  } else {
      document.getElementById("variable-monthly-expenses").innerText = "0.00";  // Default value if not found or invalid
  }

  // Retrieve and convert annual income after taxes to a number
  const annualAfterTaxes = parseFloat(localStorage.getItem("annualIncomeAfterTaxes"));
  if (!isNaN(annualAfterTaxes)) {
      const monthlyAfterTaxes = annualAfterTaxes / 12;

      // Calculate monthly disposable income
      const monthlyDisposable = monthlyAfterTaxes - (isNaN(fixedMonthlyExpenses) ? 0 : fixedMonthlyExpenses) - (isNaN(variableMonthlyExpenses) ? 0 : variableMonthlyExpenses);

      // Format the values with commas and display them
      document.getElementById("annual-income-after-taxes").innerText = formatMoney(annualAfterTaxes);
      document.getElementById("monthly-income-after-taxes").innerText = formatMoney(monthlyAfterTaxes);
      document.getElementById("monthly-disposable-income").innerText = formatMoney(monthlyDisposable);
  } else {
      // Handle the case where annualIncomeAfterTaxes is invalid
      document.getElementById("annual-income-after-taxes").innerText = "0.00";
      document.getElementById("monthly-income-after-taxes").innerText = "0.00";
      document.getElementById("monthly-disposable-income").innerText = "0.00";
  }
};

// Helper function to format money with commas
function formatMoney(amount) {
  return parseFloat(amount).toLocaleString(); // This will add commas to the number
}

// Get elements for modal and buttons
const clearStorageBtn = document.getElementById("clear-storage-btn");
const modal = document.getElementById("confirm-modal");
const backBtn = document.getElementById("back-btn");
const clearBtn = document.getElementById("clear-btn");

// Show the modal when the "Clear All Data" button is clicked
clearStorageBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Hide the modal when the "Back" button is clicked
backBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Clear local storage when the "Clear" button is clicked and hide the modal
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  modal.style.display = "none"; // Hide the modal after action
  location.reload(); // Reload the page to reflect the cleared data
});

// Function to export localStorage as JSON
function exportLocalStorage() {
  // Retrieve all items in localStorage as an object
  const storageData = {};
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      storageData[key] = value;
  }

  // Convert the storageData object to a JSON string
  const jsonData = JSON.stringify(storageData, null, 2);

  // Create a Blob from the JSON string
  const blob = new Blob([jsonData], { type: "application/json" });

  // Create a download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob); // Create a URL for the Blob
  link.download = "localStorageBlob.json"; // Set the file name for the download

  // Programmatically click the link to trigger the download
  link.click();
}

// Add an event listener to the export button
document.getElementById("exportBtn").addEventListener("click", exportLocalStorage);

// Function to import JSON into localStorage
function importLocalStorage() {
  const fileInput = document.getElementById("importFile");
  const file = fileInput.files[0];

  if (!file) {
      alert("Please select a file to import!");
      return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
      try {
          // Parse the file content as JSON
          const data = JSON.parse(event.target.result);

          // Store each key-value pair in localStorage
          Object.entries(data).forEach(([key, value]) => {
              localStorage.setItem(key, value);
          });

          alert("Data imported successfully into localStorage!");
          location.reload(); // Reload to reflect the new data
      } catch (e) {
          alert("Invalid JSON file. Please check the file format.");
          console.error(e);
      }
  };

  reader.readAsText(file); // Read the file content as text
}

// Trigger file input click event when the import button is clicked
document.getElementById("importBtn").addEventListener("click", () => {
  document.getElementById("importFile").click(); // Simulate click on file input
});

// Event listener for the file input change event (when a file is selected)
document.getElementById("importFile").addEventListener("change", importLocalStorage);