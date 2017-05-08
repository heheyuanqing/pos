'use strict';
function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}


function isExist(allItem, input) {
  var flag = -1;

  for (var j = 0; j < allItem.length; j++) {
    if (allItem[j].barcode == input) {
      flag = j;
      break;
    }
  }
  if (flag >= 0) {
    return flag;
  }
  else return -1;
}

function checkExist(itemCount, input) {
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

function getCartItem(inputs) {
  var cartItem = [];
  var allItem = loadAllItems();

  for (var i = 0; i < inputs.length; i++) {
    var t = isExist(allItem, inputs[i]);
    if (t >= 0) {
      cartItem.push(allItem[t]);
    }
    else {
      alert("There is Error!");
    }
  }

  return cartItem;
}

function getCartItemCount(cartItem) {
  var itemCount = [];

  itemCount.push({item: cartItem[0], count: 1});
  for (var i = 1; i < cartItem.length; i++) {
    var t = checkExist(itemCount, cartItem[i])
    if (t >= 0) {
      itemCount[t].count += 1;
    }
    else {
      itemCount = builtObjiect(itemCount, cartItem[i]);
    }
  }

  return itemCount;
}

function getCartItemSubtotal(itemCount) {
  var subtotal = [];

  for (var i = 0; i < itemCount.length; i++) {
    subtotal[i] = {};
    subtotal[i].cart = itemCount[i];
    subtotal[i].subtotal = itemCount[i].item.price * itemCount[i].count;
  }

  return subtotal;
}

function getCartItemTotal(subtotal) {
  var total = {receipt: subtotal, total: 0};

  for (var i = 0; i < subtotal.length; i++) {
    total.total += subtotal[i].subtotal;
  }
  return total;
}

function callFunction(inputs) {
  var cartItem = getCartItem(inputs);
  var itemCount = getCartItemCount(cartItem);
  var subtotal = getCartItemSubtotal(itemCount);
  var total = getCartItemTotal(subtotal);
}

function printReceipt(inputs) {
  var receiptText;
  var total = callFunction(inputs);

  receiptText = "***<" + "没钱赚商店" + ">收据" + "***\n";
  for (var i = 0; i < total.receipt.length; i++) {
    receiptText += "名称：" + total.receipt[i].cart.item.name + "，数量：" + total.receipt[i].cart.count + total.receipt[i].cart.item.unit + "，单价：" + total.receipt[i].cart.item.price.toFixed(2) + "(元)，小计：" + total.receipt[i].subtotal.toFixed(2) + "(元)" + "\n";
  }
  receiptText += "----------------------" + "\n" + "总计：" + total.total.toFixed(2) + "(元)" + "\n" + "**********************";

  console.log(receiptText);
}
