
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
	}
});

test("exists()", function() {
             
  var result;
             
	result = this.ts.exists('first', this.str);
	equal(result, true, "Find the word 'first'");
	result = this.ts.exists('But if you keep going', this.str);
	equal(result, true, "Find the sentence 'But if you keep going'");
	result = this.ts.exists('microsoft', this.str);
	equal(result, false, "Find the word 'microsoft'");
	result = this.ts.exists(0, this.str);
	equal(result, false, "Try and find an integer");
	result = this.ts.exists('people', undefined);
	equal(result, false, "Supply undefined as the haystack");
	result = this.ts.exists(undefined, this.str);
	equal(result, false, "Supply undefined as the search");
	
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
	equal(result.length, 1, "Find the 1 occurrence of the sentance 'peel more layers of the onion'");
	result = this.ts.find('\\w+ion', this.str);
	equal(result.length, 3, "Find the 3 occurrences of the regex \\w+ion'");
	result = this.ts.find('Bill Gates', this.str);
	equal(result.length, 0, "Try and find 'Bill Gates'");
	
});