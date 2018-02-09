# safe-read
Allows you to extract a specific property in a deep nested object without having to check the existance of each property in-between.

# Install

```
npm install safe-read --save
```

# Example

```js
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

console.log(safeRead(itemObj, 'test.0.foo.bar.0.0'));       // 'a'
console.log(safeRead(errorObj, 'test.0.foo.bar.0.0'));      // undefined
console.log(safeRead(errorObj, 'test.0.error.0.message'));  // 'Foobar!'
```

# Debugging

Debugging is done via the [debug](https://www.npmjs.com/package/debug) package and the `DEBUG` environmental variable.

# Use cases
Can be used when extracting data from a complex API response like the ones from Amazon’s [Product Advertising API](https://docs.aws.amazon.com/AWSECommerceService/latest/DG/Welcome.html):

```js
var response = [
  {
    ...
    "ItemAttributes":[
      {
        ...
        "UPCList":[
          {
            "UPCListElement":[
              "027242877115",
              "799959956994",
              "780746812258"
            ]
          }
        ],
        ...
      }
    ]
  }
];
```

Normally, to get the first `UPCListElement`, you would have to do something like:

```js
if (
    response &&
    response[0] &&
    response[0].ItemAttributes &&
    response[0].ItemAttributes[0] &&
    response[0].ItemAttributes[0].UPCList &&
    response[0].ItemAttributes[0].UPCList[0] &&
    response[0].ItemAttributes[0].UPCList[0].UPCListElement &&
    response[0].ItemAttributes[0].UPCList[0].UPCListElement[0]
) {
    listElement = response[0].ItemAttributes[0].UPCList[0].UPCListElement[0];
}
```

With safe-read, you can do just:

```js
listElement = safeRead(response, '0.ItemAttributes.0.UPCList.0.UPCListElement.0');
```

If `response` is not an object or if any of the intermediate properties do not exist, `undefined` is returned.
