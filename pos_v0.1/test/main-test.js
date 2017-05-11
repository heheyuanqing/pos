'use strict';

describe('pos', () => {


  it('should print text', () => {

    const inputs = [
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00

      },
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
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
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
      }
    ];

    spyOn(console, 'log');

    printReceipt(inputs);

    const expectText = `***<没钱赚商店>收据***
名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：15.00(元)
名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)
名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)
----------------------
总计：23.00(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});


describe('mytest - posv_0.1', function () {
  var inputs;
  var count;
  var subtotal;
  beforeEach(function () {
    inputs = [
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00

      },
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
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
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
      }
    ];

     count = [
      {
        item: {
          barcode: 'ITEM000000',
          name: '可口可乐',
          unit: '瓶',
          price: 3.00

        },
        count: 5
      },
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000004',
          name: '电池',
          unit: '个',
          price: 2.00
        },
        count: 1
      }];

     subtotal = [
      {
        cart: {
          item: {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00

          },
          count: 5
        },
        subtotal: 15
      },
      {
        cart: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 2
        },
        subtotal: 6
      },
      {
        cart: {
          item: {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
          },
          count: 1
        },
        subtotal: 2
      }];
  });



  it('get a cart Item count', function () {
    var result = [
      {
        item: {
          barcode: 'ITEM000000',
          name: '可口可乐',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000004',
          name: '电池',
          unit: '个',
          price: 2.00
        },
        count: 1
      }
    ];

    var cartItemCount = getCartItemCount(inputs);
    expect(cartItemCount).toEqual(result);
  });

  it('get item subtotal', function () {
    var itemSubtotal = [
      {
        cart: {
          item: {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        subtotal: 15
      },
      {
        cart: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 2
        },
        subtotal: 6
      },

      {
        cart: {
          item: {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
          },
          count: 1
        },
        subtotal: 2
      }
    ];

    var cartItemSutotal = getCartItemSubtotal(count);
    expect(cartItemSutotal).toEqual(itemSubtotal);
  });

  it('get a item total',function () {
    var itemTotal =
      {
        receipt:[
          {
            cart: {
              item: {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
              },
              count: 5
            },
            subtotal: 15
          },
          {
            cart: {
              item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
              },
              count: 2
            },
            subtotal: 6
          },

          {
            cart: {
              item: {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00
              },
              count: 1
            },
            subtotal: 2
          }
        ],
        total:23
      };
    var cartItemTotal = getCartItemtotal(subtotal);
    expect(cartItemTotal).toEqual(itemTotal);
  });

  it('should print a text', function () {
    spyOn(console, 'log');
    printReceipt(inputs);

    var expectText = `***<没钱赚商店>收据***
名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：15.00(元)
名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)
名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)
----------------------
总计：23.00(元)
**********************`;
    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
