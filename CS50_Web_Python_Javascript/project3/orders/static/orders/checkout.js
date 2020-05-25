document.addEventListener('DOMContentLoaded', () => {
  var cart_str = localStorage.getItem("shoppingCart")
  var cart = JSON.parse(cart_str);
  if (cart == null) {
    window.location.href = "/";
  } else {
    var items = cart["items"];
    var total_price = cart["total_price"];

    var element = document.getElementById("items-abstract");
    document.getElementById("item-count").innerHTML = `${items.length}`;
    for (let i = 0; i < items.length; i++) {
      element.insertAdjacentHTML('beforeend', renderItem(items[i]));
    }
    element.insertAdjacentHTML('beforeend', renderTotalPrice(total_price));

    // information for backend
    var hideInfo = document.getElementById("country-info");
    hideInfo.insertAdjacentHTML('afterbegin', renderItemInfo(cart_str));
  }

});

// create markup for item information
const renderItem = item => {
  const markup = `
    <li class="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 class="my-0">${item["item_name"]} ${item["category"]}</h6>
      </div>
      <span class="text-muted">€${item["price"].toFixed(2)}</span>
    </li>
  `;
  return markup;
};

// create markup for total price
const renderTotalPrice = total_price => {
  const markup = `
    <li class="list-group-item d-flex justify-content-between">
      <span>Total (EURO)</span>
      <strong>€${total_price.toFixed(2)}</strong>
    </li>
  `;
  return markup;
};

// create markup for order information to send to backend
const renderItemInfo = cart => {
  const markup = `
    <input id="data-cart" name="data-cart" value='${cart}' type="hidden"/>
  `;
  return markup;
};

// validation function
(function() {
  'use strict';

  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
