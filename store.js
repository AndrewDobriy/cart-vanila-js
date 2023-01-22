const removeCartItemsBtn = document.querySelectorAll('.btn-danger');

for (let i = 0; i < removeCartItemsBtn.length; i++) {
  let button = removeCartItemsBtn[i];
  button.addEventListener('click', (e) => {
    let buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.remove();
  });
}
