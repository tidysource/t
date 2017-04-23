'use strict';

const val = require('tidyval');
const path = require('tidypath');
const replace = require('tidyreplace');
const rmLeading = require('rmLeading');

var setUrl = function setUrl(files,
							dataFolderPath,
							URLbase,
							folderizeURL,
							rebase){
	val(files).validate('array');
	val(dataFolderPath).validate('string');
	val(URLbase).validate('string');
	val(rebase).validate('array');

	return files.map(function (file){
		//Set default url
		var folderize = '';
		if (folderizeURL){
			if (file.parsed._ext === '.html' &&
				path.filename(file.path).slice(0,5) !== 'index'){
				folderize = path.separator + 'index';
			}
		}
		var _url = path.rmExt(file.path);
			_url = _url + folderize + file.parsed._ext;
			_url = _url.slice(dataFolderPath.length);
			_url = rmLeading(_url, path.separator);
			_url = URLbase + _url;
		file.parsed._url = _url;

		//Rebase url (if regex matches)
		rebase.map(function (redirect){
			val(redirect.from).validate(['string', 'regex']);
			val(redirect.to).validate(['string', 'function']);

			file.parsed._url = replace(file.parsed._url,
										redirect.from,
										redirect.to,
										{parsed : file.parsed});
		});

		return file;
	});
};

module.exports = setUrl;
