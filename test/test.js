'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var t = require('../index.js');

/*
Tests
=====
*/
test('t()', function(assert){
    assert.plan(1);

	var testConfig = {
		url : {
            base : './',
        },
		folder : {
			data : './test/_data',
			template : './test/_template',
			result : './test/_public'
		}
	};

	t(testConfig).then(function(){
		assert.ok(true, 't() works');
	})
	.catch(function(err){
		console.log(err);
		assert.fail('t() failed');
	});
});
