
// ===============================
// CONTACT EMAIL
// ===============================

// Replace this with your actual email address before publishing.
const CONTACT_EMAIL = "your.email@example.com";


// ===============================
// MOBILE NAVIGATION MENU
// ===============================

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );

});


// Close menu after clicking a navigation link

navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// ===============================
// AUTOMATIC COPYRIGHT YEAR
// ===============================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ===============================
// CONTACT FORM VALIDATION
// ===============================

const form = document.getElementById("contactForm");

const fields = [
    "name",
    "email",
    "subject",
    "message"
];

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const values = Object.fromEntries(
        new FormData(form).entries()
    );

    let valid = true;


    // Clear previous errors

    fields.forEach((field) => {

        document.getElementById(
            `${field}Error`
        ).textContent = "";

    });


    // Function to display errors

    function showError(field, message) {

        document.getElementById(
            `${field}Error`
        ).textContent = message;

        valid = false;

    }


    // Name validation

    if (values.name.trim().length < 2) {

        showError(
            "name",
            "Please enter your name (at least 2 characters)."
        );

    }


    // Email validation

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            values.email.trim()
        )
    ) {

        showError(
            "email",
            "Please enter a valid email address."
        );

    }


    // Subject validation

    if (values.subject.trim().length < 3) {

        showError(
            "subject",
            "Please enter a subject."
        );

    }


    // Message validation

    if (values.message.trim().length < 10) {

        showError(
            "message",
            "Please write at least 10 characters."
        );

    }


    const status = document.getElementById("formStatus");


    // Stop if any field is invalid

    if (!valid) {

        status.textContent =
            "Please correct the highlighted fields and try again.";

        return;

    }


    // Check whether email has been configured

    if (CONTACT_EMAIL === "your.email@example.com") {

        status.textContent =
            "Form validated! Add your real email address in script.js before publishing.";

        return;

    }


    // Prepare email

    const body =
        `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;


    // Open visitor's email application

    status.textContent =
        "Opening your email app with the message ready to send.";

    window.location.href =
        `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;

});
