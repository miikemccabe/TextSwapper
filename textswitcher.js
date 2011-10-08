var TextSwitcher = function() {

	this.exists = function(needle, haystack) {
		var regex;
		if(typeof needle === 'string' && typeof haystack === 'string') {
			regex = new RegExp(needle, "g");
			return regex.test(haystack);
		} else {
			return false;
		}
	};
	
	this.find = function(needle, haystack) {
		var regex, match, results = [];
		
		if(typeof needle === 'string' && typeof haystack === 'string') {
			regex = new RegExp(needle, "g");			
			do {
				match = regex.exec(haystack);
				if(match) {
					results.push(match);
				}
			} while (match);
			
			return results;
			
		} else {
			return false;
		}
	};
}