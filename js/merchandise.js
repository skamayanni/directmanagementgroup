document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       CURRENT CELEBRITY
    ========================================== */

    const merchParams = new URLSearchParams(window.location.search);

    const celebrityId =
        merchParams.get("celebrity") ||
        localStorage.getItem("selectedCelebrity") ||
        "steve-perry";

    const celebrity =
        typeof celebrities !== "undefined"
            ? celebrities[celebrityId]
            : null;

    const celebrityName = celebrity
        ? celebrity.name
        : "Steve Perry";


    /* =========================================
       DOM ELEMENTS
    ========================================== */

    const productGrid = document.getElementById("merchProductGrid");
    const celebrityNameElement = document.getElementById("merchCelebrityName");
    const heroDescription = document.getElementById("merchHeroDescription");
    const merchandiseIntro = document.getElementById("merchandiseIntro");

    const cartCount = document.getElementById("cartCount");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    const productModal = document.getElementById("productModal");

    const collectionTitle = document.getElementById("collectionTitle");
    const collectionEyebrow = document.getElementById("collectionEyebrow");
    const previousCollectionButton = document.getElementById("previousCollection");
    const nextCollectionButton = document.getElementById("nextCollection");
    const collectionPageIndicator = document.getElementById("collectionPageIndicator");
    const merchFilters = document.getElementById("merchFilters");


    /* =========================================
       CELEBRITY TEXT AND PAGE TITLE
    ========================================== */

    if (celebrityNameElement) {
        celebrityNameElement.textContent = celebrityName;
    }

    if (heroDescription) {
        heroDescription.textContent =
            `Discover the collections inspired by ${celebrityName}.`;
    }

    if (merchandiseIntro) {
        merchandiseIntro.textContent =
            `Explore collectibles and merchandise inspired by ${celebrityName}.`;
    }

    if (celebrity) {
        document.title = `${celebrityName} Collections | THE EXPERIENCE`;
    }


    /* =========================================
       PAGE 2: MERCHANDISE PRODUCTS

       This collection appears SECOND.
    ========================================== */

    const merchandise = [

        {
            id: "signature-tee",
            name: `${celebrityName} Street Talk Album T-Shirt`,
            category: "shirts",
            price: 85,
            image: `images/${celebrityId}-merch-tee.jpg`,
            badge: "Bestseller",
            description: `A fan collection T-shirt inspired by ${celebrityName}.`,
            sizes: true
        },

        {
            id: "classic-hoodie",
            name: `${celebrityName} Classic Hoodie`,
            category: "hoodies",
            price: 105,
            image: `images/${celebrityId}-merch-hoodie.jpg`,
            badge: "",
            description: "A comfortable hoodie created for fans.",
            sizes: true
        },

        {
            id: "signature-sweatshirt",
            name: `${celebrityName} Crewneck Sweatshirt`,
            category: "sweatshirt",
            price: 98,
            image: `images/${celebrityId}-merch-cap.jpg`,
            badge: "",
            description: "A classic sweatshirt featuring a distinctive collection design.",
            sizes: true
        },

        {
            id: "limited-tee",
            name: `${celebrityName} Limited Edition Tee`,
            category: "limited",
            price: 98,
            image: `images/${celebrityId}-limited-tee.jpg`,
            badge: "Limited",
            description: "A limited-edition T-shirt for dedicated fans.",
            sizes: true
        },

        {
            id: "fan-sweatshirt",
            name: `${celebrityName} Retro Sweatshirt`,
            category: "sweatshirt",
            price: 100,
            image: `images/${celebrityId}-fan-hoodie.jpg`,
            badge: "Exclusive",
            description: "An elevated sweatshirt from the fan collection.",
            sizes: true
        },

        {
            id: "merch-holiday-ornament",
            name: `${celebrityName} Holiday Ornament`,
            category: "accessories",
            price: 50,
            image: `images/${celebrityId}-poster.jpg`,
            badge: "Collector",
            description: "A decorative item for your personal collection.",
            sizes: false
        }

    ];


    /* =========================================
       PAGE 1: COLLECTIBLES PRODUCTS

       This collection appears FIRST.
    ========================================== */

    const collectibles = [

        {
            id: "collectibles-collector-poster",
            name: `${celebrityName} Strange Medicine - 1994 Tour Book. SIGNED`,
            category: "posters",
            price: 4825,
            image: `images/${celebrityId}-commemorative-print.jpg`,
            badge: "Collector's Edition",
            description: `A collector poster inspired by ${celebrityName}, designed for display in your collection.`,
            sizes: false
        },

        {
            id: "commemorative-ornament",
            name: `${celebrityName} Journey - E5C4P3 (Escape) - SIGNED Vinyl Test Pressing`,
            category: "ornaments",
            price: 2050,
            image: `images/${celebrityId}-commemorative-ornament.jpg`,
            badge: "Collectible",
            description: "A commemorative ornament created for collectors.",
            sizes: false
        },

        {
            id: "collector-display",
            name: `${celebrityName} Escape - Ampex Golden Reel Awards. SIGNED `,
            category: "memorabilia",
            price: 4550,
            image: `images/${celebrityId}-display-collectible.jpg`,
            badge: "Special Edition",
            description: "A display piece designed for a dedicated fan collection.",
            sizes: false
        },

        {
            id: "commemorative-print",
            name: `${celebrityName} Street Talk - SIGNED Vinyl`,
            category: "posters",
            price: 2161.76,
            image: `images/${celebrityId}-collector-poster.jpg`,
            badge: "",
            description: "A premium art print for your collection.",
            sizes: false
        },

        {
            id: "collector-box",
            name: `${celebrityName} The Season 3 - Signed Limited Edition`,
            category: "memorabilia",
            price: 1000,
            image: `images/${celebrityId}-collectors-box.jpg`,
            badge: "Exclusive",
            description: "A presentation box for storing treasured collectibles.",
            sizes: false
        },

        {
            id: "limited-ornament",
            name: `${celebrityName} Journey Handwritten Lyric Sheet`,
            category: "ornaments",
            price: 12100,
            image: `images/${celebrityId}-limited-ornament.jpg`,
            badge: "Limited Edition",
            description: "A limited-edition ornament for collectors.",
            sizes: false
        }

    ];


    /* =========================================
       COLLECTION STATE

       Page 1 = Collectibles
       Page 2 = Merchandise
    ========================================== */

    let currentCollectionPage = 1;
    let activeCategory = "all";

    let currentProducts = collectibles;

    // Shopping cart persists while switching collection pages.
    const cart = [];


    /* =========================================
       CATEGORY CONFIGURATION
    ========================================== */

    const collectionCategories = {

        1: [
            { label: "All Collectibles", value: "all" },
            { label: "Posters & Prints", value: "posters" },
            { label: "Ornaments", value: "ornaments" },
            { label: "Memorabilia", value: "memorabilia" }
        ],

        2: [
            { label: "All", value: "all" },
            { label: "T-Shirts", value: "shirts" },
            { label: "Hoodies", value: "hoodies" },
            { label: "Sweatshirts", value: "sweatshirt" },
            { label: "Accessories", value: "accessories" },
            { label: "Limited Edition", value: "limited" }
        ]

    };


    /* =========================================
       CATEGORY LABELS
    ========================================== */

    function getCategoryName(category) {

        const names = {
            shirts: "T-Shirts",
            hoodies: "Hoodies",
            sweatshirt: "Sweatshirts",
            accessories: "Accessories",
            limited: "Limited Edition",
            posters: "Posters & Prints",
            ornaments: "Ornaments",
            memorabilia: "Memorabilia"
        };

        return names[category] || "Collection";
    }


    /* =========================================
       UPDATE COLLECTION HEADING
    ========================================== */

    function updateCollectionHeading() {

        if (currentCollectionPage === 1) {

            if (collectionTitle) {
                collectionTitle.textContent = "Collectibles";
            }

            if (collectionEyebrow) {
                collectionEyebrow.textContent = "THE COLLECTOR'S EDITION";
            }

            if (merchandiseIntro) {
                merchandiseIntro.textContent =
                    `Explore collectibles inspired by ${celebrityName}, including display pieces, ornaments and art prints.`;
            }

        } else {

            if (collectionTitle) {
                collectionTitle.textContent = "Merchandise";
            }

            if (collectionEyebrow) {
                collectionEyebrow.textContent = "SHOP THE COLLECTION";
            }

            if (merchandiseIntro) {
                merchandiseIntro.textContent =
                    `Discover T-shirts, hoodies, sweatshirts and other merchandise inspired by ${celebrityName}.`;
            }

        }

    }


    /* =========================================
       UPDATE CATEGORY FILTERS
    ========================================== */

    function updateCollectionFilters() {

        if (!merchFilters) {
            return;
        }

        const categories = collectionCategories[currentCollectionPage];

        merchFilters.innerHTML = "";

        categories.forEach(function (category) {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "merch-filter";
            button.dataset.category = category.value;
            button.textContent = category.label;

            if (category.value === activeCategory) {
                button.classList.add("active");
            }

            button.addEventListener("click", function () {

                activeCategory = category.value;

                merchFilters
                    .querySelectorAll(".merch-filter")
                    .forEach(function (filterButton) {
                        filterButton.classList.remove("active");
                    });

                button.classList.add("active");

                renderProducts(activeCategory);

            });

            merchFilters.appendChild(button);

        });

    }


    /* =========================================
       RENDER PRODUCTS
    ========================================== */

    function renderProducts(category = "all") {

        if (!productGrid) {
            return;
        }

        const filteredProducts =
            category === "all"
                ? currentProducts
                : currentProducts.filter(function (product) {
                    return product.category === category;
                });

        productGrid.innerHTML = "";

        if (filteredProducts.length === 0) {

            productGrid.innerHTML = `
                <p class="no-products-message">
                    No products are currently available in this category.
                    Please check back soon.
                </p>
            `;

            return;
        }

        filteredProducts.forEach(function (product) {

            const card = document.createElement("article");

            card.className = "merch-product-card";

            card.innerHTML = `
                <div class="merch-product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.style.opacity='0.15'"
                    >

                    ${
                        product.badge
                            ? `<span class="merch-product-badge">${product.badge}</span>`
                            : ""
                    }

                </div>

                <div class="merch-product-info">

                    <div class="merch-product-category">
                        ${getCategoryName(product.category)}
                    </div>

                    <h3 class="merch-product-name">
                        ${product.name}
                    </h3>

                    <div class="merch-product-bottom">

                        <span class="merch-product-price">
                            $${Number(product.price).toLocaleString()}
                        </span>

                        <button
                            type="button"
                            class="view-product-button"
                            data-product="${product.id}"
                        >
                            View Product
                        </button>

                    </div>

                </div>
            `;

            productGrid.appendChild(card);

        });

    }


    /* =========================================
       CHANGE COLLECTION PAGE
    ========================================== */

    function changeCollectionPage(page) {

        if (page !== 1 && page !== 2) {
            return;
        }

        currentCollectionPage = page;

        // Reset category selection when switching pages.
        activeCategory = "all";

        // Page 1 is Collectibles.
        // Page 2 is Merchandise.
        currentProducts =
            currentCollectionPage === 1
                ? collectibles
                : merchandise;

        updateCollectionHeading();

        updateCollectionFilters();

        renderProducts("all");

        if (previousCollectionButton) {
            previousCollectionButton.disabled =
                currentCollectionPage === 1;
        }

        if (nextCollectionButton) {
            nextCollectionButton.disabled =
                currentCollectionPage === 2;
        }

        if (collectionPageIndicator) {
            collectionPageIndicator.textContent =
                `Page ${currentCollectionPage} of 2`;
        }

    }


    /* =========================================
       PAGINATION BUTTON EVENTS
    ========================================== */

    if (previousCollectionButton) {

        previousCollectionButton.addEventListener("click", function () {

            changeCollectionPage(1);

        });

    }

    if (nextCollectionButton) {

        nextCollectionButton.addEventListener("click", function () {

            changeCollectionPage(2);

            const collectionSection =
                document.getElementById("merchProductGrid");

            if (collectionSection) {
                collectionSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    }


    /* =========================================
       PRODUCT MODAL ELEMENTS
    ========================================== */

    let selectedProduct = null;
    let selectedSize = "M";
    let selectedQuantity = 1;

    const modalImage = document.getElementById("modalProductImage");
    const modalCategory = document.getElementById("modalProductCategory");
    const modalName = document.getElementById("modalProductName");
    const modalPrice = document.getElementById("modalProductPrice");
    const modalDescription = document.getElementById("modalProductDescription");
    const modalQuantity = document.getElementById("modalQuantity");
    const sizeSelector = document.getElementById("sizeSelector");


    /* =========================================
       OPEN PRODUCT MODAL
    ========================================== */

    function openProduct(product) {

        selectedProduct = product;
        selectedQuantity = 1;
        selectedSize = "M";

        if (modalImage) {
            modalImage.src = product.image;
            modalImage.alt = product.name;
        }

        if (modalCategory) {
            modalCategory.textContent = getCategoryName(product.category);
        }

        if (modalName) {
            modalName.textContent = product.name;
        }

        if (modalPrice) {
            modalPrice.textContent =
                `$${Number(product.price).toLocaleString()}`;
        }

        if (modalDescription) {
            modalDescription.textContent = product.description;
        }

        if (modalQuantity) {
            modalQuantity.textContent = selectedQuantity;
        }

        document.querySelectorAll(".size-options button").forEach(function (button) {

            button.classList.remove("active");

            if (button.dataset.size === selectedSize) {
                button.classList.add("active");
            }

        });

        if (sizeSelector) {
            sizeSelector.style.display = product.sizes ? "block" : "none";
        }

        if (productModal) {
            productModal.classList.add("open");
            document.body.style.overflow = "hidden";
        }

    }


    /* =========================================
       CLOSE PRODUCT MODAL
    ========================================== */

    function closeProduct() {

        if (productModal) {
            productModal.classList.remove("open");
        }

        document.body.style.overflow = "";

    }


    const closeProductButton =
        document.getElementById("closeProductModal");

    const modalBackdrop =
        document.getElementById("productModalBackdrop");

    if (closeProductButton) {
        closeProductButton.addEventListener("click", closeProduct);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closeProduct);
    }


    /* =========================================
       PRODUCT BUTTONS

       Works for products on both pages.
    ========================================== */

    if (productGrid) {

        productGrid.addEventListener("click", function (event) {

            const button = event.target.closest(".view-product-button");

            if (!button) {
                return;
            }

            const product = currentProducts.find(function (item) {
                return item.id === button.dataset.product;
            });

            if (product) {
                openProduct(product);
            }

        });

    }


    /* =========================================
       SIZE SELECTION
    ========================================== */

    document.querySelectorAll(".size-options button").forEach(function (button) {

        button.addEventListener("click", function () {

            selectedSize = this.dataset.size;

            document.querySelectorAll(".size-options button").forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    /* =========================================
       QUANTITY CONTROLS
    ========================================== */

    const decreaseQuantity = document.getElementById("decreaseQuantity");
    const increaseQuantity = document.getElementById("increaseQuantity");

    if (decreaseQuantity) {

        decreaseQuantity.addEventListener("click", function () {

            if (selectedQuantity > 1) {

                selectedQuantity--;

                if (modalQuantity) {
                    modalQuantity.textContent = selectedQuantity;
                }

            }

        });

    }

    if (increaseQuantity) {

        increaseQuantity.addEventListener("click", function () {

            selectedQuantity++;

            if (modalQuantity) {
                modalQuantity.textContent = selectedQuantity;
            }

        });

    }


    /* =========================================
       CART OPEN / CLOSE
    ========================================== */

    function openCart() {

        if (!cartDrawer) {
            return;
        }

        cartDrawer.classList.add("open");

        if (cartOverlay) {
            cartOverlay.classList.add("open");
        }

        cartDrawer.setAttribute("aria-hidden", "false");

    }

    function closeCart() {

        if (!cartDrawer) {
            return;
        }

        cartDrawer.classList.remove("open");

        if (cartOverlay) {
            cartOverlay.classList.remove("open");
        }

        cartDrawer.setAttribute("aria-hidden", "true");

    }

    const openCartButton = document.getElementById("openCart");
    const closeCartButton = document.getElementById("closeCart");

    if (openCartButton) {
        openCartButton.addEventListener("click", openCart);
    }

    if (closeCartButton) {
        closeCartButton.addEventListener("click", closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCart);
    }


    /* =========================================
       UPDATE CART DISPLAY
    ========================================== */

    function updateCart() {

        const totalItems = cart.reduce(function (total, item) {
            return total + Number(item.quantity);
        }, 0);

        const totalPrice = cart.reduce(function (total, item) {
            return total + Number(item.price) * Number(item.quantity);
        }, 0);

        if (cartCount) {
            cartCount.textContent = totalItems;
        }

        if (cartTotal) {
            cartTotal.textContent = `$${totalPrice.toLocaleString()}`;
        }

        if (!cartItems) {
            return;
        }

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <p>Your shopping bag is empty.</p>
                </div>
            `;

            return;
        }

        cartItems.innerHTML = "";

        cart.forEach(function (item, index) {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <img
                    class="cart-item-image"
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <h3 class="cart-item-name">
                        ${item.name}
                    </h3>

                    <div class="cart-item-meta">
                        Size: ${item.size} · Qty: ${item.quantity}
                    </div>

                    <button
                        type="button"
                        class="remove-cart-item"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>

                <span class="cart-item-price">
                    $${(Number(item.price) * Number(item.quantity)).toLocaleString()}
                </span>
            `;

            cartItems.appendChild(cartItem);

        });

    }


    /* =========================================
       ADD TO CART
    ========================================== */

    const modalAddToCart = document.getElementById("modalAddToCart");

    if (modalAddToCart) {

        modalAddToCart.addEventListener("click", function () {

            if (!selectedProduct) {
                return;
            }

            const itemSize = selectedProduct.sizes
                ? selectedSize
                : "One Size";

            const existingItem = cart.find(function (item) {

                return (
                    item.id === selectedProduct.id &&
                    item.size === itemSize
                );

            });

            if (existingItem) {

                existingItem.quantity += selectedQuantity;

            } else {

                cart.push({

                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    image: selectedProduct.image,
                    size: itemSize,
                    quantity: selectedQuantity

                });

            }

            updateCart();

            closeProduct();

            openCart();

        });

    }


    /* =========================================
       REMOVE CART ITEMS
    ========================================== */

    if (cartItems) {

        cartItems.addEventListener("click", function (event) {

            const button = event.target.closest(".remove-cart-item");

            if (!button) {
                return;
            }

            const index = Number(button.dataset.index);

            if (Number.isInteger(index) && index >= 0 && index < cart.length) {
                cart.splice(index, 1);
                updateCart();
            }

        });

    }


    // Show the empty cart on initial page load.
    updateCart();


    /* =========================================
       MERCHANDISE CHECKOUT
       WEB3FORMS + TAWK SUPPORT
    ========================================== */

    const checkoutButton = document.getElementById("checkoutButton");

    if (checkoutButton) {

        checkoutButton.addEventListener("click", async function (event) {

            event.preventDefault();

            const customerEmail = document.getElementById("customerEmail");
            const customerName = document.getElementById("customerName");
            const customerPhone = document.getElementById("customerPhone");

            // Require a valid customer email.
            if (!customerEmail || !customerEmail.checkValidity()) {

                if (customerEmail) {
                    customerEmail.reportValidity();
                    customerEmail.focus();
                }

                return;
            }

            // Do not submit an empty cart.
            if (cart.length === 0) {
                alert("Your shopping bag is empty.");
                return;
            }

            const totalPrice = cart.reduce(function (total, item) {
                return total + Number(item.price) * Number(item.quantity);
            }, 0);

            const merchandiseDetails = cart.map(function (item, index) {

                return [
                    `${index + 1}. ${item.name}`,
                    `Size: ${item.size}`,
                    `Quantity: ${item.quantity}`,
                    `Price: $${Number(item.price).toLocaleString()}`,
                    `Subtotal: $${(Number(item.price) * Number(item.quantity)).toLocaleString()}`
                ].join("\n");

            }).join("\n\n");

            const customerEmailValue = customerEmail.value.trim();

            const customerNameValue = customerName
                ? customerName.value.trim()
                : "";

            const customerPhoneValue = customerPhone
                ? customerPhone.value.trim()
                : "";

            const formData = new FormData();

            formData.append(
                "access_key",
                "84529fd7-84d9-4c01-8499-f16a75fc1ba8"
            );

            formData.append(
                "subject",
                "New Merchandise Purchase Request"
            );

            formData.append(
                "from_name",
                "THE EXPERIENCE Merchandise"
            );

            formData.append("email", customerEmailValue);
            formData.append("replyto", customerEmailValue);
            formData.append("customer_name", customerNameValue);
            formData.append("customer_phone", customerPhoneValue);
            formData.append("celebrity", celebrityName);
            formData.append("order_total", "$" + totalPrice.toLocaleString());
            formData.append("merchandise_details", merchandiseDetails);

            formData.append(
                "message",
                `
NEW MERCHANDISE PURCHASE REQUEST

Customer Name:
${customerNameValue || "Not provided"}

Customer Email:
${customerEmailValue}

Customer Phone:
${customerPhoneValue || "Not provided"}

Collection:
Products may include Collectibles and Merchandise.

Celebrity:
${celebrityName}

--------------------------------
ORDER DETAILS
--------------------------------

${merchandiseDetails}

--------------------------------
ORDER TOTAL
--------------------------------

$${totalPrice.toLocaleString()}

Please contact the customer to confirm availability, shipping costs, and payment arrangements before finalising the order.
`
            );

            const originalButtonText = checkoutButton.textContent;

            checkoutButton.disabled = true;
            checkoutButton.textContent = "Sending Order...";

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
                        result.message || "Unable to send order."
                    );
                }

                checkoutButton.textContent = "Order Request Sent ✓";

                alert(
                    "Your merchandise request has been sent successfully. Our customer care team will assist you with the next step."
                );

                // Open Tawk support if its widget is ready.
                setTimeout(function () {

                    if (
                        typeof Tawk_API !== "undefined" &&
                        typeof Tawk_API.maximize === "function"
                    ) {
                        Tawk_API.maximize();
                    }

                }, 500);

                // Keep the button disabled to prevent accidental duplicate requests.
                // The cart is retained so the customer can refer to their order.

            } catch (error) {

                console.error("Merchandise order error:", error);

                checkoutButton.disabled = false;
                checkoutButton.textContent = originalButtonText;

                alert(
                    "We could not send your order request. Please check your connection and try again."
                );

            }

        });

    }


    /* =========================================
       TAWK CONTACT LINK
    ========================================== */

    // Your HTML previously used the ID "contactTawk".
    // Support both IDs so the link works with either version.

    const contactTawk =
        document.getElementById("merchContactTawk") ||
        document.getElementById("contactTawk");

    if (contactTawk) {

        contactTawk.addEventListener("click", function (event) {

            event.preventDefault();

            if (
                typeof Tawk_API !== "undefined" &&
                typeof Tawk_API.maximize === "function"
            ) {
                Tawk_API.maximize();
            }

        });

    }


    /* =========================================
       UPDATE CELEBRITY LINKS
    ========================================== */

    const query = `?celebrity=${encodeURIComponent(celebrityId)}`;

    const profileLink = document.querySelector(".merch-profile-link");
    const packagesLink = document.querySelector(".merch-packages-link");
    const donateLink = document.querySelector(".merch-donate-link");

    if (profileLink) {
        profileLink.href = `profile.html${query}`;
    }

    if (packagesLink) {
        packagesLink.href = `packages.html${query}`;
    }

    if (donateLink) {
        donateLink.href = `donate.html${query}`;
    }


    /* =========================================
       INITIAL PAGE LOAD

       Always start with Collectibles.
    ========================================== */

    changeCollectionPage(1);

});