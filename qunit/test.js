
module("TextSwapper", {
	setup: function() { 
		this.str = 'When you first start off trying to solve a problem, the first solutions you come up with are very complex, and most people stop there. But if you keep going, and live with the problem and peel more layers of the onion off, you can often times arrive at some very elegant and simple solutions.';
             
		this.ts = new TextSwapper();
		ok(this.ts, 'The TextSwapper was created successfully');
		
		this.textarea = document.createElement('textarea');
		this.textarea.value = this.str;
		this.textarea.style.margin = '20px';
		document.body.appendChild(this.textarea);
	},
	teardown: function() {
		document.body.removeChild(this.textarea);
	}
});

test("setInput()", function() {

	this.ts.setInput();
	equal(this.ts.input, undefined, 'Check that the input is undefined');
	
	this.textarea.focus();
	this.ts.setInput();
	equal(this.ts.input, this.textarea, 'Check that the input is the textarea');
	
	this.ts.setInput(this.textarea);
	equal(this.ts.input, this.textarea, 'Check that the input has been set');
	
	this.ts.setInput(null);
	equal(this.ts.input, this.textarea, 'Check that the input is unchanged');
	
	var testDiv = document.createElement('div');
	
	this.ts.setInput(testDiv);
	equal(this.ts.input, this.textarea, 'Try setting input as DIV. Check that the input is unchanged');
	
});


test("find()", function() {
	equal(this.ts.find('When'), false, "Check it fails gracefully when no input has been set.");
	this.textarea.focus();
	equal(this.ts.find('When'), true, "Check it finds 'When' if the textarea has focus but no input has been set.");
	
	this.ts.setInput(this.textarea);
	this.ts.find('When');
	equal(window.getSelection().toString(), 'When', 'The word \'When\' should be highlighted');
	equal(this.ts.found[0][0], 'When', 'The word \'When\' should be in the found array');
	
	this.ts.find('you');
	equal(window.getSelection().toString(), 'you', 'The word \'you\' should be highlighted');
	equal(this.ts.found[1][0], 'you', 'The word \'you\' should be in the found array');
	equal(this.ts.found.length, 4 ,'Should have found 4 you\'s');
	
	this.ts.find('bill');
	equal(this.ts.found.length, 0, 'Check that nothing was found for \'bill\'');
	
	this.ts.find('[a-z]*ee[a-z]*');
	equal(window.getSelection().toString(), 'keep', 'The word \'keep\' should be highlighted');
	equal(this.ts.found[1][0], 'peel', 'The word \'peel\' should be in the found array');
	equal(this.ts.found.length, 2 ,'Should have found 2 you\'s');

});

test("findNext()", function() {

	this.ts.setInput(this.textarea);

	equal(this.ts.findNext(), false, 'Check that false is returned when there is nothing to be found yet.');
		
	this.ts.find('bill');
	equal(this.ts.findNext(), false, 'Check that nothing was found for \'bill\'');
	
	this.ts.find('you');
	equal(this.ts.foundIndex, 0, 'Found index should be 0');
	
	var next = this.ts.findNext();
	equal(next[0], 'you', 'Check that findNext() has returned the next match');
	equal(this.ts.foundIndex, 1, 'Found index should be 1');
	equal(window.getSelection().toString(), 'you', 'The word \'you\' should be highlighted');
});

test("replace()", function() {
	this.ts.setInput(this.textarea);
	equal(this.ts.replace('onion', 'cheese'), true, "Replace 'onion' with 'cheese'");
	
	this.ts.find('cheese');
	equal(window.getSelection().toString(), 'cheese', "Check that the textarea now contains the word 'cheese'");
	
	equal(this.ts.replace(null), false, "Check false is returned when there aren't enough arguments");
	
	equal(this.ts.replace('sausage', 'Linda McCartney Sausage'), false, "Check false is returned when the string can't be found");
	
});

test("_exists()", function() {
             
  var result;
             
	result = this.ts._exists('first', this.str);
	ok(result, "Find the word 'first'");
	
	result = this.ts._exists('But if you keep going', this.str);
	ok(result, "Find the sentence 'But if you keep going'");
	
	result = this.ts._exists('microsoft', this.str);
	ok(!result, "Find the word 'microsoft'");
	
	result = this.ts._exists(0, this.str);
	ok(!result, "Try and find an integer");
	
	result = this.ts._exists('people', undefined);
	ok(!result, "Supply undefined as the haystack");
	
	result = this.ts._exists(undefined, this.str);
	ok(!result, "Supply undefined as the search");
	
});

test("_find()", function() {

	var result;
	
	result = this.ts._find('start', this.str);
	equal(result.length, 1, "Find the one occurrence of 'start'");
	equal(result[0].index, 15, "Find the index of the occurrence of 'start'");	
	
	result = this.ts._find('off', this.str);
	equal(result.length, 2, "Find the 2 occurrences of 'off'");
	equal(result[0].index, 21, "Find the index of the 1st occurrence of 'off'");
	equal(result[1].index, 218, "Find the index of the 2nd occurrence of 'off'");
	
	result = this.ts._find('peel more layers of the onion', this.str);
	equal(result.length, 1, "Find the 1 occurrence of the sentence 'peel more layers of the onion'");
	
	result = this.ts._find('\\w+ion', this.str);
	equal(result.length, 3, "Find the 3 occurrences of the regex \\w+ion'");
	
	result = this.ts._find('Bill Gates', this.str);
	equal(result.length, 0, "Try and find 'Bill Gates'");
	
	result = this.ts._find(null, this.str);
	equal(result.length, 0, "Try and find null");
	
	result = this.ts._find('start', null);
	equal(result.length, 0, "Try and find start in null");
	
});


test("_replace()", function() {

	var result;
	
	result = this.ts._replace('solve', 'fix', this.str);
	ok(this.ts._exists('fix', result), "Check the word 'fix' is now in the string");
	ok(!this.ts._exists('solve', result), "Check the word 'solve' is no longer in the string");
	
	result = this.ts._replace('o', 0, this.str);
	ok(this.ts._exists(0, result), 'Check that the integer 0 _exists');
	
	var find1 = this.ts._find(0, result);
	equal(find1[0].index, 6, "Find the index of the 1st occurrence of 0");
	equal(find1.length, 26, "Check that 26 occurrences of 0 were found");
	
	result = this.ts._replace(0, 'o', this.str);
	ok(!this.ts._exists(0, result), "Check that the integer 0 doesn't exist anymore");
		
});

test("_getFlags()", function() {
	
	equal(this.ts._getFlags(), 'g', "Default flags should be case sensitive and not global");
	
	this.ts.global = false;
	equal(this.ts._getFlags(), '', "Flags should not be global");
	
	this.ts.caseSensitive = false;
	equal(this.ts._getFlags(), 'i', "Flags should not be global and be case insensitive");

	
});

test("_select()", function() {
	this.ts._select(this.textarea, 0, 4);
	
	equal(window.getSelection().toString(), 'When', 'Highlight range 0-4, should be the word \'when\'');
	
});

test("_getSelection()", function() {
	this.ts._select(this.textarea, 0, 4);
	var result = this.ts._getSelection();
	equal(result, 'When', "'When' should be selected");
});

