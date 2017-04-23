'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var merge = require('../index.js');

/*
Tests
=====
*/
test('merge()', function(assert){
    assert.plan(3);

    let a = {b: {c : 0}};
    let b = {b: {d : 1}};
    let merged = {
        b : {
            c : 0,
            d : 1
        }
    };
    assert.deepEqual(merge([a,b]),merged,
                    'Basic merge');

    a = {b: {c : 0, d : 1}, e : 0};
    b = {b: {c : 1}, e : 0};
    merged = {
        b : {
            c : 1,
            d : 1
        },
        e : 0
    };
    assert.deepEqual(merge([a,b]),merged,
                    'Merge multiple properties');

    a = {b: {c : 0}};
    b = {b: {c : 1}};
    merged = {
        b : {
            c : 1
        }
    };
    assert.deepEqual(merge([a,b]),merged,
                    'Merge and overwrite');
});
