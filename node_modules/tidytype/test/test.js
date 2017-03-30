'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var valType = require('../index.js');

/*
Tests
=====
*/
var foo = function foo(bar){
	return valType(arguments);
}

test('valType()', function(assert){
	assert.plan(15);

	assert.equal(valType(), 'undefined',
				'no argument returns undefined');
	assert.equal(valType(undefined), 'undefined',
				'undefined is undefined');
	assert.equal(valType(0), 'number',
				'zero is number');
	assert.equal(valType(1), 'number',
				'1 is number');
	assert.equal(valType('') , 'string', 
				'"" is string');
	assert.equal(valType('helloworld') , 'string',
				'"helloworld is string"');
	assert.equal(valType(NaN), 'NaN',
				'NaN is NaN');
	assert.equal(valType(true), 'boolean',
				'true is boolean');
	assert.equal(valType(false), 'boolean',
				'false is boolean');
	assert.equal(valType(function(){}), 'function',
				'function(){} is function');
	assert.equal(valType({}), 'object',
				'{} is object');
	assert.equal(valType([]), 'array',
				'[] is array');
	assert.equal(valType(null), 'null',
				'null is null');
	assert.equal(valType(/hello/), 'regex',
				'/hello/ is regex');
	assert.equal(foo(1), 'arguments',
				'native arguments object is arguments');
});