$(document).ready(function() {
  $("form#pizzaMenu").submit(function(event) {
    var size, crust, toppings, count;
    size = $("#pizzaSize :selected");
    crust = $("#pizzaCrust :selected");
    toppings = $("#pizzaToppings :checked");

    count = parseInt($("#pizzaCount").val());

    var pizzaOrder = new PizzaOrder(size, crust, toppings, count);
    addToCart(pizzaOrder);

    event.preventDefault();
  });
  // Display checkout button on order placement
  $("#checkoutBtn").click(function() {
    var delivery = $("#delivery :checked").val();
    var location = $("#deliveryLocation").val()
    var allCharge = parseInt($("#tt-charge").html());

    if (delivery === "deliver") {
      alert(`Thanks for shopping with Downtown Pizza.
      Your total charge is ${allCharge + 300}/=
      Your delivery is en-route to ${location}`);
    // } else {
    //   alert(`Thanks for shopping with Downtown Pizza.
    //   Your total charge is ${allCharge}`);
    }
  });

  // Display delivery location form field
  $("#pick-up").click(function() {
    $("#deliveryLocation").hide();
  });
  $("#deliver").click(function() {
    $("#deliveryLocation").show();
  });
});

// Pizza Constructor
function PizzaOrder(pizzaSize, pizzaCrust, pizzaToppings, pizzaCount) {
  this.size = pizzaSize;
  this.crust = pizzaCrust;
  this.toppings = pizzaToppings; //toppings array
  this.count = pizzaCount;
}

PizzaOrder.prototype.getPrice = function() {
  var sizePrice, crustPrice, toppingsPrice;
  sizePrice = parseInt(this.size.val());
  crustPrice = parseInt(this.crust.val());

  toppingsPrice = this.toppings.map(function() {
    return parseInt($(this).val());
  });
  var toppingsTotalPrice = 0;
  for (var i = 0; i < toppingsPrice.length; i++) {
    toppingsTotalPrice += toppingsPrice[i];
  }

  var orderPrice = (sizePrice + crustPrice + toppingsTotalPrice) * this.count;
  return orderPrice;
};
// Add pizza to cart
function addToCart(order) {
  var toppings = order.toppings
    .map(function() {
      return this.id;
    })
    .get()
    .join();
  $("#pizzaCart tbody").append(`<tr>
                                  <td>${order.size.html()}</td>
                                  <td>${order.crust.html()}</td>
                                  <td>${toppings}</td>
                                  <td>${order.getPrice()}</td>
                                </tr>`);

  var currentTotalCharge = parseInt($("#tt-charge").html());
  $("#tt-charge").html(currentTotalCharge + order.getPrice());
  $("#checkoutBtn").show();
  $("#delivery").show();
}
