// import axios from 'axios';

const searchInput = document.querySelector(".search-input");
const productContainer = document.querySelector(".product-container");
const buttons = [...document.querySelectorAll(".btn")];
console.log(buttons);

let allProductsData = [];

const filters = {
  searchItem: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      renderProducts(res.data, filters);
    })
    .catch((err) => {
      console.log(err);
    });
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItem.toLowerCase());
  });

  productContainer.innerHTML = "";

  // ? RENDER TO DOM
  filteredProducts.forEach((p) => {
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    productsDiv.innerHTML = `<div class="img-container">
          <img src=${p.image} alt=${p.id} class="product-img">
        </div>
        <div class="product-desc">
          <p class="product-title">Watch model : ${p.title}</p>
          <p class="product-price">price : $${p.price}</p>
        </div>
        <button class="add-to-cart">add to cart</button>`;
    productContainer.appendChild(productsDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  filters.searchItem = e.target.value;
  renderProducts(allProductsData, filters);
});

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filters.searchItem = e.target.dataset.filter;
    renderProducts(allProductsData, filters);
  });
});
