'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var val = require('../index.js');

/*
Tests
=====
*/
test('to("array")', function(assert){
    assert.plan(11);
	
	assert.deepEqual(val().to('array'), []);
	assert.deepEqual(val(1).to('array'), [1]);
	assert.deepEqual(val(0).to('array'), [0]);
	assert.deepEqual(val('helloworld').to('array'), ['helloworld']);
	assert.deepEqual(val('').to('array'), ['']);
	assert.deepEqual(val({}).to('array'), [{}]);
	assert.deepEqual(val(null).to('array'), [null]);
	assert.deepEqual(val(true).to('array'), [true]);
	assert.deepEqual(val(false).to('array'), [false]);
	assert.deepEqual(val([1,2,3]).to('array'), [1,2,3]);
	assert.deepEqual(val([]).to('array'), []);
});

test('to("object")', function(assert){
	assert.plan(11);
	
	assert.deepEqual(val().to('object'), {});
	assert.throws(function(){val(1).to('object')});
	assert.throws(function(){val(0).to('object')});
	assert.throws(function(){val('helloworld').to('object')});
	assert.throws(function(){val('').to('object')});
	assert.deepEqual(val({}).to('object'), {});
	assert.throws(function(){val(null).to('object')});
	assert.throws(function(){val(true).to('object')});
	assert.throws(function(){val(false).to('object')});
	assert.throws(function(){val([1,2,3]).to('object')});
	assert.throws(function(){val([]).to('object')});
});

test('validate()', function(assert){
	assert.plan(23);
	
	assert.throws(function(){val(1).validate('boolean')});
	assert.doesNotThrow(function(){val(true).validate('boolean')});
	
	assert.throws(function(){val('hello').validate('number')});
	assert.doesNotThrow(function(){val(0).validate('number')});
	
	assert.throws(function(){val(1).validate('string')});
	assert.doesNotThrow(function(){val('hello').validate('string')});
	
	assert.throws(function(){val(0).validate('array')});
	assert.doesNotThrow(function(){val([]).validate('array')});
	
	assert.throws(function(){val().validate('object')});
	assert.doesNotThrow(function(){val({}).validate('object')});
	
	assert.throws(function(){val(1).validate('function')});
	assert.doesNotThrow(function(){val(function(){}).validate('function')});
	
	assert.throws(function(){val(1).validate('regex')});
	assert.doesNotThrow(function(){val(/foo/).validate('regex')});
	
	assert.throws(function(){val(1).validate('null')});
	assert.doesNotThrow(function(){val(null).validate('null')});
	
	assert.throws(function(){val(0).validate('NaN')});
	assert.doesNotThrow(function(){val(NaN).validate('NaN')});
	
	assert.throws(function(){val(0).validate('undefined')});
	assert.doesNotThrow(function(){val().validate('undefined')});
	
	assert.throws(function(){val(1).validate(['string','undefined'])});
	assert.doesNotThrow(function(){val().validate(['string','undefined'])});
	
	assert.deepEqual(val([]).validate('array').to('array'), [], 
					'validate() is chainable');
});

test('invalidate()', function(assert){
	assert.plan(23);
	
	assert.doesNotThrow(function(){val(1).invalidate('boolean')});
	assert.throws(function(){val(true).invalidate('boolean')});
	
	assert.doesNotThrow(function(){val('hello').invalidate('number')});
	assert.throws(function(){val(0).invalidate('number')});
	
	assert.doesNotThrow(function(){val(1).invalidate('string')});
	assert.throws(function(){val('hello').invalidate('string')});
	
	assert.doesNotThrow(function(){val(0).invalidate('array')});
	assert.throws(function(){val([]).invalidate('array')});
	
	assert.doesNotThrow(function(){val().invalidate('object')});
	assert.throws(function(){val({}).invalidate('object')});
	
	assert.doesNotThrow(function(){val(1).invalidate('function')});
	assert.throws(function(){val(function(){}).invalidate('function')});
	
	assert.doesNotThrow(function(){val(1).invalidate('regex')});
	assert.throws(function(){val(/foo/).invalidate('regex')});
	
	assert.doesNotThrow(function(){val(1).invalidate('null')});
	assert.throws(function(){val(null).invalidate('null')});
	
	assert.doesNotThrow(function(){val(0).invalidate('NaN')});
	assert.throws(function(){val(NaN).invalidate('NaN')});
	
	assert.doesNotThrow(function(){val(0).invalidate('undefined')});
	assert.throws(function(){val().invalidate('undefined')});
	
	assert.doesNotThrow(function(){val(1).invalidate(['string','undefined'])});
	assert.throws(function(){val().invalidate(['string','undefined'])});
	
	assert.deepEqual(val().invalidate('array').to('array'), [],
					'invalidate() is chainable');
});