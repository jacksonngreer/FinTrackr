document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const expenseInput = document.getElementById("expenseInput");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const expenseList = document.getElementById("expenseList");

    // Load expenses from localStorage
    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.forEach(expenseText => {
            createExpenseItem(expenseText);
        });
    }

    // Save expenses to localStorage
    function saveExpenses() {
        const expenses = [];
        expenseList.querySelectorAll("li").forEach(li => {
            expenses.push(li.firstChild.textContent.trim());
        });
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    // Create a new expense item
    function createExpenseItem(expenseText) {
        // Create a new list item
        const li = document.createElement("li");
        li.textContent = expenseText;

        // Create a remove button for the expense
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.classList.add("expenses-remove-button");

        // Attach remove functionality to the remove button
        removeBtn.addEventListener("click", function () {
            expenseList.removeChild(li);
            saveExpenses(); // Update localStorage after removal
        });

        // Append the button to the list item
        li.appendChild(removeBtn);

        // Add the new list item to the expense list
        expenseList.appendChild(li);
    }

    // Add event listener for Add Expense button
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener("click", function () {
            const expenseText = expenseInput.value.trim();

            if (expenseText !== "") {
                createExpenseItem(expenseText); // Create the expense in the list
                saveExpenses(); // Save the updated list to localStorage
                expenseInput.value = ""; // Clear the input field
            } else {
                alert("Please enter an expense.");
            }
        });
    }

    // Add event listener to trigger the button click when "Enter" is pressed
    if (expenseInput) {
        expenseInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent the default behavior (form submission)
                addExpenseBtn.click(); // Trigger the button's click event
            }
        });
    }

    // Load existing expenses when the page loads
    loadExpenses();
});
