let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  let cartItemsDiv = document.getElementById("cart-items");
  let totalText = document.getElementById("total");
  let subtotalText = document.getElementById("subtotal");
  let shippingText = document.getElementById("shipping");
  
  cartItemsDiv.innerHTML = "";
  let subtotal = 0;
  const shippingFee = cart.length > 0 ? 100 : 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p class="text-muted" style="grid-column: 1/-1; text-align: center; padding: 3rem;">Your cart is currently empty.</p>`;
  }

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    cartItemsDiv.innerHTML += `
      <div class="card">
        <div class="card-img-wrapper">
          <img src="${item.image || 'images/placeholder.png'}" alt="${item.name}">
        </div>
        <div class="card-content">
          <h3>${item.name}</h3>
          <p class="price">₱${item.price.toLocaleString()}</p>

          <div class="qty-controls" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <button class="btn btn-outline" style="width: 32px; height: 32px; padding: 0;" onclick="decreaseQty(${i})">-</button>
            <span style="font-weight: 600; min-width: 20px; text-align: center;">${item.qty}</span>
            <button class="btn btn-outline" style="width: 32px; height: 32px; padding: 0;" onclick="increaseQty(${i})">+</button>
          </div>

          <p style="font-weight: 500; margin-top: 0.5rem;">Subtotal: <span style="color: var(--accent);">₱${itemTotal.toLocaleString()}</span></p>
          <button class="btn btn-ghost" style="color: var(--danger); margin-top: 1rem; padding-left: 0;" onclick="removeItem(${i})">
            <i class="fas fa-trash-alt"></i> Remove
          </button>
        </div>
      </div>
    `;
  }

  let total = subtotal + shippingFee;
  if (subtotalText) subtotalText.innerText = "₱" + subtotal.toLocaleString();
  if (shippingText) shippingText.innerText = "₱" + shippingFee.toLocaleString();
  if (totalText) totalText.innerText = "₱" + total.toLocaleString();
}

function increaseQty(index) {
  cart[index].qty += 1;
  saveCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
    saveCart();
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

function clearCart() {
  if (confirm("Are you sure you want to clear your entire cart?")) {
    cart = [];
    saveCart();
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function goBack() {
  window.location.href = "index.html";
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}

displayCart();