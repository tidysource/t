'use strict';

var val = require('tidyval');
var objRef = require('objref');
var Mustache = require('mustache');

module.exports = function tMustache(view, template, partials){
	//Validate params
	val(view).validate('object');
	val(template).validate('string');
	val(partials).validate(['function', 'object', 'undefined']);
	
	//Solve https://github.com/janl/mustache.js/issues/627
	if (typeof partials === 'object'){
		var partialsObj = partials;
		partials = function (name){
			return objRef(partialsObj, name, '.');
		};
	}
	
	//Return rendered
	return Mustache.render(template, view, partials);
};