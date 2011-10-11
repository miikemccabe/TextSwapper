/**
    Creates a new TextSwapper.
    @constructor 
*/ 
var TextSwapper = function() {

	this.search;
	this.haystacks;
	
	this.inputs = [];
	
	this.found;
	this.foundIndex;

	this.global = true;
	this.caseSensitive = true;
	
	this.addInput = function(input) {
		var count = this.inputs.length;
		for(var i=0; i<count; i++) {
			if(this.inputs[i] === input) {
				return false;
			}
		}
		this.inputs.push(input);
	}
	
	this.find = function(input, word) {
		this.found = this._find(word, input.value);
		if(this.found.length > 0) {
			this.foundIndex = 0;
			var start = this.found[0].index;
			var end = start + word.length;
			this.input = input;
			this._select(this.input, this.found[0].index, end);
		}
	};
	
	this.findNext = function() {
		if(this.found.length > 0) {
			var i = ++this.foundIndex;
			if(i === this.found.length) {
				i = 0;
				this.foundIndex = 0;
			}
			var start = this.found[i].index;
			var end = start + this.found[i][0].length;
			this._select(this.input, start, end);
			return this.found[i];
		} else {
			return false;
		}
	};
	
	/**
	* Returns the flags to be used in RegExp
	*	@returns {String} The flags based on TextSwapper's global and caseSensitive attributes
	*/	
	this._getFlags = function() {
		var flags = this.global ? 'g' : '';
		flags += this.caseSensitive ? '' : 'i';
		return flags;
	};

	this._exists = function(needle, haystack) {
		var regex;
		if(typeof haystack === 'string' && needle !== undefined) {
			regex = new RegExp(needle, this._getFlags());
			return regex.test(haystack);
		} else {
			return false;
		}
	};
	
	/**
	* Uses the native RegExp object to find the needle in the haystack
	*	@param {String} needle Text string or regex to search for
	* @param {String} haystack Text string to search for the needle
	* @returns {Array} An array of RegExp match objects
	*/
	this._find = function(needle, haystack) {
		var regex, match, results = [];
		
		if(typeof haystack === 'string' && needle !== undefined) {
			regex = new RegExp(needle, this._getFlags());			
			do {
				match = regex.exec(haystack);
				if(match) {
					results.push(match);
				}
			} while (match);
			
		}
		
		return results;
		
	};
	
	/**
	* Uses the native RegExp object and the native string.replace to replace text
	*	@param {String} find Text string or regex to search for
	* @param {String} replace Text string or regex for replacing
	* @param {String} string   String to perfom the replace on
	* @returns {String} Returns the string with the text replaced
	*/	
	this._replace = function(find, replace, str) {
		var regex;
		
		if(typeof find !== undefined && replace !== undefined && typeof str === 'string') {
			regex = new RegExp(find, this._getFlags());	
			return str.replace(regex, replace, str);			
		} else {
			return false;
		}
		
	};
	
	/**
	* Selects text in the given range
	* @param {HTMLDomElement} input  Input or Textarea element
	* @param {Integer} start Integer of selection start index
	* @param {Integer} end Integer of selection end index
	*/
	this._select = function(input, start, end) {
		input.setSelectionRange(start, end);
	};
}