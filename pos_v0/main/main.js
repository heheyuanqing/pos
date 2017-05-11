'use strict';

function getCartItemSubtotal(inputs) {
  var itemSubtotal = [];

  for (var i = 0;i<inputs.length;i++){
    itemSubtotal[i] = {item:inputs[i],subTotal : inputs[i].count * inputs[i].price};
  }

  return itemSubtotal;
}

function getCartItemTotal(itemSubtotal) {
   var total = {receipt:itemSubtotal,total:0};

  for (var i = 0;i<itemSubtotal.length;i++){
   total.total += itemSubtotal[i].subTotal;
  }

  return total;
}

function printReceipt(inputs) {
  var expectText;
  var itemSubtotal,total;

  itemSubtotal = getCartItemSubtotal(inputs);
  total = getCartItemTotal(itemSubtotal);

  expectText = "***<"+"没钱赚商店"+">收据"+"***\n";
  for(var i=0;i<total.receipt.length;i++){
    expectText += "名称："+total.receipt[i].item.name+"，数量："+total.receipt[i].item.count+total.receipt[i].item.unit+"，单价："+total.receipt[i].item.price.toFixed(2)+"(元)，小计："+total.receipt[i].subTotal.toFixed(2)+"(元)"+"\n";
  }
  expectText += "----------------------"+"\n"+"总计："+total.total.toFixed(2)+"(元)"+"\n"+"**********************";

  console.log(expectText);
}
