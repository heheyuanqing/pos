'use strict';

function findItem(tag, allItem) {
  var flag = -1;

  for (var i = 0; i < allItem.length; i++) {
    if (tag.substring(0, 10) === allItem[i].barcode) {
      flag = i;
      break;
    }
  }

  return flag;
}

function getCartItem(tags) {
  var cartItem = [];
  var allItem;

  allItem = Item.all();
  for (var i = 0; i < tags.length; i++) {
    var t = findItem(tags[i], allItem)
    if (tags[i].length === 10) {
      cartItem.push({former: allItem[t], tag: 1.00});
    }
    else {
      var tag = parseFloat(tags[i].substring(11));
      cartItem.push({former: allItem[t], tag: tag});
    }
  }

  return cartItem;
}


function isExist(itemCount, cartitem) {
  var flag = -1;

  for (var i = 0; i < itemCount.length; i++) {
    if (itemCount[i].item.former.barcode === cartitem.former.barcode) {
      flag = i;
      break;
    }
  }

  return flag;
}

function getCount(item, cartItem) {
  var count = 0;

  for (var i = 0; i < cartItem.length; i++) {
    if (item.barcode === cartItem[i].former.barcode) {
      count += cartItem[i].tag;
    }
  }

  return count;
}

function getCartItemCount(cartItem) {
  var itemCount = [];
  var t;

  itemCount.push({item: cartItem[0], count: 0});
  for (var i = 0; i < cartItem.length; i++) {
    t = isExist(itemCount, cartItem[i]);
    if (t >= 0) {
      itemCount[t].count = getCount(itemCount[t].item.former, cartItem);
    }
    else {
      itemCount.push({item: cartItem[i], count: 0});
      i--;
    }
  }

  return itemCount;
}

function getCartItemDiscount(itemCount) {
  var discount = [];
  var promotion = Promotion.all();

  for (var i = 0; i < itemCount.length; i++) {
    var flag = 0;
    for (var j = 0; j < promotion[0].barcodes.length; j++) {
      if (itemCount[i].item.former.barcode === promotion[0].barcodes[j] && itemCount[i].count >= 3) {

        var lagnappe = parseInt(itemCount[i].count / 3);
        discount.push({cart: itemCount[i], discount: lagnappe * itemCount[i].item.former.price});
        flag = 1;
      }
    }
    if (flag == 0) {
      discount.push({cart: itemCount[i], discount: 0});
    }
  }

  return discount;
}

function getCartItemSubtotal(discount) {
  var subtotal = [];

  for (var i = 0; i < discount.length; i++) {
    subtotal.push({
      favorable: discount[i],
      subtotal: discount[i].cart.item.former.price * discount[i].cart.count - discount[i].discount
    });
  }

  return subtotal;
}

function getCartItemTotal(subtotal) {
  var total = {};

  total = {receipt: subtotal, total: 0, totalDiscount: 0};
  for (var i = 0; i < subtotal.length; i++) {
    total.total += subtotal[i].subtotal;
    total.totalDiscount += subtotal[i].favorable.discount;
  }

  return total;
}

function getDigitToString(num) {
  return num < 10 ? '0' + num : num;
}

function getTime(total) {
  var time = {};
  var now = new Date();

  time.all = total;
  time.time = {
    year: now.getFullYear(),
    month: getDigitToString(now.getMonth() + 1),
    day: getDigitToString(now.getDate()),
    hour: getDigitToString(now.getHours()),
    minute: getDigitToString(now.getMinutes()),
    second: getDigitToString(now.getSeconds())
  }

  return time;
}

function callFunction(tags) {
  var cartItem = getCartItem(tags);
  var itemCount = getCartItemCount(cartItem);
  var discount = getCartItemDiscount(itemCount);
  var subtotal = getCartItemSubtotal(discount);
  var total = getCartItemTotal(subtotal);
  var time = getTime(total);

  return time;
}

function printReceipt(tags) {
  var receiptText;
  var time = callFunction(tags);

  receiptText = "***<" + "没钱赚商店>收据***\n" + "打印时间：" + time.time.year + "年" + time.time.month + "月" + time.time.day + "日" + " " + time.time.hour + ":" + time.time.minute + ":" + time.time.second + "\n" + "----------------------\n";
  for (var i = 0; i < time.all.receipt.length; i++) {
    receiptText += "名称：" + time.all.receipt[i].favorable.cart.item.former.name + "，数量：" + time.all.receipt[i].favorable.cart.count + time.all.receipt[i].favorable.cart.item.former.unit + "，单价：" + time.all.receipt[i].favorable.cart.item.former.price.toFixed(2) + "(元)，小计：" + time.all.receipt[i].subtotal.toFixed(2) + "(元)\n"
  }
  receiptText += "----------------------\n" + "总计：" + time.all.total.toFixed(2) + "(元)\n" + "节省：" + time.all.totalDiscount.toFixed(2) + "(元)\n" + "**********************";

  console.log(receiptText);
}
