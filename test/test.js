/**
* The small test framework.
*
* Has one method, run(tests), where tests is an array of tests.
*
* A test is an object with two properties:
*   description - A description of what is tested.
*   test        - A function which does the testing.
*
* The test function is called with one parameter. This is an object,
* which is created by the Runner constructor. It provides the assertion methods.
*
* The result is an array of test result. Every test result has these properties:
*   description - The description as given by the test.
*   assertions  - The number of assertions within the test.
*   success     - true, if all assertions were successful, else false.
*   failures    - An array containing all results of the assertions which failed.
*/
var TestFramework=(function(){

	// Shortcut.
	var objToStr=Object.prototype.toString;

	/**
	* Test runner constructor.
	* Provides assertion and helper functions.
	*
	* The only argument is a function 'out', which takes one parameter.
	* This parameter is an assert result. If a test function calls
	* an assert method of the runner object, the result of the
	* assertion is the argument to 'out'.
	* 
	* @param function out
	*/
	function Runner(out){
		/**
		* Asserts a value is truthy.
		* @param value
		* @param string msg
		*/
		this.assertTruthy=function(value, msg){
			if(value){
				out({success:true});}
			else{
				out({
					success:false,
					expected:'Truthy value.',
					instead:value,
					message:msg||''});}};

		/**
		* Asserts a value is falsy.
		* @param mixed value
		* @param string msg (optional)
		*/
		this.assertFalsy=function(value, msg){
			if(!value){
				out({success:true});}
			else{
				out({
					success:false,
					expected:'Falsy value.',
					instead:value,
					message:msg||''});}};

		/**
		* Asserts wether an exception is thrown.
		* @param function fn Function which should throw an exception.
		* @param mixed exception Expected exception.
		* @param string msg (optional)
		*/
		this.assertException=function(fn, exception, msg){
			var excStr=objToStr.call(exception);
			try{
				fn();
				out({
					success:false,
					expected:'Exception '+excStr+'.',
					instead:'No exception.',
					message:msg||''});}
			catch(e){
				var realExcStr=objToStr.call(e);
				if (realExcStr==excStr){
					out({success:true});}
				else{
					out({
						success:false,
						expected:'Exception '+excStr+'.',
						instead:'Exception '+realExcStr+'.',
						message:msg||''});}}};

		/**
		* Asserts the euqalness of two arrays.
		* @param array expected
		* @param array real
		* @param string msg (optional)
		*/
		this.assertEqualArrays=function(expected, real, msg){
			try{
				if (expected.length!=real.length){
					out({
						success:false,
						expected:'Array with length '+expected.length+'.',
						instead:'Array with length '+real.length+'.',
						message:msg||''});}
				else{
					var success=true;
					for(var i=0,l=expected.length;i<l;i++){
						if (expected[i]!=real[i]){
							out({
								success:false,
								expected:'Item '+i+': '+expected[i],
								instead:'Item '+i+': '+real[i]});}}
					if (!success){
						out({success:false, message:msg||''});}
					else{
						out({success:true});}}}
			catch(e){
				out({
					success:false,
					message:e+''});}}

		/**
		* Asserts the equality (neither strictness nor identity) of two values.
		* @param expected
		* @param real
		* @param string msg (optional)
		*/
		this.assertEqual=function(expected, real, msg){
			if(expected==real){
				out({success:true});}
			else{
				out({
					success:false,
					expected:expected,
					instead:real,
					message:msg||''});}};}

	/**
	* Creates an acceptor function which can be used as a constructor argument
	* for Runner.
	*
	* The function distributes successful assertion results to the successes
	* argument and failures to the failures argument.
	*
	* @param array successes
	* @param array failures
	*/
	function outInjector(successes, failures){
		return function(result){
			(result.success?successes:failures).push(result);};}

	return {
		/**
		* Runs the tests.
		*
		* @param array tests
		* @param array Test results.
		*/
		run:function(tests){
			var results=[];
			for(var i=0,l=tests.length;i<l;i++){
				var test=tests[i];
				var assertSuccesses=[];
				var assertFailures=[];
				var testResult={description:test.description};
				test.test(new Runner(outInjector(assertSuccesses, assertFailures)));
				testResult.assertions=assertSuccesses.length+assertFailures.length;
				testResult.success=assertFailures.length==0;
				testResult.failures=assertFailures;
				results.push(testResult);
				}
			return results;}};
})();
