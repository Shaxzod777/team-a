document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       SCROLL / ENTRANCE ANIMATION
    ========================= */

    const revealItems =
        document.querySelectorAll(
            ".reveal, .image-reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealItems.forEach((item, index) => {

        item.style.transitionDelay =
            `${Math.min(index * 70, 350)}ms`;

        revealObserver.observe(item);

    });



    /* =========================
       TEST DRIVE MODAL
    ========================= */

    const modal =
        document.getElementById(
            "testDriveModal"
        );

    const openButton =
        document.getElementById(
            "openTestDrive"
        );

    const locationButton =
        document.getElementById(
            "locationTestDrive"
        );

    const closeButton =
        document.getElementById(
            "closeTestDrive"
        );

    const form =
        document.getElementById(
            "testDriveForm"
        );


    function openModal(event) {

        if (event) {
            event.preventDefault();
        }

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeModal() {

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    openButton?.addEventListener(
        "click",
        openModal
    );


    locationButton?.addEventListener(
        "click",
        openModal
    );


    closeButton?.addEventListener(
        "click",
        closeModal
    );


    document
        .querySelectorAll(".footer-test-drive")
        .forEach((button) => {

            button.addEventListener(
                "click",
                openModal
            );

        });


    modal?.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal?.classList.contains("open")
            ) {

                closeModal();

            }

        }
    );


    form?.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            closeModal();

        }
    );

});