let selectedCategory = "A-Class";

let selectedCar = null;

let selectedColor = null;
let selectedWheel = null;
let selectedInterior = null;


const categoryList =
    document.getElementById("categoryList");

const carList =
    document.getElementById("carList");

const carImage =
    document.getElementById("carImage");

const imageWrapper =
    document.querySelector(".image-wrapper");

const titleModel =
    document.getElementById("titleModel");

const previewCategory =
    document.getElementById("previewCategory");

const previewYear =
    document.getElementById("previewYear");

const previewName =
    document.getElementById("previewName");

const totalPrice =
    document.getElementById("totalPrice");

const summaryPrice =
    document.getElementById("summaryPrice");

const summaryModel =
    document.getElementById("summaryModel");

const summaryColor =
    document.getElementById("summaryColor");

const summaryWheel =
    document.getElementById("summaryWheel");

const summaryInterior =
    document.getElementById("summaryInterior");

const selectedColorName =
    document.getElementById("selectedColorName");

const selectedWheelName =
    document.getElementById("selectedWheelName");

const selectedInteriorName =
    document.getElementById("selectedInteriorName");

const colorOptions =
    document.getElementById("colorOptions");

const wheelOptions =
    document.getElementById("wheelOptions");

const interiorOptions =
    document.getElementById("interiorOptions");


/* Пользователь мог выключить анимации в системе — уважаем это */
const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


function formatPrice(price) {

    return new Intl.NumberFormat("en-US")
        .format(price);

}


function getCarsByCategory(category) {

    return cars.filter(
        car => car.category === category
    );

}


/* ===== КАРТИНКА: ЗАГРУЗКА + ПЛАВНАЯ СМЕНА ===== */

/* какой src сейчас показан — чтобы не перерисовывать лишний раз */
let currentImageSrc = "";


function preloadImage(src) {

    return new Promise(resolve => {

        const temp = new Image();

        temp.onload = () => resolve(true);
        temp.onerror = () => resolve(false);

        temp.src = src;

    });

}


/* небольшая пауза, чтобы затухание успело проиграться */
function wait(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


async function setCarImage(src) {

    if (!src || src === currentImageSrc) {
        return;
    }

    currentImageSrc = src;


    if (reducedMotion) {

        carImage.src = src;

        return;
    }


    imageWrapper.classList.add("loading");

    carImage.classList.add("change");


    /* ждём и картинку, и минимальное время анимации */
    const [loaded] = await Promise.all([
        preloadImage(src),
        wait(260)
    ]);


    /* пока грузили, пользователь мог кликнуть другой цвет */
    if (src !== currentImageSrc) {
        return;
    }


    if (loaded) {
        carImage.src = src;
    }


    imageWrapper.classList.remove("loading");

    carImage.classList.remove("change");

    /* короткая «подача» новой картинки */
    carImage.classList.add("enter");

    setTimeout(
        () => carImage.classList.remove("enter"),
        600
    );

}


/* ===== ПЛАВНЫЙ СЧЁТЧИК ЦЕНЫ ===== */

function animateNumber(element, to) {

    const from =
        Number(
            String(element.textContent)
                .replace(/[^\d]/g, "")
        ) || 0;


    if (reducedMotion || from === to) {

        element.textContent = formatPrice(to);

        return;
    }


    const duration = 550;

    const start = performance.now();


    function step(now) {

        const progress =
            Math.min((now - start) / duration, 1);

        /* easeOutCubic */
        const eased =
            1 - Math.pow(1 - progress, 3);

        const value =
            Math.round(from + (to - from) * eased);


        element.textContent =
            formatPrice(value);


        if (progress < 1) {
            requestAnimationFrame(step);
        }

    }


    requestAnimationFrame(step);

}


/* ===== РЕНДЕР ===== */

function renderCategories() {

    categoryList.innerHTML = "";

    categories.forEach((category, index) => {

        const button =
            document.createElement("button");

        button.className =
            "category-card";

        button.style.setProperty("--i", index);

        if (category.id === selectedCategory) {
            button.classList.add("active");
        }

        button.innerHTML = `
            <div class="category-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <h3>
                ${category.name}
            </h3>

            <p>
                ${category.description}
            </p>
        `;

        button.addEventListener(
            "click",
            () => {

                selectedCategory =
                    category.id;

                renderCategories();

                renderCars();

            }
        );

        categoryList.appendChild(button);

    });

}


function renderCars() {

    carList.innerHTML = "";

    const availableCars =
        getCarsByCategory(selectedCategory);


    if (availableCars.length === 0) {

        carList.innerHTML = `
            <div class="unavailable">
                Автомобили этого типа
                в данный момент не доступны
            </div>
        `;

        return;
    }


    availableCars.forEach((car, index) => {

        const card =
            document.createElement("button");

        card.className = "car-card pop-in";

        card.style.setProperty("--i", index);


        if (
            selectedCar &&
            selectedCar.id === car.id
        ) {
            card.classList.add("active");
        }


        card.innerHTML = `
            <span>
                ${car.category}
            </span>

            <h3>
                ${car.name}
            </h3>

            <p>
                From $${formatPrice(car.price)}
            </p>
        `;


        card.addEventListener(
            "click",
            () => {

                selectCar(car);

                renderCars();

            }
        );


        carList.appendChild(card);

    });

}


function selectCar(car) {

    selectedCar = car;

    selectedColor =
        car.colors[0];

    selectedWheel =
        car.wheels[0];

    selectedInterior =
        car.interiors[0];


    updateCarPreview();

    renderColors();

    renderWheels();

    renderInteriors();

    updateSummary();

}


/* картинка берётся у цвета, если её нет — общая картинка модели */
function getCurrentImage() {

    return (
        (selectedColor && selectedColor.image) ||
        selectedCar.image
    );

}


function updateCarPreview() {

    if (!selectedCar) {
        return;
    }


    setCarImage(getCurrentImage());


    carImage.alt =
        selectedCar.name +
        (selectedColor ? " — " + selectedColor.name : "");


    titleModel.textContent =
        selectedCar.category.toUpperCase();


    previewCategory.textContent =
        selectedCar.category.toUpperCase();


    previewYear.textContent =
        selectedCar.years || "CURRENT";


    previewName.textContent =
        selectedCar.name;

}


function renderColors() {

    colorOptions.innerHTML = "";


    selectedCar.colors.forEach((color, index) => {

        const button =
            document.createElement("button");

        button.className =
            "color-option pop-in";

        button.style.setProperty("--i", index);

        button.type = "button";


        if (
            selectedColor.id === color.id
        ) {
            button.classList.add("active");
        }


        button.title =
            color.name +
            (color.price
                ? ` · +$${formatPrice(color.price)}`
                : " · Included");


        button.setAttribute(
            "aria-label",
            button.title
        );


        button.innerHTML = `
            <div
                class="color-inner"
                style="
                    background:${color.color};
                "
            ></div>
        `;


        button.addEventListener(
            "click",
            () => {

                if (selectedColor.id === color.id) {
                    return;
                }

                selectedColor = color;

                /* главное: меняем фото под выбранный цвет */
                setCarImage(getCurrentImage());

                carImage.alt =
                    selectedCar.name +
                    " — " + color.name;

                renderColors();

                updateSummary();

            }
        );


        colorOptions.appendChild(button);

    });

}


function renderWheels() {

    wheelOptions.innerHTML = "";


    selectedCar.wheels.forEach((wheel, index) => {

        const button =
            document.createElement("button");

        button.className =
            "wheel-option pop-in";

        button.style.setProperty("--i", index);

        button.type = "button";


        if (
            selectedWheel.id === wheel.id
        ) {
            button.classList.add("active");
        }


        const price =
            wheel.price === 0
                ? "Included"
                : `+$${formatPrice(wheel.price)}`;


        button.innerHTML = `
            <span>
                ${wheel.name}
            </span>

            <span class="wheel-price">
                ${price}
            </span>
        `;


        button.addEventListener(
            "click",
            () => {

                selectedWheel = wheel;

                renderWheels();

                updateSummary();

            }
        );


        wheelOptions.appendChild(button);

    });

}


function renderInteriors() {

    interiorOptions.innerHTML = "";


    selectedCar.interiors.forEach(
        (interior, index) => {

            const button =
                document.createElement("button");

            button.className =
                "interior-option pop-in";

            button.style.setProperty("--i", index);

            button.type = "button";


            if (
                selectedInterior.id ===
                interior.id
            ) {
                button.classList.add("active");
            }


            button.innerHTML = `
                <div class="interior-preview"></div>

                <span>
                    ${interior.name}
                </span>
            `;


            button.addEventListener(
                "click",
                () => {

                    selectedInterior =
                        interior;

                    renderInteriors();

                    updateSummary();

                }
            );


            interiorOptions.appendChild(button);

        }
    );

}


function calculateTotal() {

    return (
        selectedCar.price +
        selectedColor.price +
        selectedWheel.price +
        selectedInterior.price
    );

}


function updateSummary() {

    if (!selectedCar) {
        return;
    }


    const total =
        calculateTotal();


    animateNumber(totalPrice, total);

    animateNumber(summaryPrice, total);


    summaryModel.textContent =
        selectedCar.category;


    summaryColor.textContent =
        selectedColor.name;


    summaryWheel.textContent =
        selectedWheel.name;


    summaryInterior.textContent =
        selectedInterior.name;


    selectedColorName.textContent =
        selectedColor.name;


    selectedWheelName.textContent =
        selectedWheel.name;


    selectedInteriorName.textContent =
        selectedInterior.name;


    /* короткая вспышка на изменившихся строках */
    flash(selectedColorName);
    flash(selectedWheelName);
    flash(selectedInteriorName);

}


function flash(element) {

    if (reducedMotion) {
        return;
    }

    element.classList.remove("flash");

    /* перезапуск анимации */
    void element.offsetWidth;

    element.classList.add("flash");

}


/* ===== ПОЯВЛЕНИЕ БЛОКОВ ПРИ СКРОЛЛЕ ===== */

function initScrollReveal() {

    const targets =
        document.querySelectorAll(
            ".top, .category-section, .builder, .site-footer"
        );


    if (reducedMotion || !("IntersectionObserver" in window)) {

        targets.forEach(
            element => element.classList.add("revealed")
        );

        return;
    }


    targets.forEach(
        element => element.classList.add("reveal")
    );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList
                            .add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );


    targets.forEach(
        element => observer.observe(element)
    );

}


function initializeConfigurator() {

    renderCategories();

    renderCars();


    const firstCar =
        getCarsByCategory(
            selectedCategory
        )[0];


    if (firstCar) {

        selectCar(firstCar);

    }


    initScrollReveal();

}


initializeConfigurator();


/* ===== TEST DRIVE MODAL ===== */

(function initTestDriveModal() {

    const modal = document.getElementById("testDriveModal");
    const openButton = document.getElementById("openTestDrive");
    const closeButton = document.getElementById("closeTestDrive");
    const form = document.getElementById("testDriveForm");
    const footerButtons = document.querySelectorAll(".footer-test-drive");

    if (!modal || !openButton) {
        return;
    }

    function openModal(event) {
        if (event) event.preventDefault();

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        const firstInput = modal.querySelector("input");
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    openButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);

    footerButtons.forEach(button => {
        button.addEventListener("click", openModal);
    });

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            closeModal();
        });
    }

})();