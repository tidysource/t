'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var tMustache = require('../index.js');


/*
Tests
=====
*/
test('tMustache()', function(assert){
    assert.plan(1);
    
    var view = {names : [
						{name : 'Foo'},
						{name : 'Bar'}
						]};
    var template = 	[
    				'<h2>Names</h2>',
					'{{#names}}',
						'{{>hello}}',
					'{{/names}}',
					].join('');
    var partials = {
					hello : '<strong>{{name}}</strong>'
					};
	
	var result = tMustache(view, template, partials);
	
	assert.equal(result, 
				[
				'<h2>Names</h2>',
				'<strong>Foo</strong>',
				'<strong>Bar</strong>'
				].join(''),
				'shallow object partials');
});

test('tMustache()', function(assert){
    assert.plan(1);
    
    var view = {names : [
						{name : 'Foo'},
						{name : 'Bar'}
						]};
    var template = 	[
    				'<h2>Names</h2>',
					'{{#names}}',
						'{{>hello.world}}',
					'{{/names}}',
					].join('');
    var partials = {
					hello : {
							world : '<strong>{{name}}</strong>'
							}
					};
	
	var result = tMustache(view, template, partials);
	
	assert.equal(result, 
				[
				'<h2>Names</h2>',
				'<strong>Foo</strong>',
				'<strong>Bar</strong>'
				].join(''),
				'deep object partials');
});