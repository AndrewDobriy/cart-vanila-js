const removeCartItemsBtn = document.querySelectorAll('.btn-danger');

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
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName('cart-price')[0];
    let quantityElement = cartRow.getElementsByClassName(
      'cart-quantity-input'
    )[0];
    console.log(priceElement, quantityElement);
  }
}
