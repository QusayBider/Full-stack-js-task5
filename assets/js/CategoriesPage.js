const CategoryName= new URLSearchParams(window.location.search).get("Categories");
document.querySelector("head title").innerHTML=CategoryName;

// Function to get products by categories
const getProductsByCategories =async () => {
const {data} = await axios.get(`https://dummyjson.com/products/category/${CategoryName}`);
console.log(data);
return data.products;
};

const displayAllProductsFromCategory = async() => {
const products =await getProductsByCategories();
document.querySelector(".displayProducts .container h2").textContent =CategoryName;
const result = products.map((product) => {
    return `
    <div class="product">
    <h3>${product.title}</h3>
    <img src="${product.thumbnail}" alt="${product.title}">
    <div class="priceAndStock">
    <span> $${product.price}</span>
    <span> ${product.availabilityStatus} : ${product.stock}</span>
    </div>
    </div> 
    `
}).join(' ');
document.querySelector(".displayProducts .row").innerHTML = result;
};

displayAllProductsFromCategory();

