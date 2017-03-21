'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tape');
var colorize = require('tap-colorize');
var colorizeOptions = {
	pass : '#B2D9B5',
	fail : '#FE5A4E',
	info : '#EEEEEE'
};
test.createStream()
	.pipe(colorize(colorizeOptions))
	.pipe(process.stdout);

//Module to test
var objRef = require('../index.js');

/*
Tests
=====
*/
test('objRef()', function(assert){
	assert.plan(3);
	
	var a = {
		b : {
			c : {
				d : 1,
				e : 2
			}
		}
	}
	
	var d = objRef(a, 'b/c/d');
	assert.equal(d,1,
				'object reference works');
	
	var e = objRef(a, 'b-c-e', '-');
	assert.equal(e,2,
				'custom separator works');
	
	var f = objRef(a, 'b/c/f', '/', true);
	var	abc = objRef(a, 'b/c');
		abc.f = 100;
	assert.equal(a.b.c.f, 100, 
				'buildPath works');
});