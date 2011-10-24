var ts;

chrome.extension.onRequest.addListener(function(request, sender, response) {
	if(!ts) {
		ts = new TextSwapper();
		ts.setInput();
	}
	if(request.message === 'find') {
		ts.find(request.findVal);
	}
	if(request.message === 'findNext') {
		ts.findNext();
	}
	if(request.message === 'replaceAll') {
		console.log(ts.replace(request.findVal, request.replaceVal));
	}
});