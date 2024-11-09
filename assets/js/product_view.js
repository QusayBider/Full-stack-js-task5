const Id_product = new URLSearchParams(window.location.search).get(
    "id"
  );

  const product_from_Id =async ()=>{
   const {data}= await axios.get(`https://dummyjson.com/products/${Id_product}`); 
   return data;
  }

  const display_Data=async()=>{
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
      try{
        const get_Data =  await product_from_Id();
        document.querySelector("head title").innerHTML = `${get_Data.title}`;
        const show_Data=
         `
         <div class="producat_wrapper">
            <div class="producat_image">
              <div class="img_thumbnail">
                <img src="${get_Data.thumbnail}" alt="" />
                <div class="img_small">
                </div>
              </div>
            </div>
            <div class="producat_content">
              <p class="company_txt">${get_Data.brand}</p>
              <h2>${get_Data.title}</h2>
              <p class="producat_des">
              ${get_Data.description}
              </p>
              <div class="price">
                <div class="dicscount_price">
                  <p class="normal_price">${get_Data.price} $</p>
                </div>
              </div>
              <div class="qty">
                <div class="btns">
                  <button type="button" class="decreament">-</button>
                  <button type="input" class="qty_numbers">1</button>
                  <button type="button" class="increament">+</button>
                </div>
                <button class="add_cart" type="button">
                  <span
                    ><svg
                      width="22"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                        fill="#ffffff"
                        fill-rule="nonzero"
                      /></svg
                  ></span>
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
          </div>
        `;
        
        document.querySelector("section .container").innerHTML = show_Data;
         loader.classList.remove("active");
      }
      catch(error){
        document.querySelector("loader-container").innerHTML = "<P>error in loading</P>";
         loader.classList.remove("active");
    
      }
      finally{
        loader.classList.remove("active");
      }
  }
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
  display_Data();


