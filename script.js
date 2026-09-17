/* =========================================
   DISCOVER BAGGAO - TOURISM WEBSITE
   script.js
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector("#navMenu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("show");

            if (navMenu.classList.contains("show")) {
                menuBtn.textContent = "✕";
            } else {
                menuBtn.textContent = "☰";
            }
        });

        // Close menu after clicking a link
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("show");
                menuBtn.textContent = "☰";
            });
        });
    }


    // =====================================
    // DESTINATION INFORMATION
    // =====================================

    const destinations = {

        "Baggao Forests": {
            title: "Baggao Forests",
            category: "Nature",
            description:
                "Explore the lush natural landscapes surrounding Baggao. " +
                "Enjoy the peaceful environment while practicing responsible tourism.",
            tips:
                "Bring water, comfortable clothing and follow local environmental guidelines."
        },

        "Waterfalls & Rivers": {
            title: "Waterfalls & Rivers",
            category: "Adventure",
            description:
                "Experience refreshing waterways and scenic natural surroundings. " +
                "Always check current weather and local safety conditions before visiting.",
            tips:
                "Avoid swimming during unsafe weather conditions and follow local instructions."
        },

        "Mountain Adventures": {
            title: "Mountain Adventures",
            category: "Adventure",
            description:
                "Discover scenic mountain landscapes through hiking and outdoor exploration.",
            tips:
                "For unfamiliar trails, consider hiring a local guide and bring appropriate equipment."
        },

        "Caves & Rock Formations": {
            title: "Caves & Rock Formations",
            category: "Exploration",
            description:
                "Discover fascinating natural formations while respecting the surrounding environment.",
            tips:
                "Check whether a guide or local permission is required before entering a site."
        }

    };


    // =====================================
    // DESTINATION MODAL
    // =====================================

    window.showInfo = function (destinationName) {

        const modal =
            document.getElementById("infoModal");

        const modalTitle =
            document.getElementById("modalTitle");

        const modalText =
            document.getElementById("modalText");

        if (!modal || !modalTitle || !modalText) {
            return;
        }

        const destination =
            destinations[destinationName];

        if (destination) {

            modalTitle.textContent =
                destination.title;

            modalText.innerHTML = `
                <strong>Category:</strong>
                ${destination.category}
                <br><br>

                ${destination.description}

                <br><br>

                <strong>Travel Tip:</strong>
                ${destination.tips}
            `;

        } else {

            modalTitle.textContent =
                destinationName;

            modalText.textContent =
                "More information about this destination will be available soon.";

        }

        modal.classList.add("show");
    };


    // =====================================
    // CLOSE MODAL
    // =====================================

    window.closeInfo = function () {

        const modal =
            document.getElementById("infoModal");

        if (modal) {
            modal.classList.remove("show");
        }
    };


    // =====================================
    // CLOSE MODAL BY CLICKING OUTSIDE
    // =====================================

    const infoModal =
        document.getElementById("infoModal");

    if (infoModal) {

        infoModal.addEventListener("click", function (event) {

            if (event.target === infoModal) {
                closeInfo();
            }

        });
    }


    // =====================================
    // ESCAPE KEY
    // =====================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeInfo();

            if (navMenu) {
                navMenu.classList.remove("show");
            }

            if (menuBtn) {
                menuBtn.textContent = "☰";
            }
        }

    });


    // =====================================
    // SMOOTH SCROLLING
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================
    // SCROLL TO TOP BUTTON
    // =====================================

    const topButton =
        document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.className = "back-to-top";

    topButton.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(topButton);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            topButton.classList.add("visible");

        } else {

            topButton.classList.remove("visible");

        }

    });


    topButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // =====================================
    // FAVORITE DESTINATIONS
    // =====================================

    let favorites =
        JSON.parse(
            localStorage.getItem("baggaoFavorites")
        ) || [];


    window.toggleFavorite = function (destination) {

        const index =
            favorites.indexOf(destination);

        if (index === -1) {

            favorites.push(destination);

            showNotification(
                "❤️ Added to your favorites!"
            );

        } else {

            favorites.splice(index, 1);

            showNotification(
                "Removed from favorites."
            );
        }

        localStorage.setItem(
            "baggaoFavorites",
            JSON.stringify(favorites)
        );

        updateFavoriteButtons();
    };


    function updateFavoriteButtons() {

        const buttons =
            document.querySelectorAll(
                "[data-favorite]"
            );

        buttons.forEach(function (button) {

            const destination =
                button.dataset.favorite;

            if (favorites.includes(destination)) {

                button.classList.add("favorite-active");

                button.textContent = "❤️";

            } else {

                button.classList.remove(
                    "favorite-active"
                );

                button.textContent = "♡";
            }

        });

    }

    updateFavoriteButtons();


    // =====================================
    // NOTIFICATION
    // =====================================

    window.showNotification = function (message) {

        const oldNotification =
            document.querySelector(".tourism-notification");

        if (oldNotification) {
            oldNotification.remove();
        }


        const notification =
            document.createElement("div");

        notification.className =
            "tourism-notification";

        notification.textContent =
            message;


        Object.assign(notification.style, {

            position: "fixed",
            bottom: "25px",
            left: "50%",

            transform:
                "translateX(-50%)",

            background: "#176b3a",
            color: "#ffffff",

            padding:
                "12px 24px",

            borderRadius:
                "30px",

            fontSize:
                "14px",

            fontWeight:
                "bold",

            zIndex: "9999",

            boxShadow:
                "0 5px 20px rgba(0,0,0,0.2)",

            animation:
                "notificationIn 0.3s ease"

        });


        document.body.appendChild(
            notification
        );


        setTimeout(function () {

            notification.style.opacity = "0";

            notification.style.transition =
                "opacity 0.3s ease";

            setTimeout(function () {

                notification.remove();

            }, 300);

        }, 2000);

    };


    // =====================================
    // DESTINATION SEARCH
    // =====================================

    const searchInput =
        document.getElementById(
            "destinationSearch"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const search =
                    this.value
                        .toLowerCase()
                        .trim();


                const cards =
                    document.querySelectorAll(
                        ".destination-card"
                    );


                cards.forEach(function (card) {

                    const text =
                        card.textContent
                            .toLowerCase();

                    if (text.includes(search)) {

                        card.style.display =
                            "block";

                    } else {

                        card.style.display =
                            "none";
                    }

                });

            }
        );

    }


    // =====================================
    // DESTINATION CATEGORY FILTER
    // =====================================

    const filterButtons =
        document.querySelectorAll(
            "[data-filter]"
        );


    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const filter =
                    this.dataset.filter;


                filterButtons.forEach(
                    function (btn) {
                        btn.classList.remove(
                            "active"
                        );
                    }
                );


                this.classList.add("active");


                const cards =
                    document.querySelectorAll(
                        ".destination-card"
                    );


                cards.forEach(function (card) {

                    const category =
                        card.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.style.display =
                            "block";

                    } else {

                        card.style.display =
                            "none";
                    }

                });

            }
        );

    });
    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });
    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(function (image) {

        image.setAttribute(
            "loading",
            "lazy"
        );

    });
    console.log(
        "🌿 Discover Baggao tourism website loaded successfully."
    );

});
