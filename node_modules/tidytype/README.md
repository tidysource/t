# TidyType
Same as native function `typeof` but:
-  returns `"regex"` for regular expression,
- `"array"` for array, 
- `"null"` for null, 
- `"NaN"` for NaN and
- `"arguments"` for [arguments][1], the native JS object.
[1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/arguments

## How to use
### Prerequisites
None

### Parameters
val - variable or value of which to return type

### Example
```javascript
//Undefined type
valType() //'undefined'
valType(undefined) //'undefined'

//Number type
valType(0) //'number'
valType(1) //'number'

//NaN type
valType(NaN) //'NaN'

//String type
valType('helloworld') //'string'
valType('') //'string'

//Boolean type
valType(true) //'boolean'
valType(false) //'boolean'

//Function type
valType(function(){}) //'function'

//Object type
valType({}) //'object'

//Array type
valType([]) //'array'

//Null type
valType(null) //'null'

//Regex type
valType(/hello/) //'regex'

//Native arguments object type
var foo = function foo(bar){
	return valType(arguments);
}
foo(1) //'arguments'
});
```