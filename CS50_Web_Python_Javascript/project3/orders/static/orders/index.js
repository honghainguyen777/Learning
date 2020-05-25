
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(".button-order").forEach(el => {
      el.onclick = () => {
        var a = el.parentElement.parentElement;
        var category = a.parentElement.getAttribute("data-category");
        var item_name = a.getAttribute("data-itemName");
        var toppings = [];
        var extrasubs = [];
        var price;
        // list of items need toppings
        var list_item_toppings = ["1 topping", "2 toppings", "3 toppings", "Special", "1 item", "2 items", "3 items"];

        // The multiple select tag used from https://developer.snapappointments.com/bootstrap-select/examples/
        // The firstChild is the actual html select tag
        if (a.querySelector(".toppings") !== null) {
          toppings = a.querySelector(".toppings").firstChild.selectedOptions;
          toppings = getListOfSelectedData(toppings);
        } else if (a.querySelector(".extrasubs")) {
          extrasubs = a.querySelector(".extrasubs").firstChild.selectedOptions;
          extrasubs = getListOfSelectedData(extrasubs);
        }
        // check if user add topping/extrasub in an item required those
        if (list_item_toppings.includes(item_name)) {
          if (toppings.length == 0) {
            alert("Please add more topping(s)!");
            return;
          }
        }

        // get price
        if (a.querySelector(".price-select") != null) {
          price = a.querySelector(".price-select").firstChild.selectedOptions[0].value;
        } else {
          price = a.querySelector(".price-single").getAttribute("data-singlePrice");
        }
        //assume each extraSub has a price of 0.50 for any size (improve later)
        console.log(extrasubs.length);
        price = parseFloat(price) + 0.50 * extrasubs.length;

        // create object to save the item information
        var item_info = {
          "category": category,
          "item_name": item_name,
          "toppings": toppings,
          "extrasubs": extrasubs,
          "price": price
        };

        // add item into cart
        if (localStorage.getItem("shoppingCart") == null) {
          localStorage.setItem("shoppingCart", JSON.stringify({
            "items": [item_info],
            "total_price": price
          }));
        } else {
          var cart = JSON.parse(localStorage.getItem("shoppingCart"));
          cart["items"].push(item_info);
          cart["total_price"] += price;
          localStorage.setItem("shoppingCart", JSON.stringify(cart));
        }

        // add item information into the cart's view
      };
    });

    if (document.getElementById("message") != null) {
      const message = document.getElementById("message").innerHTML;
      if (message === "Thank you very much for your purchase!") {
        localStorage.removeItem("shoppingCart");
      }
    }
});

function getListOfSelectedData(selected) {
  var listItems = [];
  for (var i = 0; i < selected.length; i++) {
    listItems.push(selected[i].value);
  }
  return listItems;
};
