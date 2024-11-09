const getGategories = async () => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/category-list`
  );
  return data;
};
const getAllProducts = async (page) => {
  const skip=(page - 1 )*30;
  const { data } = await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`);
  return data;
};

const displayGategories = async () => {
  const loader = document.querySelector(".loader-container");
  loader.classList.add("active");

  try{
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
  loader.classList.remove("active");
  }
  catch(error){
    document.querySelector(".displayCategories .row").innerHTML = "<P>error in loading</P>";
    loader.classList.remove("active");

  }
  finally{
    loader.classList.remove("active");
  }
  

};

const displayALLProducts = async (page=1) => {
  const loader = document.querySelector(".loader-container");
  loader.classList.add("active");
  try{
    const allProducts = await getAllProducts(page);
    const products =allProducts.products;
  
    const numberOfPages= Math.ceil(allProducts.total/30);
    const result = products
      .map((product) => {
        return `
      <div class="product">
      <a href="./productView.html?id=${product.id}" >
      <h3>${product.title}</h3>
      <img src="${product.thumbnail}" />
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
    let paginationLink='';
    if(page == 1){
       paginationLink+= `<li><button>Prev</button></li>`;
    }
    else{
       paginationLink= `<li><button onclick=displayALLProducts('${page - 1}')>Prev</button></li>`;
    }

    for (let i = 1; i <= numberOfPages; i++) {
      paginationLink +=`<li class = " ${i == page?'pagenationActive':''}"><button onclick=displayALLProducts('${i}')>${i}</button></li>`;
    }
    if(page==numberOfPages)
    paginationLink += `<li ><button onclick=displayALLProducts('${page + 1}') disabled >Next</button></li>`;
    else
    paginationLink += `<li><button onclick=displayALLProducts('${parseInt(page) + 1}')>Next</button></li>`;

    document.querySelector(".pagination").innerHTML = paginationLink;
  }

  catch(error){
    document.querySelector(".displayProducts .row").innerHTML = "<P>error in loading</P>";
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
displayGategories();
displayALLProducts();
