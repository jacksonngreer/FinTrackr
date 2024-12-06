document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const reminderInput = document.getElementById("reminderInput");
    const addReminderBtn = document.getElementById("addReminderBtn");
    const reminderList = document.getElementById("reminderList");

    // Load reminders from localStorage
    function loadReminders() {
        const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        reminders.forEach(reminderText => {
            createReminderItem(reminderText);
        });
    }

    // Save reminders to localStorage
    function saveReminders() {
        const reminders = [];
        reminderList.querySelectorAll("li").forEach(li => {
            reminders.push(li.firstChild.textContent.trim());
        });
        localStorage.setItem("reminders", JSON.stringify(reminders));
    }

    // Create a new reminder item
    function createReminderItem(reminderText) {
        // Create a new list item
        const li = document.createElement("li");
        li.textContent = reminderText;

        // Create a remove button for the reminder
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.classList.add("remove-btn");

        // Create an edit button for the reminder
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        // Attach remove functionality to the remove button
        removeBtn.addEventListener("click", function () {
            reminderList.removeChild(li);
            saveReminders(); // Update localStorage after removal
        });

        // Attach edit functionality to the edit button
        editBtn.addEventListener("click", function () {
            const newReminderText = prompt("Edit reminder:", reminderText);
            if (newReminderText && newReminderText.trim() !== "") {
                li.firstChild.textContent = newReminderText.trim(); // Update the reminder text
                saveReminders(); // Save the updated reminders list
            }
        });

        // Append the buttons to the list item
        li.appendChild(editBtn);
        li.appendChild(removeBtn);

        // Add the new list item to the reminder list
        reminderList.appendChild(li);
    }

    // Add event listener for Add Reminder button
    if (addReminderBtn) {
        addReminderBtn.addEventListener("click", function () {
            const reminderText = reminderInput.value.trim();

            if (reminderText !== "") {
                createReminderItem(reminderText); // Create the reminder in the list
                saveReminders(); // Save the updated list to localStorage
                reminderInput.value = ""; // Clear the input field
            } else {
                alert("Please enter a reminder.");
            }
        });
    }

    // Add event listener to trigger the button click when "Enter" is pressed
    if (reminderInput) {
        reminderInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent the default behavior (form submission)
                addReminderBtn.click(); // Trigger the button's click event
            }
        });
    }

    // Load existing reminders when the page loads
    loadReminders();
});
