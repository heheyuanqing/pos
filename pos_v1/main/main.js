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

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}


function findItem(tag, allItem) {
  var flag = -1;

  for (var i = 0; i < allItem.length; i++) {
    if (tag.substring(0, 10) == allItem[i].barcode) {
      flag = i;
      break;
    }
  }

  return flag;
}

function getCartItem(tags) {
  var cartItem = [];
  var allItem = loadAllItems();

  for (var i = 0; i < tags.length; i++) {
    var t = findItem(tags[i], allItem)
    if (tags[i].length == 10) {
      cartItem.push({former: allItem[t], tag: 1});

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
    if (itemCount[i].item.former.barcode == cartitem.former.barcode) {
      flag = i;
      break;
    }
  }

  return flag;
}

function getCount(item, cartItem) {
  var count = 0;

  for (var i = 0; i < cartItem.length; i++) {
    if (item.barcode == cartItem[i].former.barcode) {
      count += cartItem[i].tag;
    }
  }

  return count;
}

function getCartItemCount(cartItem) {
  var itemCount = [];

  itemCount.push({item: cartItem[0], count: 0});
  for (var i = 0; i < cartItem.length; i++) {
    var t = isExist(itemCount, cartItem[i]);
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
  var promotion = loadPromotions();

  for (var i = 0; i < itemCount.length; i++) {
    var flag = 0;
    for (var j = 0; j < promotion[0].barcodes.length; j++) {
      if (itemCount[i].item.former.barcode == promotion[0].barcodes[j] && itemCount[i].count >= 3) {

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
  var total = {receipt: subtotal, total: 0, totalDiscount: 0};

  for (var i = 0; i < subtotal.length; i++) {
    total.total += subtotal[i].subtotal;
    total.totalDiscount += subtotal[i].favorable.discount;
  }

  return total;
}

function callFunction(tags) {
  var cartItem = getCartItem(tags);
  var itemCount = getCartItemCount(cartItem);
  var discount = getCartItemDiscount(itemCount);
  var subtotal = getCartItemSubtotal(discount);
  var total = getCartItemTotal(subtotal);

  return total;
}

function printReceipt(tags) {
  var receiptText;
  var total = callFunction(tags);

  receiptText = "***<" + "没钱赚商店>收据***\n";
  for (var i = 0; i < total.receipt.length; i++) {
    receiptText += "名称：" + total.receipt[i].favorable.cart.item.former.name + "，数量：" + total.receipt[i].favorable.cart.count + total.receipt[i].favorable.cart.item.former.unit + "，单价：" + total.receipt[i].favorable.cart.item.former.price.toFixed(2) + "(元)，小计：" + total.receipt[i].subtotal.toFixed(2) + "(元)\n"
  }
  receiptText += "----------------------\n" + "总计：" + total.total.toFixed(2) + "(元)\n" + "节省：" + total.totalDiscount.toFixed(2) + "(元)\n" + "**********************";

  console.log(receiptText);
}
