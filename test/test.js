'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var path = require('../index.js');

/*
Tests
=====
*/
test('t()', function(assert){
    assert.plan(1);

	t().catch(function(err){
		console.log(err);
		assert.fail();
	})
});

