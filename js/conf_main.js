const requestButton =
    document.getElementById("requestButton");

const notification =
    document.getElementById("notification");


requestButton.addEventListener(
    "click",
    () => {

        notification.classList.add("show");


        setTimeout(() => {

            notification.classList.remove(
                "show"
            );

        }, 3000);

    }
);


window.addEventListener(
    "scroll",
    () => {

        const header =
            document.querySelector(".header");


        if (window.scrollY > 30) {

            header.style.borderBottomColor =
                "#333";

        } else {

            header.style.borderBottomColor =
                "#282828";

        }

    }
);