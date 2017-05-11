'use strict';

describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
describe('my pos test', function () {
  var tags;
  var item;
  var count;
  var discount;
  var subtotal;
  beforeEach(function () {
    tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    item = [
      {
        former: {
          barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3
        },
        tag: 1
      },
      {
        former: {
          barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3
        },
        tag: 1
      },
      {
        former: {
          barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3
        },
        tag: 1
      },
      {
        former: {
          barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3
        },
        tag: 1
      },
      {
        former: {
          barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3
        },
        tag: 1
      },
      {
        former: {
          barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15
        },
        tag: 2.5
      },
      {
        former: {

          barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5
        },
        tag: 1
      },
      {
        former: {
          barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5
        },
        tag: 2
      }]
    count = [
      {
        item: {
          former: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          tag: 1
        },
        count: 5
      },

      {
        item: {
          former: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          tag: 2.5
        },
        count: 2.5
      },
      {
        item: {
          former: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          tag: 1
        },
        count: 3
      }];
    discount = [
      {
        cart: {
          item: {
            former: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            tag: 1
          },
          count: 5
        },
        discount: 3
      },

      {
        cart: {
          item: {
            former: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            tag: 2.5
          },
          count: 2.5
        },
        discount: 0
      },
      {
        cart: {
          item: {
            former: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            tag: 1
          },
          count: 3
        },
        discount: 4.5
      }];
    subtotal = [
      {
        favorable: {
          cart: {
            item: {
              former: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
              },
              tag: 1
            },
            count: 5
          }, discount: 3
        }, subtotal: 12
      },
      {
        favorable: {
          cart: {
            item: {
              former: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
              },
              tag: 2.5
            },
            count: 2.5
          }, discount: 0
        }, subtotal: 37.5
      },
      {
        favorable: {
          cart: {
            item: {
              former: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
              },
              tag: 1
            },
            count: 3
          }, discount: 4.5
        }, subtotal: 9
      }];
  });

  it('get cart item', function () {
    var cartItem = [{
      former: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3},
      tag: 1
    },
      {
        former: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3},
        tag: 1
      },
      {
        former: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3},
        tag: 1
      },
      {
        former: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3},
        tag: 1
      },
      {
        former: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3},
        tag: 1
      },
      {
        former: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15},
        tag: 2.5
      },
      {
        former: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5},
        tag: 1
      },
      {
        former: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5},
        tag: 2
      }]

    var cartitem = getCartItem(tags);
    expect(cartitem).toEqual(cartItem);
  });

  it('get cart item count', function () {
    var cartCount = [
      {
        item: {
          former: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          tag: 1
        },
        count: 5
      },

      {
        item: {
          former: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          tag: 2.5
        },
        count: 2.5
      },
      {
        item: {
          former: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          tag: 1
        },
        count: 3
      }];

    var cartcount = getCartItemCount(item);
    expect(cartcount).toEqual(cartCount);
  });

  it('get item discount', function () {
    var itemDiscount = [
      {
        cart: {
          item: {
            former: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            tag: 1
          },
          count: 5
        },
        discount: 3
      },

      {
        cart: {
          item: {
            former: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            tag: 2.5
          },
          count: 2.5
        },
        discount: 0
      },
      {
        cart: {
          item: {
            former: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            tag: 1
          },
          count: 3
        },
        discount: 4.5
      }];
    var itemdiscount = getCartItemDiscount(count);
    expect(itemdiscount).toEqual(itemDiscount);
  });

  it('get item subtotal', function () {
    var itemSubtotal = [
      {
        favorable: {
          cart: {
            item: {
              former: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
              },
              tag: 1
            },
            count: 5
          }, discount: 3
        }, subtotal: 12
      },
      {
        favorable: {
          cart: {
            item: {
              former: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
              },
              tag: 2.5
            },
            count: 2.5
          }, discount: 0
        }, subtotal: 37.5
      },
      {
        favorable: {
          cart: {
            item: {
              former: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
              },
              tag: 1
            },
            count: 3
          }, discount: 4.5
        }, subtotal: 9
      }];
    var itemsubtotal = getCartItemSubtotal(discount);
    expect(itemsubtotal).toEqual(itemSubtotal);
  });

  it('get item total', function () {
    var itemTotal = {
      receipt: [
        {
          favorable: {
            cart: {
              item: {
                former: {
                  barcode: 'ITEM000001',
                  name: '雪碧',
                  unit: '瓶',
                  price: 3.00
                },
                tag: 1
              },
              count: 5
            },
            discount: 3
          },
          subtotal: 12
        },
        {
          favorable: {
            cart: {
              item: {
                former: {
                  barcode: 'ITEM000003',
                  name: '荔枝',
                  unit: '斤',
                  price: 15.00
                },
                tag: 2.5
              },
              count: 2.5
            },
            discount: 0
          },
          subtotal: 37.5
        },
        {
          favorable: {
            cart: {
              item: {
                former: {
                  barcode: 'ITEM000005',
                  name: '方便面',
                  unit: '袋',
                  price: 4.50
                },
                tag: 1
              },
              count: 3
            },
            discount: 4.5
          },
          subtotal: 9
        }],
      total: 58.5,
      totalDiscount: 7.5
    };
    var itemtotal = getCartItemTotal(subtotal);
    expect(itemtotal).toEqual(itemTotal);
  });

  it('should print a text', function () {
    var text = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    spyOn(console, 'log');
    printReceipt(tags);

    expect(console.log).toHaveBeenCalledWith(text);
  });
})
;
