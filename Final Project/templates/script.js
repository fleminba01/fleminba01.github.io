document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("application-form");
    const tableBody = document.getElementById("applications-table-body");

    // Load saved applications from Local Storage
    const loadApplications = () => {
        const applications = JSON.parse(localStorage.getItem("applications")) || [];
        applications.forEach(application => addApplicationRow(application));
    };

    // Save applications to Local Storage
    const saveApplications = (applications) => {
        localStorage.setItem("applications", JSON.stringify(applications));
    };

    // Add a new row to the table
    const addApplicationRow = (application) => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${application.jobTitle}</td>
            <td>${application.company}</td>
            <td>${application.jobDescription || "N/A"}</td>
            <td>${application.notes || "N/A"}</td>
            <td>
                <select class="status-dropdown" data-id="${application.id}">
                    <option value="applied" ${application.status === 'applied' ? 'selected' : ''}>Applied</option>
                    <option value="interview" ${application.status === 'interview' ? 'selected' : ''}>Interview</option>
                    <option value="offer" ${application.status === 'offer' ? 'selected' : ''}>Offer</option>
                    <option value="rejected" ${application.status === 'rejected' ? 'selected' : ''}>Rejected</option>
                </select>
            </td>
            <td>
                <button class="delete-btn" data-id="${application.id}">Delete</button>
            </td>
        `;

        tableBody.appendChild(newRow);
    };

    // Event listener for form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const jobTitle = document.getElementById("job-title").value;
        const company = document.getElementById("company").value;
        const jobDescription = document.getElementById("job-description").value;
        const notes = document.getElementById("notes").value;
        const status = document.getElementById("status").value;

        const applications = JSON.parse(localStorage.getItem("applications")) || [];
        const newApplication = {
            id: Date.now().toString(), // Unique ID
            jobTitle,
            company,
            jobDescription,
            notes,
            status,
        };

        applications.push(newApplication);
        saveApplications(applications);
        addApplicationRow(newApplication);
        form.reset();
    });

    // Event delegation for status updates and delete buttons
    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const applicationId = e.target.getAttribute("data-id");
            let applications = JSON.parse(localStorage.getItem("applications")) || [];
            applications = applications.filter(app => app.id !== applicationId);
            saveApplications(applications);
            e.target.closest("tr").remove();
        }
    });

    tableBody.addEventListener("change", (e) => {
        if (e.target.classList.contains("status-dropdown")) {
            const applicationId = e.target.getAttribute("data-id");
            const newStatus = e.target.value;
            const applications = JSON.parse(localStorage.getItem("applications")) || [];
            const application = applications.find(app => app.id === applicationId);
            if (application) {
                application.status = newStatus;
                saveApplications(applications);
            }
        }
    });

    // Load existing applications on page load
    loadApplications();
});
