'use strict';

module.exports = function objRef(obj, path, separator, buildPath){
	if (typeof separator !== 'string'){
		separator = '/';
	}
	var path = path.split(separator);
	var ref = obj;
	
	for(var i=0; i<path.length; ++i){
		var prop = path[i];
		if (typeof ref[prop] === 'undefined'){
			if (buildPath){
				ref[prop] = {};
			}
			else{
				throw new Error ('Invalid path');
			}
		}
		ref = ref[prop];
	}
	
	return ref;
};
