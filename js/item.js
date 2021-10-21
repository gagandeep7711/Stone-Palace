const productContainer = document.querySelector(".product-container");
const spanCartItems = document.querySelector(".span-cart");
const wishListSpan = document.querySelector(".span-wish");

document.addEventListener("DOMContentLoaded", () => {
  getProducts();
  addToCartNumber();
  wishListSpan.style.opacity = 1;
});

async function getProducts() {
  try {
    let data = await JSON.parse(localStorage.getItem("selectedProduct"));

    displayProduct(data);

    let cartButton = document.querySelectorAll(".cart-btn");

    for (let i = 0; i < cartButton.length; i++) {
      cartButton[i].addEventListener("click", () => {
        let products = data.GardenProduct;
        cartNumber({ ...products[i], inCart: 0 });
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function displayProduct(products) {
  console.log(products);
  let result = `
  <div class="product-image ">
  <img src=${products.image} class="detail-view" style="display: none;">
  <div class="detail-view" style="background-image: url(${products.image});"></div>
</div>
<div class="product-description">
  <small>NEW</small>
  <h2>${products.title}</h2>
  <div class="product-rating">
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star-half-alt"></i>
  </div>
  <p class="product-price">Rs: <span>${products.price}</span>.00/-</p>
  <p class="available"><b>Availability:</b> In Stock</p>
  <div class="qty-btn">
      <p>Quantity</p>
      <input type="number" value="1">
      <button class="prod-cart-btn cart-btn">Add to Cart</button>
  </div>
</div>
          `;
  productContainer.innerHTML = result;
}

function addToCartNumber() {
  let addToCartNumbers = localStorage.getItem("cartNumbers");
  spanCartItems.innerHTML = addToCartNumbers;
  let wishCartNumbers = localStorage.getItem("wishList");
  wishListSpan.innerHTML = wishCartNumbers;
}

function cartNumber(products) {
  if (!products.isWishList) {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
      localStorage.setItem("cartNumbers", productNumbers + 1);
      spanCartItems.innerHTML = productNumbers + 1;
    } else {
      localStorage.setItem("cartNumbers", 1);
      spanCartItems.innerHTML = 1;
    }
    setItems(products);
  }
}

function setItems(products) {
  if (!products.isWishList) {
    let cartItem = localStorage.getItem("productsCart");
    cartItem = JSON.parse(cartItem);
    console.log("my product is", products);

    if (cartItem != null) {
      if (cartItem[products.title] == undefined) {
        cartItem = {
          ...cartItem,
          [products.title]: products,
        };
      }
      cartItem[products.title].inCart += 1;
    } else {
      products.inCart = 1;
      cartItem = {
        [products.title]: products,
      };
    }
    localStorage.setItem("productsCart", JSON.stringify(cartItem));
    totalCost(products);
  } else {
    let wishListItem = JSON.parse(localStorage.getItem("wishListObjs"));
    console.log("my wishlistobjects is", wishListItem);

    if (wishListItem != null) {
      if (wishListItem[products.title] == undefined) {
        wishListItem = {
          ...wishListItem,
          [products.title]: products,
        };
      }
    } else {
      wishListItem = {
        ...wishListItem,
        [products.title]: products,
      };
    }
    localStorage.setItem("wishListObjs", JSON.stringify(wishListItem));
  }
}

function totalCost(product) {
  console.log("price of product", product.price);
  let totalCost = localStorage.getItem("totalCost");
  console.log("my total cost is ", totalCost);

  if (totalCost != null) {
    totalCost = parseInt(totalCost);
    localStorage.setItem("totalCost", totalCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function checkValidation() {
  let userName = localStorage.getItem("userName");
  let userEmail = localStorage.getItem("userEmail");
  if (userName || userEmail) {
    window.location.href = "../wishList.html";
  } else {
    swal({
      title: "Please Login First to use this Feature!",
      icon: "warning",
    });
  }
}
