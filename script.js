const track = document.querySelector(".slider-track");
const slides = track.querySelectorAll(".slide");
const previousButton = document.querySelector(".slider-btn.prev");
const nextButton = document.querySelector(".slider-btn.next");
const indicators = document.querySelector(".slider-indicators");

let currentSlide = 0;

const indicatorButtons = Array.from(slides, (slide, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "slider-indicator";
    button.setAttribute("aria-label", `Go to slide ${index + 1}`);
    button.addEventListener("click", () => showSlide(index));
    indicators.append(button);
    return button;
});

function showSlide(index) {
    if (slides.length === 0) return;

    currentSlide = ((index % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    indicatorButtons.forEach((button, buttonIndex) => {
        const isActive = buttonIndex === currentSlide;
        button.classList.toggle("is-active", isActive);
        if (isActive) {
            button.setAttribute("aria-current", "true");
        } else {
            button.removeAttribute("aria-current");
        }
    });
}

if (slides.length > 0) {
    previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
    nextButton.addEventListener("click", () => showSlide(currentSlide + 1));
    showSlide(currentSlide);
} else {
    previousButton.hidden = true;
    nextButton.hidden = true;
}
