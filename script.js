let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = count;
  }
}

function addToCart(id, name, price, image) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      image,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  alert(`${name} به سبد خرید اضافه شد`);
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");

  if (!cartItems || !totalPrice) return;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>سبد خرید خالی است.</p>";
    totalPrice.textContent = "0";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart.map((item, index) => {
    total += item.price * item.quantity;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" style="width:80px;height:80px;object-fit:cover;border-radius:12px;">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>قیمت: ${item.price.toLocaleString()} تومان</p>
          <p>تعداد: ${item.quantity}</p>
        </div>
        <div class="cart-item-actions">
          <button class="remove-btn" onclick="removeFromCart(${index})">حذف</button>
        </div>
      </div>
    `;
  }).join("");

  totalPrice.textContent = total.toLocaleString();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
  updateCartCount();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();

  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(
        btn.dataset.id,
        btn.dataset.name,
        Number(btn.dataset.price),
        btn.dataset.image
      );
    });
  });
});
