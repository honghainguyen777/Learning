

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector(".shoppingCart");
  // retrive data from localStorage
  var cart = JSON.parse(localStorage.getItem("shoppingCart"));
  if (cart == null) {
    renderEmptyCart();
  }
  var items = cart["items"];
  var total_price = cart["total_price"] ;

  if (items.length === 0) {
    renderEmptyCart();
  } else {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const toppings = item["toppings"].join(", ");
      const extrasubs = item["extrasubs"].join(", ");

      var markups = renderItem(item);
      if (toppings != "") {
        markups += renderToppingOrSub("Topping", toppings);
      } else if (extrasubs != "") {
        markups += renderToppingOrSub("ExraSubs", extrasubs);
      }
      // may change to border
      element.insertAdjacentHTML('beforeend', markups);
    }
  }

  document.getElementById("total-price").innerHTML = `€${total_price.toFixed(2)}`;

  // remove all items when empty-cart is clicked
  document.getElementById('empty-cart').onclick = () => {
    // ask user to confirm before remove all items
    let confirmation = confirm("Are you sure to make empty your cart?");
    if (confirmation) {
      element.innerHTML = '';
      renderEmptyCart();
      localStorage.removeItem("shoppingCart");
    }
  };

  // remove item
  document.querySelectorAll(".remove-item").forEach(el => {
    el.onclick = () => {
      const parent = el.parentElement.parentElement;
      const data_element = parent.querySelector(".data-item");
      const item = JSON.parse(data_element.getAttribute("data-item"));
      const price = item["price"];

      for (let i = 0; i < items.length; i++) {
        // becareful in case the order of key-value pair in the object is different
        // acceptable in this case
        if (JSON.stringify(items[i]) === JSON.stringify(item)) {
          items.splice(i, 1);
          cart["items"] = items;
          total_price -= price;
          cart["total_price"] = total_price;
          localStorage.setItem("shoppingCart", JSON.stringify(cart));
          document.getElementById("total-price").innerHTML = `€${total_price.toFixed(2)}`;
          console.log(element.childElementCount);
          if (element.childElementCount == 1) {
            renderEmptyCart();
          }
          // ensure more than 2 similar items - later improve models by providing count
          break;
        }
      }
      parent.parentElement.removeChild(parent);

    };
  });



  // avoid submit when data = 0 or number of elements = 0 (can be dont in sever side)
});

// make sure only if topping or sub is available
const renderEmptyCart = () => {
  const markup = `
    <div class="text-center">
      <h5>Your card is empty. Shopping <a href="/">here</a></h5>
    </div>
  `;
  const el = document.querySelector(".shoppingCart");
  el.insertAdjacentHTML('beforeend', markup);
  document.getElementById("total-price").innerHTML = `€0.00`;
  document.getElementById("empty-cart").style.display = 'none';
  document.getElementById("PCheckout").style.display = 'none';

};

const renderItem = item => {
    const markup = `
      <div class="item-field w-100 border-bottom border-success">
        <div class="d-flex align-items-center mt-3">
          <div class="flex-grow-1 ml-1 pl-3">
            <p>${item["item_name"]} ${item["category"]}</p>
          </div>
          <div class="ml-1 pl-3">
            <p>€${item["price"]}</p>
          </div>
          <div class="ml-1 pl-3 remove-item">
            <p>Remove</p>
          </div>
        </div>
        <div class="invisible data-item" data-item='${JSON.stringify(item)}'></div>
      `;
    return markup;
    //element.insertAdjacentHTML('beforeend', markup);
};

const renderToppingOrSub = (type, values) => {
  const markup = `
    <div class="d-flex align-items-center">
      <div class="flex-grow-1 ml-1 pl-3">
        <p>${type}: ${values}</p>
      </div>
    </div>
  `;
  return markup;
  //element.insertAdjacentHTML('beforeend', markup);
};
