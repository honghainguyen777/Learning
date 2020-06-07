// this work is for the disply and modify of the cart state right after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

  var element = document.querySelector(".shoppingCart");
  // retrive data from localStorage
  var cart = JSON.parse(localStorage.getItem("shoppingCart"));
  if (cart == null) {
    renderEmptyCart();
  } else {
    var items = cart["items"];
    var total_price = cart["total_price"];
    document.querySelectorAll(".total-price").forEach(el => {
      el.innerHTML = `<b>€${total_price.toFixed(2)}</b>`;
    });

    if (items.length === 0) {
      renderEmptyCart();
    } else {
      for (let i = 0; i < items.length; i++) {
        const item_raw = items[i];
        const item = {
          "name": (JSON.parse(item_raw["item"]))["name"],
          "id": (JSON.parse(item_raw["item"]))["id"],
          "price_basic": (JSON.parse(item_raw["item"]))["price"],
          "price": item_raw["price"],
          "notice": item_raw["notice"],
          "quantity": item_raw["quantity"]
        }

        var markups = renderItem(item, item_raw);
        // may change to border
        element.insertAdjacentHTML('beforeend', markups);
      }
    }
  }

  $(".shoppingCart-footer").on("click", "#empty-cart", function() {
    // ask user to confirm before remove all items
    const confirmation = confirm("Are you sure to make empty your cart?");
    if (confirmation) {
      element.innerHTML = '';
      renderEmptyCart();
      localStorage.removeItem("shoppingCart");
      cart = null;
    }
  });

  $(".shoppingCart").on("click", ".remove-item", function() {
    const parent = this.parentElement.parentElement;
    const data_element = parent.querySelector(".data-item");
    var item = JSON.parse(data_element.getAttribute("data-item"));
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
    items = cart["items"];
    update_localStorage("remove", element, cart, items, item);
    parent.parentElement.removeChild(parent);
    if (document.querySelector(".item-field") == null) {
      renderEmptyCart();
    }
  });

  $(".shoppingCart").on("click", ".quantity_click", function() {
    var parent = this.parentElement;
    var item_field = parent.parentElement.parentElement;
    var quantity_el = parent.querySelector(".quantity")
    var current_quantity = parseInt(quantity_el.value);
    var data_element = item_field.querySelector(".data-item");
    var item = JSON.parse(data_element.getAttribute("data-item"));
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
    items = cart["items"];
    if (this.getAttribute("data-type") === "plus") {
      quantity_el.value = current_quantity + 1;
      cart, items, item, total_price = update_localStorage("quantity_plus", element, cart, items, item);
      data_element.setAttribute("data-item", JSON.stringify(item));
      document.querySelectorAll(".total-price").forEach(el => {
        el.innerHTML = `<b>€${total_price.toFixed(2)}</b>`;
      });
      item_field.querySelector(".item-price").innerHTML = `<b>€${item["price"].toFixed(2)}</b>`;
    } else if (this.getAttribute("data-type") === "minus") {
      if (current_quantity > 1) {
        quantity_el.value = current_quantity - 1;
        cart, items, item, total_price = update_localStorage("quantity_minus", element, cart, items, item);
        data_element.setAttribute("data-item", JSON.stringify(item));
        document.querySelectorAll(".total-price").forEach(el => {
          el.innerHTML = `<b>€${total_price.toFixed(2)}</b>`;
        });
        item_field.querySelector(".item-price").innerHTML = `<b>€${item["price"].toFixed(2)}</b>`;
      } else {
        update_localStorage("remove", element, cart, items, item);
        item_field.parentElement.removeChild(item_field);
        if (document.querySelector(".item-field") == null) {
          renderEmptyCart();
        }
      }
    }
  });
});


function update_localStorage(type, element, cart, items, item) {
  for (let i = 0; i < items.length; i++) {
    // becareful in case the order of key-value pair in the object is different
    // acceptable in this case
    if (JSON.stringify(items[i]) === JSON.stringify(item)) {
      var price_basic = (JSON.parse(item["item"]))["price"];
      if (type === "remove") {
        items.splice(i, 1);
        cart["total_price"] -= item["price"];
        document.querySelectorAll(".total-price").forEach(el => {
          el.innerHTML = `<b>€${cart["total_price"].toFixed(2)}</b>`;
        });
      } else if (type === "quantity_plus") {
        // make sure quantity in item is a number
        item["quantity"] = parseInt(item["quantity"])
        item["quantity"] += 1;
        item["price"] += price_basic;
        cart["total_price"] += price_basic;
        items[i] = item;
      } else if (type === "quantity_minus") {
        item["quantity"] -= 1;
        item["price"] -= price_basic;
        cart["total_price"] -= price_basic;
        items[i] = item;
      }

      cart["items"] = items;
      let total_price = cart["total_price"];
      localStorage.setItem("shoppingCart", JSON.stringify(cart));

      return cart, items, item, total_price;
      // break;
    }
  }
};

function renderEmptyCart() {
  const markup = `
    <div class="text-center pt-3 pb-3" id="empty">
      <img style="width: 100px; height: 100px;" src="https://cdn.pixabay.com/photo/2014/04/02/17/03/shopping-cart-307772_960_720.png">
      <h5 class="pt-2">Opps! Your card is empty</h5>
    </div>
  `;
  const el = document.querySelector(".shoppingCart");
  el.insertAdjacentHTML('beforeend', markup);
  document.querySelectorAll(".total-price").forEach(el => {
    el.innerHTML = `€0.00`;
  });
  document.getElementById("empty-cart").style.display = 'none';
  document.getElementById("PCheckout").style.display = 'none';


};

// improve by make sure other option and basic options
function renderItem(item, item_raw) {
  const markup = `
      <div class="item-field w-100 border-bottom border-success">
        <div class="d-flex align-items-center mt-3 mb-1">
          <div class="flex-grow-1 ml-1 pl-0">
            <a href="/item/${item["id"]}"><h5 class="m-0"><b>${item["name"]}</b></h5></a>
          </div>
          <div class="ml-1 pl-3 item-price">
            <p class="m-0"><b>€${item["price"].toFixed(2)}</b></p>
          </div>
          <div class="ml-1 pl-3 mr-2 remove-item">
            <button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
          </div>
        </div>
        <div class="ml-3 d-flex align-items-center">
          <h6 class="pr-3"><b>Quantity:</b></h6>
          <div class="ml-3 d-flex ">
            <button class="quantity_click quantity_left btn btn-outline-dark" data-type="minus">-</button>
            <input class="quantity quantity_middle btn-outline-dark" type="number" value="${item["quantity"]}" style="width: 30px;" min=1>
            <button class="quantity_click quantity_right btn btn-outline-dark" data-type="plus">+</button>
          </div>
        </div>
        <div class="ml-3 d-flex mt-1 align-items-center">
          <h6 class="pr-2"><b>Customer needs:</b></h6>
          <div>
            <p class="mb-2">${item["notice"]}</p>
          </div>
        </div>
        <div class="invisible data-item" data-item='${JSON.stringify(item_raw)}'>
      </div>
      `;
  return markup;
  //element.insertAdjacentHTML('beforeend', markup);
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
