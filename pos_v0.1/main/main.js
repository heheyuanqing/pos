'use strict';

function isExist(itemCount, input) {
  var flag = -1;

  for (var j = 0; j < itemCount.length; j++) {
    if (itemCount[j].item.name == input.name) {
      flag = j;
      break;
    }
  }
  if (flag >= 0) {
    return flag;
  }
  else return -1;
}

function builtObjiect(itemCount, input) {
  itemCount.push({item: input, count: 1});
  return itemCount;
}

function getCartItemCount(inputs) {
  var itemCount = [];

  itemCount.push({item: inputs[0], count: 1});

  for (var i = 1; i < inputs.length; i++) {
    var t = isExist(itemCount, inputs[i]);
    if (t >= 0) {
      itemCount[t].count++;
    }
    else {
      itemCount = builtObjiect(itemCount, inputs[i]);
    }
  }

  return itemCount;
}
function getCartItemSubtotal(itemCount) {
  var subtotal = [];

  for (var i = 0; i < itemCount.length; i++) {
    subtotal[i] = {cart: itemCount[i], subtotal: itemCount[i].item.price * itemCount[i].count};
  }

  return subtotal;
}

function getCartItemtotal(subtotal) {
  var total = {receipt: subtotal, total: 0};

  for (var i = 0; i < subtotal.length; i++) {
    total.total += subtotal[i].subtotal;
  }

  return total;
}

function callFunction(inputs) {
  var itemCount = getCartItemCount(inputs);
  var subtotal = getCartItemSubtotal(itemCount);
  var total = getCartItemtotal(subtotal);
  return total;
}

function printReceipt(inputs) {
  var expectText;
  var total= callFunction(inputs);

  expectText = "***<" + "没钱赚商店" + ">收据" + "***\n";
  for (var i = 0; i < total.receipt.length; i++) {
    expectText += "名称：" + total.receipt[i].cart.item.name + "，数量：" + total.receipt[i].cart.count + total.receipt[i].cart.item.unit + "，单价：" + total.receipt[i].cart.item.price.toFixed(2) + "(元)，小计：" + total.receipt[i].subtotal.toFixed(2) + "(元)" + "\n";
  }
  expectText += "----------------------" + "\n" + "总计：" + total.total.toFixed(2) + "(元)" + "\n" + "**********************";

  console.log(expectText);
}
