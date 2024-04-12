//http://localhost:3000/items

const searchInput = document.querySelector(".search-box");
const productsDOM = document.querySelector(".container");
const btns = document.querySelectorAll(".btn");

let allProductsData = [];
const filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      //render products on DOM
    })
    .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    let productName = p.title
      .toLowerCase()
      .includes(_filters.searchItems.toLowerCase());
    if (productName) {
      return productName;
    } else {
      let productClass = p.class
        .toLowerCase()
        .includes(_filters.searchItems.toLowerCase());
      return productClass;
    }
  });
  console.log(filteredProducts);

  //render to DOM
  productsDOM.innerHTML = "";

  filteredProducts.forEach((item, index) => {
    //create
    //content
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <img src=${item.image} alt="p-${index}" />
    <div class="product__details">
    <span class="product__price">${item.price}$</span>
    <span class="product__name">${item.title}</span>
    </div>`;
    //append to product
    productsDOM.appendChild(productDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

//filter based on categories
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // console.log(e.target.dataset.filter);
    const filter = e.target.dataset.filter;
    filters.searchItems = filter;
    renderProducts(allProductsData, filters);
  });
});
