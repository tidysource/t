'use strict';

const tidyval = require('tidyval');
const type = require('tidytype');
const objSet = require('objset');
const rmLeading = require('rmleading');

module.exports = function merge(param){ //param is an array of objects
	tidyval(param).validate('array');
	let toCheck = [];
	let toSet = {};

	param.map(function (val){
		tidyval(val).validate('object');
		toCheck.push({
			val : val,
			path : ''
		});
	});

	for (let i = 0; i < toCheck.length; i++){
		let item = toCheck[i];
		if (type(item.val) === 'array'){
			item.val.map(function (val, prop){
				let path = item.path + '/' + prop;
				if (type(val) === 'object'){ //array or object
					toCheck.push({
						val : val,
						path : path
					});
				}
				else{
					toSet[path] = val;
					//Overrides any previos value at same path
				}
			})
		}
		else{ //item is an object
			for (let prop in item.val){
				let val = item.val[prop];
				let path = item.path + '/' + prop;
				if (type(val) === 'object'){ //array or object
					toCheck.push({
						val : val,
						path : path
					});
				}
				else{
					toSet[path] = val;
					//Overrides any previos value at same path
				}
			}
		}
	}
	
	let result = {};
	for (let prop in toSet){
		let val = toSet[prop];
		let path = rmLeading(prop, '/');

		objSet(result, path, '/', val);
	}

	return result;
};
