const products = [
  {
    name: "Budget Smartphone X1",
    category: "iphone phone mobile smartphone",
    brand: "TechGo",
    price: 14999,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    reason: "Similar daily-use features at a much lower price.",
    link: "https://www.amazon.in"
  },
  {
    name: "Value Android Pro",
    category: "iphone phone mobile smartphone",
    brand: "Nova",
    price: 18999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    reason: "Best value option with strong battery life.",
    link: "https://www.flipkart.com"
  },
  {
    name: "Everyday Running Shoes",
    category: "nike shoes sneakers footwear",
    brand: "RunMax",
    price: 1499,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    reason: "Comfortable design without premium brand pricing.",
    link: "https://www.amazon.in"
  },
  {
    name: "Street Style Sneakers",
    category: "nike shoes sneakers footwear",
    brand: "UrbanStep",
    price: 2199,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    reason: "Stylish alternative for casual use.",
    link: "https://www.flipkart.com"
  },
  {
    name: "Student Laptop Lite",
    category: "laptop computer macbook notebook",
    brand: "CompEdge",
    price: 32999,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    reason: "Good for browsing, study, coding basics, and office work.",
    link: "https://www.amazon.in"
  },
  {
    name: "WorkBook Air",
    category: "laptop computer macbook notebook",
    brand: "LapZone",
    price: 44999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    reason: "Best deal for performance and portability.",
    link: "https://www.flipkart.com"
  }
];

const container = document.getElementById("productContainer");
const resultTitle = document.getElementById("resultTitle");

function displayProducts(list) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No cheaper alternatives found. Try another product.</p>";
    return;
  }

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.brand}</p>
      <p class="price">₹${product.price.toLocaleString("en-IN")}</p>
      <p class="rating">⭐ ${product.rating}</p>
      <span class="badge">Best Value</span>
      <p class="reason">${product.reason}</p>

      <div class="card-buttons">
        <a class="buy-link" href="${product.link}" target="_blank">View Deal</a>
        <button onclick='saveItem("${product.name}")'>Save</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function searchProducts() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const priceFilter = document.getElementById("priceFilter").value;
  const ratingFilter = document.getElementById("ratingFilter").value;

  let filtered = products.filter(product =>
    product.category.includes(searchValue) ||
    product.name.toLowerCase().includes(searchValue) ||
    product.brand.toLowerCase().includes(searchValue)
  );

  if (searchValue === "") {
    filtered = products;
  }

  if (priceFilter !== "all") {
    filtered = filtered.filter(product => product.price <= Number(priceFilter));
  }

  if (ratingFilter !== "all") {
    filtered = filtered.filter(product => product.rating >= Number(ratingFilter));
  }

  resultTitle.innerText = searchValue
    ? `Cheaper alternatives for "${searchValue}"`
    : "Popular Alternatives";

  displayProducts(filtered);
}

function saveItem(productName) {
  let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

  if (!savedItems.includes(productName)) {
    savedItems.push(productName);
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
    alert(productName + " saved!");
  } else {
    alert("Already saved!");
  }
}

document.getElementById("savedBtn").addEventListener("click", () => {
  const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

  if (savedItems.length === 0) {
    alert("No saved items yet.");
  } else {
    alert("Saved items:\n" + savedItems.join("\n"));
  }
});

displayProducts(products);
