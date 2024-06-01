document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add("animate-slide-right");
        } else {
            section.classList.add("animate-slide-left");
        }
    });
});
