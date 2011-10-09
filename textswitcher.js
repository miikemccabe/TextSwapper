var TextSwitcher = function() {

	this.global = true;
	this.caseSensitive = true;
	
	this.getFlags = function() {
		var flags = this.global ? 'g' : '';
		flags += this.caseSensitive ? '' : 'i';
		return flags;
	};

	this.exists = function(needle, haystack) {
		var regex;
		if(typeof haystack === 'string' && needle !== undefined) {
			regex = new RegExp(needle, this.getFlags());
			return regex.test(haystack);
		} else {
			return false;
		}
	};
	
	this.find = function(needle, haystack) {
		var regex, match, results = [];
		
		if(typeof haystack === 'string' && needle !== undefined) {
			regex = new RegExp(needle, this.getFlags());			
			do {
				match = regex.exec(haystack);
				if(match) {
					results.push(match);
				}
			} while (match);
			
		}
		
		return results;
		
	};
	
	this.replace = function(find, replace, str) {
		var regex;
		
		if(typeof find === 'string' && replace !== undefined && typeof str === 'string') {
			regex = new RegExp(find, this.getFlags());	
			return str.replace(regex, replace, str);			
		} else {
			return false;
		}
		
	};
}