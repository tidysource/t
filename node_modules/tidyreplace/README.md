# tidyreplace
Extended native string replace method

`replace(str, substr, newSubstr, data)`

`str` - string to perform the replace

`substring` - match with string or regex

`newSubstr` - replacement string or function returning a string

`data` - object or array of objects to merge with arguments that
are made available to the newSubstr function

properties generally available to newSubstr function:
- string (original string)
- match (matched substring)
- submatch (array of capturing groups matches)
- offset (offset of the matched substring within the original string)

```javascript
var replace = require('tidyreplace');

replace('hello w', 'w', 'world') //"hello world"

replace('hello w', /w/, 'world') //"hello world"

replace('hello w', 'w', function (){
    return 'world';
});
//"hello world",

replace('hello', 'hello', function (param){
    return param.string + ' world';
});
//"hello world"

str = replace(
            'hello',
            'hello',
            function (param){
                return param.helloworld;
            },
            {helloworld : 'hello world'});
//"hello world"
```
