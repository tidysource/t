'use strict';

/*
Description:
Same as typeof but returns "regex" for regular rexpression,
"array" for array, "null" for null, 'NaN' for NaN and
"arguments" for arguments, the native JS object.

Parameters:
val - variable of which to return type
*/

var valType = function valType(val){
	//Regex
	if (val instanceof RegExp){
		return 'regex';
	}

	var type = typeof val;
	if (type === "object"){
		//See if null
		if (val === null){
			return "null";
		}
		//See if arguments (native JS object)
		else if (Object.prototype.toString.call(val) === "[object Arguments]"){
			return "arguments";
		}
		//See if array
		else if (Array.isArray){
			if (Array.isArray(val)){
				return "array";
			}
			else{
				return "object";
			}
		}
		else if (Object.prototype.toString.call(val) === "[object Array]"){
			return "array";
		}
		else{
		//Any other object
			return "object";
		}
	}
	else if (type === 'number' && isNaN(val)){
		return 'NaN';
	}
	else{
		return type;
	}
};

module.exports = valType;