
module("TextSwitcher", {
	setup: function() { 
		this.str = 'When you first start off trying to solve a problem,\
               the first solutions you come up with are very complex,\
               and most people stop there. But if you keep going, and\
               live with the problem and peel more layers of the onion\
               off, you can often times arrive at some very elegant and\
               simple solutions.';
             
		this.ts = new TextSwitcher();
		ok(this.ts, 'The TextSwitcher was created successfully');
		
		this.textarea = document.createElement('textarea');
		this.textarea.value = this.str;
		this.textarea.style.margin = '20px';
		document.body.appendChild(this.textarea);
	},
	teardown: function() {
		document.body.removeChild(this.textarea);
	}
});

test("exists()", function() {
             
  var result;
             
	result = this.ts.exists('first', this.str);
	ok(result, "Find the word 'first'");
	
	result = this.ts.exists('But if you keep going', this.str);
	ok(result, "Find the sentence 'But if you keep going'");
	
	result = this.ts.exists('microsoft', this.str);
	ok(!result, "Find the word 'microsoft'");
	
	result = this.ts.exists(0, this.str);
	ok(!result, "Try and find an integer");
	
	result = this.ts.exists('people', undefined);
	ok(!result, "Supply undefined as the haystack");
	
	result = this.ts.exists(undefined, this.str);
	ok(!result, "Supply undefined as the search");
	
});

test("find()", function() {

	var result;
	
	result = this.ts.find('start', this.str);
	equal(result.length, 1, "Find the one occurrence of 'start'");
	equal(result[0].index, 15, "Find the index of the occurrence of 'start'");	
	
	result = this.ts.find('off', this.str);
	equal(result.length, 2, "Find the 2 occurrences of 'off'");
	equal(result[0].index, 21, "Find the index of the 1st occurrence of 'off'");
	equal(result[1].index, 274, "Find the index of the 2nd occurrence of 'off'");
	
	result = this.ts.find('peel more layers of the onion', this.str);
	equal(result.length, 1, "Find the 1 occurrence of the sentence 'peel more layers of the onion'");
	
	result = this.ts.find('\\w+ion', this.str);
	equal(result.length, 3, "Find the 3 occurrences of the regex \\w+ion'");
	
	result = this.ts.find('Bill Gates', this.str);
	equal(result.length, 0, "Try and find 'Bill Gates'");
	
	result = this.ts.find(null, this.str);
	equal(result.length, 0, "Try and find null");
	
	result = this.ts.find('start', null);
	equal(result.length, 0, "Try and find start in null");
	
});


test("replace()", function() {

	var result;
	
	result = this.ts.replace('solve', 'fix', this.str);
	ok(this.ts.exists('fix', result), "Check the word 'fix' is now in the string");
	ok(!this.ts.exists('solve', result), "Check the word 'solve' is no longer in the string");
	
	result = this.ts.replace('o', 0, this.str);
	ok(this.ts.exists(0, result), 'Check that the integer 0 exists');
	console.log(result);
	
	find1 = this.ts.find(0, result);
	equal(find1[0].index, 6, "Find the index of the 1st occurrence of 0");
	equal(find1.length, 26, "Check that 26 occurrences of 0 were found");
	
	result = this.ts.replace(0, 'o', this.str);
	ok(!this.ts.exists(0, result), "Check that the integer 0 doesn't exist anymore");
	console.log(result);
		
});

test("getFlags()", function() {
	
	equal(this.ts.getFlags(), 'g', "Default flags should be case sensitive and not global");
	
	this.ts.global = false;
	equal(this.ts.getFlags(), '', "Flags should not be global");
	
	this.ts.caseSensitive = false;
	equal(this.ts.getFlags(), 'i', "Flags should not be global and be case insensitive");

	
});

test("highlight()", function() {
	
	this.ts.highlight(this.textarea, 0, 4);
	
	equal(window.getSelection().toString(), 'When', 'Highlight range 0-4, should be the word \'when\'');
	
});

