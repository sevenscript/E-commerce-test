//En esta variable se almacena el/los objeto/s contenido/s en la constante CART_INFO_URL

var articles = {};

$(document).ready(inicio);

function inicio() {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      articles = resultObj.data;

      showCart(articles, "USD");
    }
  });

  $("#buyBtn").click(buyCart);
  $("#currencyUSD").click(currencyUSD);
  $("#currencyUYU").click(currencyUYU);
  $("#savePayment").click(savePayment);
  $("#bankInput").click(bankPayment);
  $("#creditCardInput").click(creditCardPayment);
  $("#addCardBtn").click(addCards);
  $("#addBankBtn").click(addBank);
  $("#closeModal").click(closeModal);
  $("#savePayment").click(savePayment);
  yearSelect();
  $("#radioForm input").on("change", shippingType);
}

function buyCart() {
  $("#country").removeClass("not-good");
  $("#address").removeClass("not-good");
  $("#countryHelp").empty();
  $("#addressHelp").empty();
  $("#payHelp").empty();
  $("#countHelp").empty();

  let country = $("#country").val();
  let address = $("#address").val();
  let pay = $("#paySpan").text();
  let count = $("#totalPrice").text();

  if (country != "" && address != "" && pay != "" && count != "0") {
    $("#country").removeClass("not-good");
    $("#address").removeClass("not-good");

    $("#country").val("");
    $("#address").val("");
    $("#cartPayment").html("");
    $("#cartDiv").html("");
    $("#shippingCurrency").html("");
    $("#cartTotal").html("");
    $("#cartCount").html("sin productos");
    $("#cartCost").html("");
    $("#totalPrice").html("");
    $("#cartCurrency").html("");
    $("#shippingCost").html("");
    $("#currencyUSD").attr("disabled", "disabled");
    $("#currencyUYU").attr("disabled", "disabled");
    $("#standardShipping").attr("disabled", "disabled");
    $("#expressShipping").attr("disabled", "disabled");
    $("#premiumShipping").attr("disabled", "disabled");

    alert("Tu compra ha sido realizada con exito!");
  }
  if (country == "") {
    $("#countryHelp").text("Debes indicar el país");
    $("#country").addClass("not-good");
  }
  if (address == "") {
    $("#addressHelp").text("Debes indicar el domicilio");
    $("#address").addClass("not-good");
  }
  if (pay == "") {
    $("#payHelp").text("Debes seleccionar un método de pago");
    $("#paymentSelect").addClass("message");
  }
  if (count == "0") {
    $("#countHelp").text("Tu carrito se encuentra vacío");
  }
}

function showCart(object, bill) {
  let content = object.articles;
  let htmlContentToAppend = "";
  let productsCount = 0;
  let defaulCurrency = bill;
  let currency = "USD";
  let subTotal = 0;

  for (let i = 0; i < content.length; i++) {
    let unitCurrency = content[i].currency;
    let unitCount = content[i].count;
    let unitCost = content[i].unitCost;
    currency = defaulCurrency;

    if (defaulCurrency == "USD") {
      if (unitCurrency == defaulCurrency) {
        unitCost = unitCost;
        unitCurrency = unitCurrency;
      } else if (unitCost != defaulCurrency) {
        unitCost = unitCost / 40;
        unitCurrency = defaulCurrency;
      }
    } else if (defaulCurrency == "UYU") {
      if (unitCurrency == defaulCurrency) {
        unitCost = unitCost;
        unitCurrency = unitCurrency;
      } else if (unitCurrency != defaulCurrency) {
        unitCost = unitCost * 40;
        unitCurrency = defaulCurrency;
      }
    }
    let totalUnitCost = unitCost * unitCount;

    htmlContentToAppend =
      `<div class="row mt-3 mb-3">
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-5 color-white" >
                        <div class="media"><span style="position:absolute;top: px;left:10px"><button id="eraseBtn` +
      i +
      `" class"btn btn-info pull-right" type"button"><img style="width: 22px;height: 22px;"src="https://www.clipartmax.com/png/full/186-1867388_recycle-bin-icon-trash-bin-icon-png.png"></button></span>
                            <img src="` +
      content[i].src +
      `" class="img-thumbnail mt-2 mb-2" style="width: 120px;height: 120px;" alt="...">
                        </div>
                    </div>    
                    <div class="col-lg-7 color-white">
                        <div class="media-body"> 
                            <h5 class="mt-2">` +
      content[i].name +
      `</h5>  
                        </div>
                    </div>
                </div>
            </div>   
            <div class="col-lg-2 color-white">
                <h6 class="mt-2">` +
      unitCurrency +
      " " +
      `<span id="cost` +
      i +
      `">` +
      unitCost +
      `</span></h6>
            </div>
            <div class="col-lg-2 color-white">
                <span><h6 id="count` +
      i +
      `" class="mt-2">` +
      content[i].count +
      `</h6></span>
                <span><input id="btnDecrease` +
      i +
      `" class="btn btn-primary pull-left" value="-" style="font-size:20px" type="button"> 
                <input id="btnIncrease` +
      i +
      `" class="btn btn-info pull-right" value="+" style="font-size:20px" type="button"></span>
            </div>
            <div class="col-lg-2 color-white">
                <h6 class="mt-2">` +
      unitCurrency +
      " " +
      `<span id="totalCost` +
      i +
      `">` +
      unitCost * content[i].count +
      `</span></h6>
            </div>
        </div>`;
    $("#cartDiv").append(htmlContentToAppend);
    $("#shippingCurrency").html(currency);
    $("#cartTotal").html(currency);
    let val = parseInt(content[i].count);

    $("#btnDecrease" + i).on("click", function () {
      $("#btnIncrease" + i).removeAttr("disabled");
      if (val == 1) {
        $("#btnDecrease" + i).attr("disabled", true);
      }
      val = val - 1;

      productsCount = productsCount - 1;
      totalUnitCost = totalUnitCost - unitCost;
      $("#totalCost" + i).html(totalUnitCost);
      $("#count" + i).html(val);
      $("#cartCost").html(function () {
        if (subTotal - unitCost <= 0) {
          subTotal = 0;
          return subTotal;
        } else {
          subTotal = subTotal - unitCost;
          return subTotal;
        }
      });
      $("#cartCount").html(function () {
        if (productsCount == 1) {
          return "1 producto";
        } else if (productsCount > 1) {
          return productsCount + " productos";
        } else {
          return "sin productos";
        }
      });
      shippingType();
      totalBuy();
    });
    $("#btnIncrease" + i).on("click", function () {
      if (val == 99) {
        $("#btnIncrease" + i).attr("disabled", true);
      }
      $("#btnDecrease" + i).removeAttr("disabled");

      val = val + 1;

      productsCount = productsCount + 1;
      subTotal = subTotal + unitCost;
      totalUnitCost = totalUnitCost + unitCost;
      $("#totalCost" + i).html(totalUnitCost);
      $("#count" + i).html(val);
      $("#cartCost").html(subTotal);
      $("#cartCount").html(function () {
        if (productsCount == 1) {
          return "1 producto";
        } else if (productsCount > 1) {
          return productsCount + " productos";
        } else {
          return "sin productos";
        }
      });
      shippingType();
      totalBuy();
      $("#countHelp").text("");
    });

    subTotal =
      parseInt(unitCost * parseInt(content[i].count)) + parseInt(subTotal);

    productsCount += parseInt(content[i].count);

    currency = unitCurrency;
  }

  $("#cartCurrency").html(currency);
  $("#cartCost").html(function () {
    if (subTotal <= 0) {
      cost = 0;
      return subTotal.toFixed(2);
    } else {
      return subTotal.toFixed(2);
    }
  });
  $("#cartCount").html(function () {
    if (productsCount == 1) {
      return "1 producto";
    } else if (productsCount > 1) {
      return productsCount + " productos";
    } else {
      return "sin productos";
    }
  });
  shippingType();
  totalBuy();

  //$("#eraseBtn" + i).on("click", function(){

  //})
}

function currencyUSD() {
  $("#cartDiv").empty();
  showCart(articles, "USD");
}
function currencyUYU() {
  $("#cartDiv").empty();
  showCart(articles, "UYU");
}
function savePayment() {
  htmlContentToAppend = $("#creditCardConfirm").html();
  htmlContentToAppend2 = $("#bankConfirm").html();
  if (htmlContentToAppend != "" && htmlContentToAppend2 == "") {
    $("#paymentModal").modal("hide");
    $("#paymentSelect").html("Cambiar metodo");
    $("#cartPayment").html(
      `<a id="paymentSelect" data-toggle="modal" data-target="#paymentModal" href=""><span id="paySpan">` +
        htmlContentToAppend +
        `</span></a>`
    );
    $("#payHelp").empty();
    closeModal();
  } else if (htmlContentToAppend2 != "" && htmlContentToAppend == "") {
    $("#paymentModal").modal("hide");
    $("#paymentSelect").html("Cambiar metodo");
    $("#cartPayment").html(
      `<a id="paymentSelect" data-toggle="modal" data-target="#paymentModal" href=""><span id="paySpan">` +
        htmlContentToAppend2 +
        `</span></a>`
    );
    $("#payHelp").empty();
    closeModal();
  }
}
function bankPayment() {
  $("#bankPay").removeClass("d-none");
  $("#creditCardPay").addClass("d-none");
}
function creditCardPayment() {
  $("#creditCardPay").removeClass("d-none");
  $("#bankPay").addClass("d-none");
}
function addCards() {
  refreshModal();
  let name = $("#nameCardInput").val();
  let cardNumber = $("#numberCardInput").val();
  let cvv = $("#cvvInput").val();
  let date = "";
  let message = `<p class="message">No pueden quedar campos vacios</p>`;
  let htmlContentToAppend = `<img src="https://m.media-amazon.com/images/G/01/payments-portal/r1/issuer-images/visa._CB485933786_.png"> 4957-4963-0058-8905`;
  if (name == "") {
    $("#creditCardConfirm").html(message);
    $("#nameCardInput").addClass("not-good");
  }
  if (cardNumber == "") {
    $("#creditCardConfirm").html(message);
    $("#numberCardInput").addClass("not-good");
  }
  if (cvv == "") {
    $("#creditCardConfirm").html(message);
    $("#cvvInput").addClass("not-good");
  }

  if (cardNumber != "" && name != "" && cvv != "") {
    $("#creditCardConfirm").html(htmlContentToAppend);
    $("#bankConfirm").html("");
  }
}

//Esta función 

function addBank() {
  refreshModal();
  let identity = $("#identityInput").val();
  let origin = $("#originAccount").val();
  let destiny = $("#destinyAccount").val();
  let message = `<p class="message">No pueden quedar campos vacios</p>`;
  let htmlContentToAppend = `0007-3242-0233-2335`;
  if (identity == "") {
    $("#bankConfirm").html(message);
    $("#identityInput").addClass("not-good");
  }
  if (origin == "") {
    $("#bankConfirm").html(message);
    $("#originAccount").addClass("not-good");
  }
  if (destiny == "") {
    $("#bankConfirm").html(message);
    $("#destinyAccount").addClass("not-good");
  }

  if (identity != "" && origin != "" && destiny != "") {
    $("#bankConfirm").html(htmlContentToAppend);
    $("#creditCardConfirm").html("");
  }
}

//Esta función se encarga de completar una lista desplegable con valores desde el 2021 al 2050

function yearSelect() {
  for (let i = 2021; i < 2050; i++) {
    $("#yearSelect").append(
      `
            <option value="` +
        i +
        `">` +
        i +
        `</option>`
    );
  }
}

//Esta función se encarga de quitar las clases "not-good" agregadas anteriormente a los inputs del modal 

function refreshModal() {
  $("#nameCardInput").removeClass("not-good");
  $("#identityInput").removeClass("not-good");
  $("#numberCardInput").removeClass("not-good");
  $("#originAccount").removeClass("not-good");
  $("#cvvInput").removeClass("not-good");
  $("#destinyAccount").removeClass("not-good");
}

//Esta función se encarga de dejar el modal con los valores por defecto cuando es cerrado

function closeModal() {
  $("#creditCardConfirm").html("");
  $("#nameCardInput").removeClass("not-good");
  $("#nameCardInput").val("");
  $("#numberCardInput").removeClass("not-good");
  $("#numberCardInput").val("");
  $("#cvvInput").removeClass("not-good");
  $("#cvvInput").val("");
  $("#bankConfirm").html("");
  $("#identityInput").removeClass("not-good");
  $("#identityInput").val("");
  $("#originAccount").removeClass("not-good");
  $("#originAccount").val("");
  $("#destinyAccount").removeClass("not-good");
  $("#destinyAccount").val("");
}

//Esta función se encarga de realizar cambios cuando los distintos check del metodo de envío son seleccionados
//Los cambios se ven reflejados en los distintos totales

function shippingType() {
  let radioSelected = $("input[name=shippingType]:checked", "#radioForm").val();
  if (radioSelected == "standard") {
    let val = parseInt($("#cartCost").text());
    let result = val * 0.05;
    $("#shippingCost").html(result.toFixed(2));
    totalBuy();
  } else if (radioSelected == "express") {
    let val = parseInt($("#cartCost").text());
    let result = val * 0.07;
    $("#shippingCost").html(result.toFixed(2));
    totalBuy();
  } else if (radioSelected == "premium") {
    let val = parseInt($("#cartCost").text());
    let result = val * 0.15;
    $("#shippingCost").html(result.toFixed(2));
    totalBuy();
  }
}

//Esta funcion calcula el monto total de la compra y redondea el resultado

function totalBuy() {
  let valSubtotal = parseInt($("#cartCost").text());
  let valShipping = parseInt($("#shippingCost").text());
  let result = valShipping + valSubtotal;
  $("#totalPrice").html(result.toFixed(2));
}
