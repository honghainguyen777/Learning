document.addEventListener('DOMContentLoaded', () => {
  var cart_str = localStorage.getItem("shoppingCart")
  var cart = JSON.parse(cart_str);
  console.log(cart);
  if (cart == null) {
    window.location.href = "/";
  } else {
    var items = cart["items"];
    var total_price = cart["total_price"];

    var element = document.getElementById("items-abstract");
    document.getElementById("item-count").innerHTML = `${items.length}`;
    for (let i = 0; i < items.length; i++) {
      var item_info = JSON.parse((items[i])["item"]);
      element.insertAdjacentHTML('beforeend', renderItemCheckout(items[i], item_info));
    }
    element.insertAdjacentHTML('beforeend', renderTotalPrice(total_price));

    // information for backend
    var hideInfo = document.getElementById("country-info");
    hideInfo.insertAdjacentHTML('afterbegin', renderItemInfo(cart_str));
  }
});

// create markup for item information
const renderItemCheckout = (item, item_info) => {
  const markup = `
    <li class="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 class="my-0">${item_info["name"]} (${item["quantity"]} ${item_info["unit"]})</h6>
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
