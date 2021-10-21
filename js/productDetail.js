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
    let result = await fetch("../db.json");
    let data = await result.json();

    displayProduct(data);

    let cartButton = document.querySelectorAll(".cart-btn");
    let wishListButton = document.querySelectorAll(".wishlist");

    for (let i = 0; i < cartButton.length; i++) {
      cartButton[i].addEventListener("click", () => {
        let products = data.LatestProduct;
        cartNumber({ ...products[i], inCart: 0 });
      });
    }
    for (let j = 0; j < wishListButton.length; j++) {
      wishListButton[j].addEventListener("click", () => {
        let products = data.LatestProduct;
        let wishListObjs = JSON.parse(localStorage.getItem("wishListObjs"));
        let title =
          wishListButton[j].parentElement.parentElement.children[0].innerHTML;

        if (wishListObjs != null) {
          if (wishListObjs[title] === undefined) {
            cartNumber({ ...products[j], isWishList: true });
          } else {
            swal("Ooppss!", "Already Added to WishList ♥!", "info");
          }
        } else {
          cartNumber({ ...products[j], isWishList: true });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function displayProduct(products) {
  console.log(products);
  let result = "";
  products.LatestProduct.forEach((item) => {
    result += `
        <div class="product-image ">
        <img src=${item.image} class="detail-view" style="display: none;">
        <div class="detail-view" style="background-image: url(${item.image});"></div>
    </div>
    <div class="product-description">
        <small>NEW</small>
        <h2>${item.title}</h2>
        <div class="product-rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star-half-alt"></i>
        </div>
        <p class="product-price">Rs: <span>${item.price}</span>.00/-</p>
        <p class="available"><b>Availability:</b> In Stock</p>
        <div class="qty-btn">
            <p>Quantity</p>
            <input type="number" value="1">
            <button class="prod-cart-btn">Add to Cart</button>
        </div>
    </div>
        

            `;
  });
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
  } else {
    let wishListNumber = parseInt(localStorage.getItem("wishList"));
    if (wishListNumber) {
      localStorage.setItem("wishList", wishListNumber + 1);
      wishListSpan.innerHTML = wishListNumber + 1;
      console.log(
        "my wishlist if already exist*****",
        parseInt(wishListNumber) + 1
      );
      setItems(products);
      swal(
        "Added to WishList ♥!",
        "Successfully added to your WishList",
        "success"
      );
    } else {
      let storedWishCartNumber = localStorage.setItem("wishList", 1);
      wishListSpan.innerHTML = 1;
      console.log("my wishlist*****", parseInt(storedWishCartNumber) + 1);
      setItems(products);
      swal(
        "Added to WishList ♥!",
        "Successfully added to your WishList",
        "success"
      );
    }
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

const cartBtn = document.querySelector(".prod-cart-btn");
const spanCartItems = document.querySelector(".span-cart");
const quantityBtn = document.querySelector(".qty-btn > input");
console.log(quantityBtn.value);
let productObj = {};

document.addEventListener("DOMContentLoaded", () => {
  addToCartNumber();
});

function addToCartNumber() {
  let addToCartNumbers = localStorage.getItem("cartNumbers");
  spanCartItems.innerHTML = addToCartNumbers;
}

cartBtn.addEventListener("click", (e) => {
  const title = cartBtn.parentElement.parentElement.children[1].innerHTML;
  let image =
    cartBtn.parentElement.parentElement.parentElement.children[0].children[0]
      .attributes[0].nodeValue;
  image = image.substring(3);
  const price = parseInt(
    cartBtn.parentElement.parentElement.children[4].children[0].innerHTML
  );
  productObj = {
    title,
    price,
    image,
  };
  console.log(cartBtn.parentElement.parentElement.children[1].innerHTML);
  console.log(
    cartBtn.parentElement.parentElement.parentElement.children[0].children[0]
      .attributes[0].nodeValue
  );

  console.log(
    cartBtn.parentElement.parentElement.children[4].children[0].innerHTML
  );

  addToCart(productObj);
});

function addToCart(product) {
  let inCart = parseInt(quantityBtn.value);
  console.log("Quantity", inCart);
  console.log({ ...product, inCart });

  cartNumber({ ...product, inCart });
}

function cartNumber(product) {
  let productNumbers = parseInt(localStorage.getItem("cartNumbers"));
  console.log("productNumbers", productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + product.inCart);
    spanCartItems.innerHTML = productNumbers + product.inCart;
  } else {
    localStorage.setItem("cartNumbers", 1);
    spanCartItems.innerHTML = 1;
  }
  setItems(product);
}

function setItems(products) {
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
    cartItem[products.title].inCart += products.inCart;
  } else {
    products.inCart = 1;
    cartItem = {
      [products.title]: products,
    };
  }
  localStorage.setItem("productsCart", JSON.stringify(cartItem));

  totalCost(products);
}

function totalCost(product) {
  // const price = parseInt(product.price)
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
