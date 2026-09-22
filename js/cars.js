document.addEventListener("DOMContentLoaded", () => {

    /* Smooth reveal on first load and while scrolling */
    const revealItems = document.querySelectorAll(".reveal, .image-reveal");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
        revealObserver.observe(item);
    });

    /* Smooth image rotation on hover.
       Each card uses only the images already stored in public/photos. */
    document.querySelectorAll(".model-card").forEach((card) => {
        const images = [...card.querySelectorAll(".model-img")];
        if (images.length < 2) return;

        let timer = null;
        let index = 0;

        const showNext = () => {
            images[index].classList.remove("active");
            index = (index + 1) % images.length;
            images[index].classList.add("active");
        };

        card.addEventListener("mouseenter", () => {
            timer = setInterval(showNext, 1100);
        });

        card.addEventListener("mouseleave", () => {
            clearInterval(timer);
            timer = null;
            images[index].classList.remove("active");
            index = 0;
            images[index].classList.add("active");
        });
    });

    /* Test-drive modal */
    const modal = document.getElementById("testDriveModal");
    const openButton = document.getElementById("openTestDrive");
    const closeButton = document.getElementById("closeTestDrive");
    const form = document.getElementById("testDriveForm");

    const openModal = (event) => {
        if (event) event.preventDefault();
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    openButton?.addEventListener("click", openModal);
    closeButton?.addEventListener("click", closeModal);

    document.querySelectorAll(".footer-test-drive").forEach((button) => {
        button.addEventListener("click", openModal);
    });

    modal?.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal?.classList.contains("open")) {
            closeModal();
        }
    });

    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModal();
    });
});
