document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-input");
    const dropArea = document.getElementById("drop-area");
    const fileInfo = document.getElementById("file-info");
    const fileNameElement = document.getElementById("file-name");
    const analyzeBtn = document.getElementById("analyze-btn");
    const resultsContainer = document.getElementById("results-container");
    const matchPercentage = document.getElementById("match-percentage");
    const matchBar = document.getElementById("match-bar");
    const skillMatches = document.getElementById("matched-skills");
    const experienceSection = document.getElementById("experience-result");
    const recommendationsList = document.getElementById("suggest-list");
    const loadingIndicator = document.getElementById("loading");

    const jobDescription = document.getElementById("job-description");
    const experienceInput = document.getElementById("experience");
    const educationInput = document.getElementById("education");

    const allowedFileTypes = ['pdf', 'docx', 'txt'];

    // Handle drag over event for drop area
    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("border-blue-500"); // Highlight on drag over
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("border-blue-500"); // Remove highlight when dragging leaves
    });

    // Handle file drop event
    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleFileUpload(file);
    });

    // Handle file input change (when user selects a file via the file input)
    dropArea.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        handleFileUpload(file);
    });

    // Function to handle file upload
    function handleFileUpload(file) {
        if (!file) return;

        // Validate file type
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedFileTypes.includes(fileExtension)) {
            alert("Invalid file type. Please upload a PDF, DOCX, or TXT file.");
            return;
        }

        // Show the uploaded file info
        fileNameElement.textContent = file.name;
        fileInfo.classList.remove("hidden");

        // Reset the file input
        fileInput.value = "";

        // Optionally: You can preview the file or read it if needed (e.g., extracting text or other data from PDF)
    }

    // Analyze button click event
    analyzeBtn.addEventListener("click", () => {
        const jobDesc = jobDescription.value.trim();
        const minExperience = experienceInput.value.trim();
        const education = educationInput.value.trim();

        // Check if all fields are filled out
        if (!jobDesc || !minExperience || !education || !fileNameElement.textContent) {
            alert("Please fill in all fields and upload a resume.");
            return;
        }

        // Show loading indicator
        loadingIndicator.classList.remove("hidden");

        // Simulate an API call or resume analysis (can be replaced with actual logic)
        setTimeout(() => {
            loadingIndicator.classList.add("hidden");

            // Mock the analysis results
            const matchPercentageValue = Math.floor(Math.random() * 100);
            matchPercentage.textContent = `${matchPercentageValue}%`;
            matchBar.style.width = `${matchPercentageValue}%`;

            // Mock skill matches
            const skills = ["JavaScript", "Python", "React"];
            skillMatches.innerHTML = skills
                .map(skill => `<div class="text-sm text-gray-600">✔ ${skill}</div>`)
                .join("");

            // Mock experience result
            experienceSection.textContent = `The candidate has ${Math.floor(Math.random() * 5)} years of relevant experience.`;

            // Mock recommendations
            recommendationsList.innerHTML = `
                <li>Consider adding more detailed project descriptions.</li>
                <li>Highlight technical skills more prominently.</li>
            `;

            // Show results
            resultsContainer.classList.remove("hidden");
        }, 2000); // Simulated delay
    });
});
