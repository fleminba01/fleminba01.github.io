// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("application-form");
    const tableBody = document.getElementById("applications-table-body");

    // Event listener for form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form data
        const jobTitle = document.getElementById("job-title").value;
        const company = document.getElementById("company").value;
        const status = document.getElementById("status").value;

        // Add a new row to the table
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${jobTitle}</td>
            <td>${company}</td>
            <td>${status}</td>
            <td>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        tableBody.appendChild(newRow);

        // Clear form fields
        form.reset();
    });

    // Event delegation for delete buttons
    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const row = e.target.closest("tr");
            row.remove();
        }
    });
});
