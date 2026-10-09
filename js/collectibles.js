document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const params = new URLSearchParams(window.location.search);

    const celebrityId =
        params.get("celebrity") ||
        localStorage.getItem("selectedCelebrity") ||
        "avery-king";

    const celebrityData =
        typeof celebrities !== "undefined" && celebrities
            ? celebrities[celebrityId]
            : null;

    const celebrityName =
        celebrityData && celebrityData.name
            ? celebrityData.name
            : "Your Favourite Artist";

    const productGrid = document.getElementById("collectiblesProductGrid");
    const celebrityNameElement = document.getElementById("collectiblesCelebrityName");
    const heroDescription = document.getElementById("collectiblesHeroDescription");
    const intro = document.getElementById("collectiblesIntro");
    const cartCount = document.getElementById("cartCount");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartItemsElement = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");
    const productModal = document.getElementById("productModal");
    const customerEmail = document.getElementById("customerEmail");
    const checkoutButton = document.getElementById("checkoutButton");

    const currency = "USD";

    const formatMoney = value =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            maximumFractionDigits: 2
        }).format(Number(value) || 0);


    /* =========================================
       CELEBRITY INFORMATION
    ========================================= */

    if (celebrityNameElement) {
        celebrityNameElement.textContent = celebrityName;
    }

    if (heroDescription) {
        heroDescription.textContent =
            `Explore keepsakes, display pieces, and collectible designs inspired by ${celebrityName} and the moments fans treasure.`;
    }

    if (intro) {
        intro.textContent =
            `A curated collection of keepsakes and display-worthy pieces inspired by ${celebrityName}. Product artwork and descriptions are illustrative unless a verified edition is explicitly stated.`;
    }

    document.title = `${celebrityName} Collectibles | THE EXPERIENCE`;


    /* =========================================
       CELEBRITY NAVIGATION
    ========================================= */

    document.querySelectorAll(".nav-celebrity-home").forEach(link => {
        link.href = `index.html?celebrity=${encodeURIComponent(celebrityId)}`;
    });

    document.querySelectorAll(".nav-celebrity-about").forEach(link => {
        link.href = `profile.html?celebrity=${encodeURIComponent(celebrityId)}`;
    });

    document.querySelectorAll(".nav-celebrity-packages").forEach(link => {
        link.href = `packages.html?celebrity=${encodeURIComponent(celebrityId)}`;
    });

    document.querySelectorAll(".nav-celebrity-support").forEach(link => {
        link.href = `donate.html?celebrity=${encodeURIComponent(celebrityId)}`;
    });

    document.querySelectorAll(".nav-celebrity-merchandise").forEach(link => {
        link.href = `merchandise.html?celebrity=${encodeURIComponent(celebrityId)}`;
    });

    document.querySelectorAll(".nav-celebrity-collectibles").forEach(link => {
        link.href = `collectibles.html?celebrity=${encodeURIComponent(celebrityId)}`;
    });

    const bookingLink = document.getElementById("profileBooking");

    if (bookingLink) {
        bookingLink.href =
            `booking.html?celebrity=${encodeURIComponent(celebrityId)}#bookingForm`;
    }


    /* =========================================
       COLLECTIBLES PRODUCTS
    ========================================= */

    const products = [
        {
            id: "collector-display-plaque",
            name: `${celebrityName} Street Talk - SIGNED Vinyl`,
            category: "collectors",
            categoryLabel: "Collectors’ Edition",
            price: 2161.76,
            image: `images/${celebrityId}-collectible-plaque.jpg`,
            badge: "Collector Pick",
            description:
                `A display-ready plaque design inspired by ${celebrityName}. Created as a decorative fan collectible; it is not represented as an authenticated autograph or official endorsement.`,
            options: ["Standard", "Deluxe"]
        },

        {
            id: "commemorative-print",
            name: `${celebrityName} The Season 3 - Signed Limited Edition`,
            category: "memorabilia",
            categoryLabel: "Memorabilia",
            price:1000,
            image: `images/${celebrityId}-collectible-print.jpg`,
            badge: "",
            description:
                "A commemorative art print designed for a fan wall or personal display. Frame is not included unless specified in the final product details.",
            options: ["A4", "A3", "A2"]
        },

        {
            id: "limited-numbered-edition",
            name: `${celebrityName} Journey - E5C4P3 (Escape) - SIGNED Vinyl Test Pressing`,
            category: "limited",
            categoryLabel: "Limited Edition",
            price: 2050,
            image: `images/${celebrityId}-collectible-limited.jpg`,
            badge: "Limited Edition",
            description:
                "A special-edition keepsake concept for fans and collectors. Edition availability and numbering will be confirmed by the team before an order is finalised.",
            options: ["Standard", "Gift Box"]
        },

        {
            id: "collector-pin-set",
            name: `${celebrityName} Strange Medicine - 1994 Tour Book. SIGNED`,
            category: "collectors",
            categoryLabel: "Collectors’ Edition",
            price: 4825,
            image: `images/${celebrityId}-collectible-pins.jpg`,
            badge: "",
            description:
                "A decorative set of collectible pins with a premium-inspired presentation, designed to display or add to a personal collection.",
            options: ["Set of 3", "Set of 5"]
        },

        {
            id: "commemorative-ticket",
            name: `${celebrityName} Escape - Ampex Golden Reel Awards. SIGNED `,
            category: "memorabilia",
            categoryLabel: "Memorabilia",
            price: 4550,
            image: `images/${celebrityId}-collectible-ticket.jpg`,
            badge: "Fan Favourite",
            description:
                "A keepsake ticket-style display celebrating memorable live moments. This is a commemorative design, not an original event ticket.",
            options: ["Classic", "Framed"]
        },

        {
            id: "autograph-style-card",
            name: `${celebrityName} Journey Handwritten Lyric Sheet`,
            category: "signed",
            categoryLabel: "Signed Items",
            price: 12100,
            image: `images/${celebrityId}-collectible-card.jpg`,
            badge: "",
            description:
                "A collector card featuring a signature-inspired graphic design. It is not a genuine signed item and is not presented as an authenticated autograph.",
            options: ["Single Card", "Gift Set"]
        },

        {
            id: "limited-art-card-set",
            name: `${celebrityName} Journey - Greatest Hits - SIGNED Vinyl`,
            category: "limited",
            categoryLabel: "Limited Edition",
            price: 3000,
            image: `images/${celebrityId}-collectible-artcards.jpg`,
            badge: "Special Edition",
            description:
                "A set of art cards designed for display, gifting, and collecting. The final set contents will be confirmed with order availability.",
            options: ["Set of 4", "Set of 8"]
        },

        {
            id: "collectors-keepsake-box",
            name: `${celebrityName} Custom New York Licesense Plate SIGNED`,
            category: "collectors",
            categoryLabel: "Collectors’ Edition",
            price: 7500,
            image: `images/${celebrityId}-collectible-box.jpg`,
            badge: "",
            description:
                "A keepsake box concept for storing cards, prints, and other small memorabilia from your collection.",
            options: ["Classic", "Gift Box"]
        }
    ];


    /* =========================================
       STATE
    ========================================= */

    let activeCategory = "all";
    let currentPage = 1;

    const itemsPerPage = 6;

    let selectedProduct = null;
    let selectedQuantity = 1;
    let selectedOption = "";

    let cart = [];


    /* =========================================
       IMAGE FALLBACK
    ========================================= */

    const gridFallback = "images/collectible-placeholder.jpg";

    function safeImage(img, src) {
        img.src = src;

        img.onerror = function () {
            if (this.dataset.fallbackApplied === "true") {
                this.onerror = null;
                this.style.opacity = "0.18";
                this.alt = this.alt || "Collectible image placeholder";
                return;
            }

            this.dataset.fallbackApplied = "true";
            this.src = gridFallback;
        };
    }


    /* =========================================
       CATEGORY FILTERING
    ========================================= */

    function getFilteredProducts() {
        return activeCategory === "all"
            ? products
            : products.filter(product => product.category === activeCategory);
    }


    /* =========================================
       DISPLAY PRODUCTS
    ========================================= */

    function renderProducts() {
        if (!productGrid) return;

        const filtered = getFilteredProducts();

        const pageCount = Math.max(
            1,
            Math.ceil(filtered.length / itemsPerPage)
        );

        if (currentPage > pageCount) {
            currentPage = pageCount;
        }

        const start = (currentPage - 1) * itemsPerPage;

        const visibleProducts = filtered.slice(
            start,
            start + itemsPerPage
        );

        productGrid.innerHTML = "";

        if (!visibleProducts.length) {
            productGrid.innerHTML =
                '<div class="collectible-no-results">No collectibles are listed in this category yet. Please check back soon.</div>';
        } else {
            visibleProducts.forEach(product => {

                const card = document.createElement("article");
                card.className =
                    "merch-product-card collectible-product-card";

                const imageWrap = document.createElement("div");
                imageWrap.className = "merch-product-image";

                const img = document.createElement("img");
                img.alt = product.name;
                img.loading = "lazy";

                safeImage(img, product.image);

                imageWrap.appendChild(img);

                if (product.badge) {
                    const badge = document.createElement("span");

                    badge.className = "merch-product-badge";
                    badge.textContent = product.badge;

                    imageWrap.appendChild(badge);
                }

                const info = document.createElement("div");
                info.className = "merch-product-info";

                const category = document.createElement("div");
                category.className = "merch-product-category";
                category.textContent = product.categoryLabel;

                const name = document.createElement("h3");
                name.className = "merch-product-name";
                name.textContent = product.name;

                const bottom = document.createElement("div");
                bottom.className = "merch-product-bottom";

                const price = document.createElement("span");
                price.className = "merch-product-price";
                price.textContent = formatMoney(product.price);

                const view = document.createElement("button");
                view.type = "button";
                view.className = "collectible-view-button";
                view.textContent = "View Details";

                view.addEventListener("click", () => {
                    openProduct(product);
                });

                bottom.append(price, view);
                info.append(category, name, bottom);
                card.append(imageWrap, info);

                productGrid.appendChild(card);
            });
        }

        const indicator =
            document.getElementById("collectiblesPageIndicator");

        const previous =
            document.getElementById("collectiblesPrevPage");

        const next =
            document.getElementById("collectiblesNextPage");

        const resultsLabel =
            document.getElementById("collectiblesResultsLabel");

        if (indicator) {
            indicator.textContent = `Page ${currentPage} of ${pageCount}`;
        }

        if (previous) {
            previous.disabled = currentPage <= 1;
        }

        if (next) {
            next.disabled = currentPage >= pageCount;
        }

        if (resultsLabel) {
            resultsLabel.textContent =
                `${filtered.length} ${filtered.length === 1 ? "collectible" : "collectibles"} in this collection`;
        }
    }


    /* =========================================
       FILTER BUTTON EVENTS
    ========================================= */

    document
        .querySelectorAll("#collectiblesFilters .merch-filter")
        .forEach(button => {

            button.addEventListener("click", function () {

                activeCategory = this.dataset.category || "all";
                currentPage = 1;

                document
                    .querySelectorAll("#collectiblesFilters .merch-filter")
                    .forEach(filter => {

                        const active = filter === this;

                        filter.classList.toggle("active", active);

                        filter.setAttribute(
                            "aria-pressed",
                            active ? "true" : "false"
                        );
                    });

                renderProducts();
            });
        });


    /* =========================================
       PAGINATION
    ========================================= */

    document
        .getElementById("collectiblesPrevPage")
        ?.addEventListener("click", () => {

            if (currentPage > 1) {
                currentPage--;
                renderProducts();
            }
        });

    document
        .getElementById("collectiblesNextPage")
        ?.addEventListener("click", () => {

            const pageCount = Math.max(
                1,
                Math.ceil(
                    getFilteredProducts().length / itemsPerPage
                )
            );

            if (currentPage < pageCount) {
                currentPage++;
                renderProducts();
            }
        });


    /* =========================================
       OPEN PRODUCT DETAILS
    ========================================= */

    function openProduct(product) {
        selectedProduct = product;
        selectedQuantity = 1;

        selectedOption =
            product.options && product.options.length
                ? product.options[0]
                : "";

        document.getElementById("modalProductName").textContent =
            product.name;

        document.getElementById("modalProductCategory").textContent =
            product.categoryLabel;

        document.getElementById("modalProductPrice").textContent =
            formatMoney(product.price);

        document.getElementById("modalProductDescription").textContent =
            product.description;

        const modalImage =
            document.getElementById("modalProductImage");

        modalImage.alt = product.name;
        modalImage.dataset.fallbackApplied = "false";

        safeImage(modalImage, product.image);

        document.getElementById("modalQuantity").textContent = "1";

        const selector = document.getElementById("sizeSelector");
        const optionsWrap =
            document.getElementById("collectibleOptions");

        optionsWrap.innerHTML = "";

        if (product.options && product.options.length) {
            selector.hidden = false;

            product.options.forEach((option, index) => {

                const button = document.createElement("button");

                button.type = "button";
                button.textContent = option;

                button.classList.toggle("active", index === 0);

                button.setAttribute(
                    "aria-pressed",
                    index === 0 ? "true" : "false"
                );

                button.addEventListener("click", () => {

                    selectedOption = option;

                    optionsWrap
                        .querySelectorAll("button")
                        .forEach(item => {

                            const active = item === button;

                            item.classList.toggle("active", active);

                            item.setAttribute(
                                "aria-pressed",
                                active ? "true" : "false"
                            );
                        });
                });

                optionsWrap.appendChild(button);
            });

        } else {
            selector.hidden = true;
        }

        productModal.classList.add("open");
        document.body.classList.add("collectibles-modal-open");
    }


    /* =========================================
       CLOSE PRODUCT DETAILS
    ========================================= */

    function closeProduct() {
        productModal.classList.remove("open");
        document.body.classList.remove("collectibles-modal-open");
    }

    document
        .getElementById("closeProductModal")
        ?.addEventListener("click", closeProduct);

    document
        .getElementById("productModalBackdrop")
        ?.addEventListener("click", closeProduct);


    /* =========================================
       QUANTITY CONTROLS
    ========================================= */

    document
        .getElementById("decreaseQuantity")
        ?.addEventListener("click", () => {

            selectedQuantity = Math.max(
                1,
                selectedQuantity - 1
            );

            document.getElementById("modalQuantity").textContent =
                String(selectedQuantity);
        });

    document
        .getElementById("increaseQuantity")
        ?.addEventListener("click", () => {

            selectedQuantity = Math.min(
                99,
                selectedQuantity + 1
            );

            document.getElementById("modalQuantity").textContent =
                String(selectedQuantity);
        });


    /* =========================================
       ADD PRODUCT TO CART
    ========================================= */

    document
        .getElementById("modalAddToCart")
        ?.addEventListener("click", () => {

            if (!selectedProduct) return;

            const optionKey = selectedOption || "";

            const existing = cart.find(item =>
                item.id === selectedProduct.id &&
                item.option === optionKey
            );

            if (existing) {

                existing.quantity = Math.min(
                    99,
                    existing.quantity + selectedQuantity
                );

            } else {

                cart.push({
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    image: selectedProduct.image,
                    option: optionKey,
                    quantity: selectedQuantity
                });
            }

            renderCart();
            closeProduct();
            openCart();
        });


    /* =========================================
       DISPLAY CART
    ========================================= */

    function renderCart() {
        if (!cartItemsElement) return;

        cartItemsElement.innerHTML = "";

        if (!cart.length) {

            cartItemsElement.innerHTML =
                '<p class="empty-cart">Your bag is waiting for something special.</p>';

        } else {

            cart.forEach(item => {

                const row = document.createElement("div");
                row.className = "cart-item";

                const img = document.createElement("img");

                img.className = "cart-item-image";
                img.alt = item.name;
                img.loading = "lazy";

                safeImage(img, item.image);

                const details = document.createElement("div");

                const name = document.createElement("p");
                name.className = "cart-item-name";
                name.textContent = item.name;

                const meta = document.createElement("p");
                meta.className = "cart-item-meta";

                meta.textContent =
                    `${item.option ? item.option + " · " : ""}Qty: ${item.quantity}`;

                const remove = document.createElement("button");

                remove.type = "button";
                remove.className = "remove-cart-item";
                remove.textContent = "Remove";

                remove.addEventListener("click", () => {

                    cart = cart.filter(cartItem =>
                        !(
                            cartItem.id === item.id &&
                            cartItem.option === item.option
                        )
                    );

                    renderCart();
                });

                details.append(name, meta, remove);

                const price = document.createElement("strong");

                price.className = "cart-item-price";
                price.textContent =
                    formatMoney(item.price * item.quantity);

                row.append(img, details, price);

                cartItemsElement.appendChild(row);
            });
        }

        const count = cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        if (cartCount) {
            cartCount.textContent = String(count);
        }

        if (cartTotalElement) {
            cartTotalElement.textContent = formatMoney(total);
        }
    }


    /* =========================================
       OPEN AND CLOSE CART
    ========================================= */

    function openCart() {
        cartDrawer.classList.add("open");
        cartOverlay.classList.add("open");

        cartDrawer.setAttribute("aria-hidden", "false");

        document.body.classList.add("collectibles-cart-open");
    }

    function closeCart() {
        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("open");

        cartDrawer.setAttribute("aria-hidden", "true");

        document.body.classList.remove("collectibles-cart-open");
    }

    document
        .getElementById("openCart")
        ?.addEventListener("click", openCart);

    document
        .getElementById("closeCart")
        ?.addEventListener("click", closeCart);

    cartOverlay?.addEventListener("click", closeCart);


    /* =========================================
       WEB3FORMS CHECKOUT
    ========================================= */

    if (checkoutButton) {

        checkoutButton.addEventListener("click", async function (event) {

            event.preventDefault();

            if (!cart.length) {
                alert(
                    "Your bag is empty. Add a collectible before submitting an order request."
                );
                return;
            }

            if (
                !customerEmail ||
                !customerEmail.value.trim() ||
                !customerEmail.checkValidity()
            ) {
                if (customerEmail) {

                    customerEmail.setCustomValidity(
                        customerEmail.value.trim()
                            ? ""
                            : "Please enter your email address."
                    );

                    customerEmail.reportValidity();
                    customerEmail.focus();

                    customerEmail.addEventListener(
                        "input",
                        () => customerEmail.setCustomValidity(""),
                        { once: true }
                    );
                }

                return;
            }

            const nameInput =
                document.getElementById("customerName");

            const phoneInput =
                document.getElementById("customerPhone");

            const totalPrice = cart.reduce(
                (sum, item) =>
                    sum + Number(item.price) * Number(item.quantity),
                0
            );

            const itemDetails = cart.map((item, index) =>

                `${index + 1}. ${item.name}\n` +
                `Option: ${item.option || "Standard"}\n` +
                `Quantity: ${item.quantity}\n` +
                `Unit price: ${formatMoney(item.price)}\n` +
                `Subtotal: ${formatMoney(item.price * item.quantity)}`

            ).join("\n\n");


            /* Build order notification */

            const formData = new FormData();

            formData.append(
                "access_key",
                "706b76aa-3212-4584-9b8a-b632feed9dc4"
            );

            formData.append(
                "subject",
                `New Collectibles Order Request — ${celebrityName}`
            );

            formData.append(
                "from_name",
                "THE EXPERIENCE Collectibles"
            );

            formData.append(
                "email",
                customerEmail.value.trim()
            );

            formData.append(
                "replyto",
                customerEmail.value.trim()
            );

            formData.append(
                "customer_name",
                nameInput ? nameInput.value.trim() : ""
            );

            formData.append(
                "customer_phone",
                phoneInput ? phoneInput.value.trim() : ""
            );

            formData.append("celebrity", celebrityName);
            formData.append("celebrity_id", celebrityId);

            formData.append(
                "item_count",
                String(
                    cart.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                    )
                )
            );

            formData.append(
                "order_total",
                formatMoney(totalPrice)
            );

            formData.append(
                "collectibles_details",
                itemDetails
            );

            formData.append(
                "message",

                `NEW COLLECTIBLES ORDER REQUEST

Celebrity: ${celebrityName}

Customer name: ${nameInput?.value.trim() || "Not provided"}

Customer email: ${customerEmail.value.trim()}

Customer phone: ${phoneInput?.value.trim() || "Not provided"}

Items:
${itemDetails}

Estimated order total: ${formatMoney(totalPrice)}

This is an order request only. Confirm availability, shipping, and payment arrangements with the customer before processing.`
            );


            /* Send the order request */

            const originalText = checkoutButton.textContent;

            checkoutButton.disabled = true;
            checkoutButton.textContent = "Sending Request…";

            try {

                const response = await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        body: formData
                    }
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        "Unable to send the order request."
                    );
                }

                checkoutButton.textContent = "Request Sent ✓";

                alert(
                    "Your order request has been sent. Our team will follow up by email with availability and next steps."
                );

                cart = [];
                renderCart();

                if (nameInput) {
                    nameInput.value = "";
                }

                if (phoneInput) {
                    phoneInput.value = "";
                }

                customerEmail.value = "";

                setTimeout(() => {

                    checkoutButton.disabled = false;
                    checkoutButton.textContent = originalText;

                    closeCart();

                }, 1200);


                /* Open Tawk chat after successful submission */

                setTimeout(() => {

                    if (
                        typeof Tawk_API !== "undefined" &&
                        typeof Tawk_API.maximize === "function"
                    ) {
                        Tawk_API.maximize();
                    }

                }, 700);

            } catch (error) {

                console.error(
                    "Collectibles order request error:",
                    error
                );

                alert(
                    "We could not send your order request right now. Please try again."
                );

                checkoutButton.disabled = false;
                checkoutButton.textContent = originalText;
            }
        });
    }


    /* =========================================
       TAWK CHAT CONTACT
    ========================================= */

    document
        .getElementById("contactTawk")
        ?.addEventListener("click", function (event) {

            event.preventDefault();

            if (
                typeof Tawk_API !== "undefined" &&
                typeof Tawk_API.maximize === "function"
            ) {

                Tawk_API.maximize();

            } else {

                alert(
                    "Live chat is loading. Please try again in a moment."
                );
            }
        });


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("collectiblesNav");

    menuToggle?.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("mobile-open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });

    nav?.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("mobile-open");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });


    /* =========================================
       INITIALISE PAGE
    ========================================= */

    const yearElement = document.getElementById("collectiblesYear");

    if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
    }

    renderProducts();
    renderCart();

});