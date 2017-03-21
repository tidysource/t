# objRef
Returns a reference to an object value

## Parameters
| Parameter     | Type                     | Description                                                              |
| ------------- |------------------------- | -------------------------------------------------------------------------|
| obj	        | `string` or `object`     | object to reference                                                      |
| path	        | `string`                 | path of properties __Note:__ It'll throw an error on trailing separator. |
| separator	    | `string` or `undefined`  | separator of property names                                              |
| buildRef      | `boolean` or `undefined` | option to build reference                                                |

## Examples

```javascript
//Example object
var a = {
	b : {
		c : {
			d : 1,
			e : 2
		}
	}
}

//Basic example
var d = objRef(a, 'b/c/d'); //d === 1

//We can use a custom separator
var e = objRef(a, 'b-c-e', '-'); // e === 2

//Build an object reference	
var f = objRef(a, 'b/c/f', '/', true);
var	abc = objRef(a, 'b/c');
	abc.f = 100; //a.b.c.f === 100; 
	
//Trailing separator
var d = objRef(a, 'b/c/d/'); //this will throw an error - Invalid path
```