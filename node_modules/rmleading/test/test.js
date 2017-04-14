'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var rmLeading = require('../index.js');

/*
Tests
=====
*/
test('rmLeading()', function(assert){
    assert.plan(7);

	var slash = '/';

	assert.equal(
				rmLeading('/hello/world', slash),
				'hello/world',
				'Removes leading substring'
				);
	assert.equal(
				rmLeading('//hello/world', slash),
				'hello/world',
				'Removes multiple leading substrings'
				);
	assert.equal(
				rmLeading('///', slash), '',
				'Removes all leading substrings'
				);
	assert.equal(
				rmLeading('hello/world', slash),
				'hello/world',
				'Is OK with nothing to remove'
				);
	assert.equal(
				rmLeading('', slash),
				'',
				'Is OK with empty string'
				);
	assert.throws(
				function(){rmLeading(true, slash)},
				'Throws for non-string str argument'
				);
	assert.throws(
				function(){rmLeading('hello/world', true)},
				'Throws for non-string substr argument'
				);
});
