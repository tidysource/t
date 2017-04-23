'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var objSet = require('../index.js');

/*
Tests
=====
*/
test('objSet()', function(assert){
	assert.plan(3);

	assert.deepEqual(objSet({}, 'a', '/', 1),
					{a:1}, '1st lvl set works');

	assert.deepEqual(objSet({}, 'a/b', '/', 1),
					{a:{b:1}}, '2nd lvl set works');

	assert.deepEqual(objSet({a:{b:1}}, 'a/c', '/', 2),
					{a:{b:1, c:2}}, 'Existing value is preserved');
});
