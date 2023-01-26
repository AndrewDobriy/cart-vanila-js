const removeCartItemsBtn = document.querySelectorAll('.btn-danger');

let quantityInputs = document.querySelectorAll('.cart-quantity-input');
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener('change', quantityChanged);
}

let addToCartButtons = document.querySelectorAll('.shop-item-button');
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener('click', addToCartClicked);
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  console.log(title);
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

for (let i = 0; i < removeCartItemsBtn.length; i++) {
  let button = removeCartItemsBtn[i];
  button.addEventListener('click', (e) => {
    let buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  });
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
