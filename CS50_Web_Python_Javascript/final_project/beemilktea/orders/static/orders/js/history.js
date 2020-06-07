document.addEventListener('DOMContentLoaded', () => {
  var message = document.getElementById("message");
  if (message != null && message.getAttribute("data-message") === "Thank you! We have received your order") {
    localStorage.removeItem("shoppingCart");
    element.innerHTML = '';
    renderEmptyCart();
    cart = null;
  }
});
