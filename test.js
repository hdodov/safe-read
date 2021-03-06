var safeRead = require('./index.js');

var itemObj = {
    test: [
        {
            foo: {
                bar: [
                    ['a', 3]
                ]
            }
        }
    ]
};

var errorObj = {
    test: [
        {
            error: [
                {
                    code: 400,
                    message: 'Foobar!'
                }
            ]
        }
    ]
};

var response = [
  {
    "ItemAttributes":[
      {
        "UPCList":[
          {
            "UPCListElement":[
              "027242877115",
              "799959956994",
              "780746812258"
            ]
          }
        ]
      }
    ]
  }
];

console.log('itemObj', safeRead(itemObj, 'test.0.foo.bar.0.0'));
console.log('errorObj', safeRead(errorObj, 'test.0.foo.bar.0.0'));
console.log('errorObj', safeRead(errorObj, 'test.0.error.0.message'));
console.log('response', safeRead(response, '0.ItemAttributes.0.UPCList.0.UPCListElement.0'));
console.log('undefined', safeRead(undefined, 'foo'));
console.log('null', safeRead({de: {item: null}}, 'de.item.attributes.0.UPC.0'));
console.log('null string', safeRead({a: 3}, 'a.null'));
console.log('nullpath', safeRead({test: 5}, null));