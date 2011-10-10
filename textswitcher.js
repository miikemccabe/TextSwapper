var TextSwapper = function() {

	this.global = true;
	this.caseSensitive = true;
	this.found = [];
	this.foundIndex;
	
	this.findNext = function() {
		if(this.foundIndex) {
			this.foundIndex++;
			var start = this.found[this.foundIndex].index;
			var end = start + this.found[this.foundIndex][0].length;
			this._highlight(input, this.found[++this.foundIndex].index, end);
		}
		return this.foundIndex;
	}
	
	this.find = function(input, word) {
		this.found = this._find(word, input.value);
		this.foundIndex = this.found[0].index;
		var start = this.found[0].index;
		var end = start + word.length;
		this._highlight(input, this.found[0].index, end);
		return this.foundIndex;
	}
	
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
	
	this._replace = function(find, replace, str) {
		var regex;
		
		if(typeof find !== undefined && replace !== undefined && typeof str === 'string') {
			regex = new RegExp(find, this._getFlags());	
			return str.replace(regex, replace, str);			
		} else {
			return false;
		}
		
	};
	
	this._highlight = function(input, start, end) {
		input.setSelectionRange(start, end);
	};
}