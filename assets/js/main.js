const getGategories = async () => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/category-list`
  );
  return data;
};
const getAllProducts = async () => {
  const { data } = await axios.get(`https://dummyjson.com/products`);
  return data.products;
};

const displayGategories = async () => {
  const categories = await getGategories();
  const result = categories
    .map((category) => {
      return `
        <div class="category">
          <a href="./CategoriesPage.html?Categories=${category}">${category}</a>
        </div>
        `;
    })
    .join(" ");
  document.querySelector(".displayCategories .row").innerHTML = result;
};

const displayALLProducts = async () => {
  const products = await getAllProducts();
  const result = products
    .map((product) => {
      return `
    <div class="product">
    <h3>${product.title}</h3>
    <img src="${product.thumbnail}" />
    <div class="priceAndStock">
    <span> $${product.price}</span>
    <span> ${product.availabilityStatus} : ${product.stock}</span>
    </div>
    </div>
    `;
    })
    .join(" ");
  document.querySelector(".displayProducts .row").innerHTML = result;
};

displayGategories();
displayALLProducts();
