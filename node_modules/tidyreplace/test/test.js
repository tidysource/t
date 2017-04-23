'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var replace = require('../index.js');

/*
Tests
=====
*/
test('replace()', function(assert){
    assert.plan(5);

	assert.equal(replace('hello w', 'w', 'world'), "hello world",
    'Basic string replacement.');

    assert.equal(replace('hello w', /w/, 'world'), "hello world",
    'Basic regex replacement.');

    var str = replace('hello w', 'w', function (){
        return 'world';
    });
    assert.equal(str, "hello world",
    'Function string replacement.');

    str = replace('hello', 'hello', function (param){
        return param.string + ' world';
    });
    assert.equal(str, "hello world",
    'Arguments passed.');

    str = replace(
                'hello',
                'hello',
                function (param){
                    return param.helloworld;
                },
                {helloworld : 'hello world'});
    assert.equal(str, "hello world",
    'Arguments augmented.');
});
