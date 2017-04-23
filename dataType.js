'use strict';

const val = require('tidyval');
const valIndexOf = require('./valIndexOf.js');

module.exports = function dataType(files, dataType){
	val(files).validate('array');
	val(dataType).validate('object');
	val(dataType.asset).validate(['regex', 'array']);
	val(dataType.meta).validate(['regex', 'array']);
	
	return files.map(function (file){
		if (Array.isArray(file)){
			//console.log(file)
		}
		val(file).validate('object');
		val(file.parsed).validate('object');

		var asset = valIndexOf(file.path, dataType.asset);
		var meta = valIndexOf(file.path, dataType.meta);
		if (asset < meta){
			file.parsed._isAsset = true;
		}
		else if (meta < asset){
			file.parsed._isMeta = true;
		}
		else{	//asset === -1 && meta === -1
			file.parsed._isContent = true;
		}
		return file;
	});
};;
