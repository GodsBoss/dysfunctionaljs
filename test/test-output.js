/**
* Creates an output function.
*
* The return value is a function which does the real output.
* It takes an array of test results and then renders them into
* the target element.
*
* Every test result is an object with these properties:
*
* success - Truthy, if the test succeeded, else falsy.
* description - What was the test supposed to do?
* expected (optional) - What expected the test?
* instead (optional) - What did he get instead?
*
* For convenience, all "failed" results are rendered at the top,
* successful ones at the bottom.
*
* @param HTMLDocument doc Used for creation of nodes.
* @param HTMLElement target Here the results are added.
* @return function
*/
function createOutput(doc, target){
	function output(results){
		var list=doc.createElement('ul');
		list.className='results';
		var numberOfTests=0;
		var failures=0;
		var successes=0;
		for (var i=0,l=results.length;i<l;i++){
			numberOfTests++;
			var result=results[i];
			var item=doc.createElement('li');
			if (result.success && !result.error){
				item.innerHTML='<span class="result">Success:</span> <span class="description">'+result.description+'</span>'+
					' <span class="assertions">('+result.assertions+' assertion(s))</span>';
				item.className='success';
				successes++;
				list.appendChild(item);}
			else{
				item.innerHTML=
					'<span class="result">Failure:</span> <span class="description">'+result.description+'</span>'+
					' <span class="assertions">('+result.assertions+' assertions(s))</span>';
				if (result.failures.length>0){
					var failList='';
					for(var j=0,max=result.failures.length;j<max;j++){
						var failure=result.failures[j];
						failList+='<li>'+'Expected: <code>'+failure.expected+'</code><br>Instead: <code>'+failure.instead+'</code>'+
						(failure.message?'<br>Message: '+failure.message:'')+
						'</li>';}
					item.innerHTML+=
						'<br><span class="failed-assertions">'+result.failures.length+' assertions failed:</span>'+
						'<ul>'+failList+'</ul>';}
				item.className='failure';
				failures++;
				if (result.error){
					item.innerHTML+='<br><span class="error">Error: '+result.error+'</span>';}
				list.insertBefore(item, list.firstChild);}}
		var summary=doc.createElement('p');
		summary.className='summary '+(failures?'failure':'success');
		summary.innerHTML=
			'<span class="result">'+(failures?'Failure':'Success')+':</span> '+
			'From <span class="tests">'+numberOfTests+'</span> tests, '+
			'<span class="success">'+successes+'</span> succeeded and '+
			'<span class="failure">'+failures+'</span> failed.';
		target.appendChild(summary);
		target.appendChild(list);}

	return output;}
