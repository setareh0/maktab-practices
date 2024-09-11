const products = [
  {
    id: 1,
    name: "همبرگر مخصوص",
    price: 10000,
    img: "./Assets/img/hamburger.png",
  },
  {
    id: 2,
    name: "همبرگر معمولی",
    price: 8000,
    img: "./Assets/img/hamburger.png",
  },
  {
    id: 3,
    name: "همبرگر مخصوص با قارچ و پنیر",
    price: 20000,
    img: "./Assets/img/hamburger.png",
  },
  {
    id: 4,
    name: "همبرگر معمولی با قارچ و پنیر",
    price: 10000,
    img: "./Assets/img/hamburger.png",
  },
  {
    id: 5,
    name: "سیب زمینی سرخ کرده",
    price: 10000,
    img: "./Assets/img/french_fries.png",
  },
  {
    id: 6,
    name: "سیب زمینی سرخ کرده ویژه",
    price: 25000,
    img: "./Assets/img/french_fries.png",
  },
  { id: 7, name: "نوشابه", price: 5000, img: "./Assets/img/soda.png" },
  { id: 8, name: "نوشابه رژیمی", price: 6000, img: "./Assets/img/soda.png" },
  { id: 9, name: "سالاد سزار", price: 25000, img: "./Assets/img/ceasar.png" },
  { id: 10, name: "سالاد فصل", price: 8000, img: "./Assets/img/salad.png" },
];

const menuItems = document.getElementById("menuItems");
function showMenu() {
  products.map((product) => {
    const menuCard = document.createElement("div");
    menuCard.className = "menu-card";
    menuCard.innerHTML = `
     <img src="${product.img}" alt="${product.name}" />
            <div class="data">
              <div class="card-title">
                <h2>${product.name}</h2>
                <p class="price">${product.price} تومان</p>
                <div class="add-to-card">
                  <span class="add-food" data-id="${product.id}"">
                    <i class="fa fa-plus"></i>
                  </span>
                  <span class="count" id="count-${product.id}">0</span>
                  <span class="remove-food" data-id="${product.id}" ">
                    <i class="fa fa-minus"></i>
                  </span>
                </div>
              </div>
              <div class="total-price-menu" id="total-price-menu-${product.id}">0 تومان</div>
            </div>
    `;
    menuItems.append(menuCard);
  });
}

showMenu();
let orders = [];
const ordersPrice = document.getElementById("total-orders-price");
const addFood = document.querySelectorAll(".add-food");
const removeFood = document.querySelectorAll(".remove-food");

window.onload = function () {
  getFromLocalStorage();
};

menuItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-plus")) {
    const productId = parseInt(e.target.closest(".add-food").dataset.id);
    addToCard(productId);
  } else if (e.target.classList.contains("fa-minus")) {
    const productId = parseInt(e.target.closest(".remove-food").dataset.id);
    removeFromCart(productId);
  }
});

function addToCard(productId) {
  let findProduct = products.find((product) => product.id === productId);
  let findOrder = orders.find((order) => order.id === productId);

  if (findOrder) {
    findOrder.count++;
  } else {
    orders.push({ ...findProduct, count: 1 });
  }
  // console.log(findProduct, "add");
  // console.log(findOrder);
  console.log(orders);

  updateOrderPrice();
  updateOrderPriceMenu(productId);
  updateCount(productId);
  feePrice();
  updateTotalPrice();
  showDiscount();
  saveToLocalStorage();
}

function removeFromCart(productId) {
  let findOrderIndex = orders.findIndex((order) => order.id === productId);
  if (findOrderIndex !== -1) {
    // console.log(orders);
    // console.log(orders[findOrderIndex]);
    console.log(orders);

    // console.log(orders[findOrderIndex].count);

    orders[findOrderIndex].count--;
    if (orders[findOrderIndex].count <= 0) {
      orders.splice(findOrderIndex, 1);
    }
  }
  updateOrderPrice();
  updateOrderPriceMenu(productId);
  updateCount(productId);
  feePrice();
  updateTotalPrice();
  showDiscount();
  saveToLocalStorage();
}

function updateOrderPrice() {
  let orderPrice = orders.reduce((prev, curr) => {
    return prev + curr.price * curr.count;
  }, 0);
  ordersPrice.innerText = `${orderPrice} تومان`;
}

function updateOrderPriceMenu(productId) {
  const orderPriceMenu = document.getElementById(
    `total-price-menu-${productId}`
  );
  const findOrderId = orders.find((order) => {
    return order.id === productId;
  });
  const totalPriceMenu = findOrderId
    ? findOrderId.price * findOrderId.count
    : 0;
  orderPriceMenu.innerText = `${totalPriceMenu} تومان`;
  // console.log(orderPriceMenu);
  // console.log(findOrderId);
}

function updateCount(productId) {
  const orderCount = document.getElementById(`count-${productId}`);
  const findOrderId = orders.find((order) => {
    return order.id === productId;
  });
  const count = findOrderId ? findOrderId.count : 0;
  orderCount.innerText = count;
}

function feePrice() {
  const fee = document.getElementById("fee-price");
  const totalPrice = document.getElementById("total-orders-price");
  const totalPriceValue = parseInt(totalPrice.innerText);
  const updateFee = totalPriceValue / 20;
  fee.innerText = `${updateFee} تومان`;
  // console.log(updateFee);
}

function updateTotalPrice() {
  let totalPriceCard = document.getElementById("total-price-payment");
  const totalPrice = parseInt(
    document.getElementById("total-orders-price").innerText
  );
  const fee = parseInt(document.getElementById("fee-price").innerText);
  let discountPercent = parseInt(
    document.getElementById("discountPercent").innerText
  );

  let total = totalPrice + fee;
  let discount = (total * discountPercent) / 100;
  let updateTotalPrice = total - discount;
  totalPriceCard.innerText = `${updateTotalPrice} تومان`;
  // console.log(totalPriceCard);
}

function showDiscount() {
  const discountInput = document.getElementById("discount-input").value;
  const totalPriceCard = document.getElementById("total-price-payment");
  let totalPrice = totalPriceCard.innerText;
  let discountPercent = document.getElementById("discountPercent");

  if (discountInput === "gold") {
    totalPrice = totalPrice - totalPrice * 30;
    discountPercent.innerText = "30 درصد";
  } else if (discountInput === "silver") {
    totalPrice = totalPrice - totalPrice * 20;
    discountPercent.innerText = "20 درصد";
  } else if (discountInput === "bronze") {
    totalPrice = totalPrice - totalPrice * 10;
    discountPercent.innerText = "10 درصد";
  }
  updateTotalPrice();
}

const discountBtn = document.getElementById("discount-btn");

discountBtn.addEventListener("click", showDiscount);

const submit = document.getElementById("submit");
const modal = document.getElementById("modal");
const submitBtn = document.getElementById("submit-btn");

function showModal() {
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
}
submit.addEventListener("click", showModal);

function closeModal() {
  modal.style.display = "none";
  removeAfterModal();
  localStorage.removeItem("orders");
  // localStorage.clear();
}
submitBtn.addEventListener("click", closeModal);

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    removeAfterModal();
  }
};

function saveToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function getFromLocalStorage() {
  const ordersData = localStorage.getItem("orders");
  if (ordersData) {
    orders = JSON.parse(ordersData);
  }
  updateOrderPrice();
  updateTotalPrice();
  feePrice();
  showDiscount();
  orders.forEach((order) => {
    updateCount(order.id);
    updateOrderPriceMenu(order.id);
  });
}

function removeAfterModal() {
  const orderPriceMenu = document.querySelectorAll(".total-price-menu");
  orderPriceMenu.forEach((order) => {
    order.innerText = "0 تومان";
  });
  const orderCount = document.querySelectorAll(".count");
  orderCount.forEach((order) => {
    order.innerText = "0";
  });
  const orderPrice = document.getElementById("total-orders-price");
  orderPrice.innerText = "0 تومان";
  const fee = document.getElementById("fee-price");
  fee.innerText = "0 تومان";

  const discountPercent = document.getElementById("discountPercent");
  discountPercent.innerText = "0 درصد";
  let totalPriceCard = document.getElementById("total-price-payment");
  totalPriceCard.innerText = "0 تومان";
  const discountInput = document.getElementById("discount-input");
  discountInput.value = "";
  orders = [];
}
