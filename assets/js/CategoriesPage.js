const CategoryName = new URLSearchParams(window.location.search).get(
  "Categories"
);
document.querySelector("head title").innerHTML = CategoryName;





// Function to get products by categories
const getProductsByCategories = async () => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/category/${CategoryName}`
  );
  return data.products;
};
const loader = document.querySelector(".loader-container");
  loader.classList.add("active");
const displayAllProductsFromCategory = async () => {
  
  
  try{
    const products = await getProductsByCategories();
    document.querySelector(".displayProducts .container h2").textContent =
      CategoryName;
    const result = products
      .map((product) => {
        return `
        <div class="product">
        <a href="./productView.html?id=${product.id}">
        <h3>${product.title}</h3>
        <img src="${product.thumbnail}" alt="${product.title}">
        <div class="priceAndStock">
        <span> $${product.price}</span>
        <span> ${product.availabilityStatus} : ${product.stock}</span>
        </div>
        </a>
        </div> 
        `;
        
      })
      .join(" ");
      document.querySelector(".displayProducts .row").innerHTML = result;
      loader.classList.remove("active");
  }
  catch(error){
    document.querySelector("loader-container").innerHTML = "An error occurred while fetching products.";
    loader.classList.remove("active");
  }
  finally{
    loader.classList.remove("active");
  }
};
function NavbarScrollAnmation(){
  const navbar = document.querySelector("header");
  window.onscroll=function(){
      (navbar).classList.add("activeOnScroll");
  }
  window.onscrollend=function(){
    setTimeout(() => {
      (navbar).classList.remove("activeOnScroll");
    },3500);
  }
}
NavbarScrollAnmation();
displayAllProductsFromCategory();
