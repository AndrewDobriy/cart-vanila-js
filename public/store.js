const removeCartItemsBtn = document.querySelectorAll('.btn-danger');
for (var i = 0; i < removeCartItemsBtn.length; i++) {
  var button = removeCartItemsBtn[i];
  button.addEventListener('click', removeCartItem);
}

const quantityInputs = document.querySelectorAll('.cart-quantity-input');
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener('change', quantityChanged);
}

const addToCartButtons = document.querySelectorAll('.shop-item-button');
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener('click', addToCartClicked);
}

document
  .querySelectorAll('.btn-purchase')[0]
  .addEventListener('click', purchaseClicked);

function purchaseClicked() {
  alert('Thank you for your purchase');

  let carItems = document.getElementsByClassName('cart-items')[0];

  while (carItems.hasChildNodes()) {
    carItems.removeChild(carItems.firstChild);
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement('div');
  let cartItems = document.querySelector('.cart-items');
  cartRow.classList.add('cart-row');

  let cartItemsNames = cartItems.querySelectorAll('.cart-item-title');
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('This item is already added to the cart');
      return;
    }
  }

  let cartRowContents = `
    <div class="cart-item cart-column">
      <img
        class="cart-item-image"
        src=${imageSrc}
        width="100"
        height="100"
      />
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1" />
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName('btn-danger')[0]
    .addEventListener('click', removeCartItem);
  cartRow
    .getElementsByClassName('cart-quantity-input')[0]
    .addEventListener('change', quantityChanged);
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItem(e) {
  let buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

for (let i = 0; i < removeCartItemsBtn.length; i++) {
  let button = removeCartItemsBtn[i];
  button.addEventListener('click', removeCartItem);
}

function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName('cart-items')[0];
  const cartRows = cartItemContainer.getElementsByClassName('cart-row');
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName('cart-price')[0];
    let quantityElement = cartRow.getElementsByClassName(
      'cart-quantity-input'
    )[0];
    let price = priceElement.innerText.replace('$', '');
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.querySelector('.cart-total-price').innerText = `$${total}`;
}
