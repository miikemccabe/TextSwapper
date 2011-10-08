var TextSwitcher = function() {

	this.exists = function(needle, haystack) {
		var regex;
		if(typeof haystack === 'string' && needle !== undefined) {
			regex = new RegExp(needle, "g");
			return regex.test(haystack);
		} else {
			return false;
		}
	};
	
	this.find = function(needle, haystack) {
		var regex, match, results = [];
		
		if(typeof haystack === 'string' && needle !== undefined) {
			regex = new RegExp(needle, "g");			
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
			regex = new RegExp(find, "g");	
			return str.replace(regex, replace, str);			
		} else {
			return false;
		}
		
	};
}