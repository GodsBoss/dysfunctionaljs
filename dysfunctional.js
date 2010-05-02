/**
* The dysfunctional JS library.
*
* Updates and documentation can be found here: http://dysfunctionaljs.org/
*
* This library is free software. Get your copy under the terms of the
* GNU GPL v3. A copy of this license (gpl.txt) should have been provided.
* If not, you can find one at: http://dysfunctionaljs.org/gpl.txt
*/
var dysfunctional=(function(){
	var lib={};

	/**
	* Converts an object, usually an arguments object, to a real array.
	*
	* @param object obj
	* @return array
	*/
	function toArray(obj){
		var result=[];
		for(var i=0,max=obj.length;i<max;i++){
			result[i]=obj[i];}
		return result;}

	/**
	* Binds a function f to an object o.
	*
	* Example:
	* function getX(){ return this.x; }
	* var f=bind(getX, {x:50});
	* var x=f(); -> 50
	*
	* @param Function f
	* @param Object o
	* @return Function
	*/
	function bind(f, o){
		return function(/* args */){
			return f.apply(o, arguments);};}

	/**
	* Holds a function together with arguments for later invocation.
	* The resulting function calls the wrapped function with the same context.
	*
	* Example:
	* var laterFoo=hold(function(f){return f*this.x;}, 5);
	* var obj={x:10, bar:laterFoo};
	* var result=obj.laterFoo(); // 50
	*
	* @param function f
	* @return function
	*/
	function hold(f /* arguments */){
		var args=toArray(arguments).slice(1);
		return function(){
			return f.apply(this, args);};}

	/**
	* Merges several objects into one.
	* When a property name exists on more than one object,
	* the last value will be used.
	* @return object
	*/
	function merge(/* objects */){
		var result={};
		for (var i=0,l=arguments.length;i<l;i++){
			var obj=arguments[i];
			for (var prop in obj){
				if (obj.hasOwnProperty(prop)){
					result[prop]=obj[prop];}}}
		return result;}

	/**
	* Injects properties of objects into a target object.
	* @param object target
	* @return object
	*/
	function inject(target/*, sources*/){
		for (var i=1,l=arguments.length;i<l;i++){
			var obj=arguments[i];
			for (var prop in arguments[i]){
				if (obj.hasOwnProperty(prop)){
					target[prop]=obj[prop];}}}
		return target;}

	/**
	* Does nothing, returns nothing.
	*/
	function noOp(){};

	/**
	* Identity function. Always returns its first argument.
	* @param mixed value
	* @return mixed
	*/
	function id(value){
		return value;}

	/**
	* Returns a value according to a given value.
	*
	* If b coerces to true, ifValue is returned,
	* else elseValue.
	*
	* @param boolean b
	* @param mixed ifValue
	* @param mixed elseValue
	* @return mixed
	*/
	function opIfElse(b, ifValue, elseValue){
		if(b){
			return ifValue;}
		else{
			return elseValue;}}

	/**
	* Executes a function according to a given value.
	*
	* If b coerces to true, fIf is run, else fElse.
	* In both cases the function is run in the given context.
	* The function's return value is the the return value
	* of the called function, either fIf or fElse.
	*
	* @param boolean b
	* @param function fIf
	* @param function fElse
	* @param object context (optional)
	* @return undefined|mixed
	*/
	function ifElse(b, fIf, fElse, context){
		if(b){
			return fIf.call(context);}
		else{
			return fElse.call(context);}}

	/**
	* Not operator.
	*
	* @param mixed b
	* @return boolean
	*/
	function not(b){
		return !b;}

	/**
	* Checks wether left is greater than right.
	*
	* @param number left
	* @param number right
	* @return boolean
	*/
	function gt(left, right){
		return left > right;}

	/**
	* Checks wether left is greater than right or equal.
	*
	* @param number left
	* @param number right
	* @return boolean
	*/
	function gte(left, right){
		return left >= right;}

	/**
	* Checks wether left is lesser than right.
	*
	* @param number left
	* @param number right
	* @return boolean
	*/
	function lt(left, right){
		return left < right;}

	/**
	* Checks wether left is lesser than right or equal.
	*
	* @param number left
	* @param number right
	* @return boolean
	*/
	function lte(left, right){
		return left <= right;}

	/**
	* Adds two numbers and returns the result.
	*
	* @param Number a
	* @param Number b
	* @return Number
	*/
	function add(a, b){
		return a+b;}

	/**
	* Subtracts b from a.
	* @param number a
	* @param number b
	* @return number
	*/
	function subtract(a, b){
		return a-b;}

	/**
	* Multiplies two numbers and returns the result.
	*
	* @param Number a
	* @param Number b
	* @return Number
	*/
	function multiply(a, b){
		return a*b;}

	/**
	* Divides a by b.
	* @param number a
	* @param number b
	* @return number
	*/
	function divide(a, b){
		return a/b;}

	/**
	* Negates a number.
	*
	* @param Number x
	* @return Number
	*/
	function negate(x){
		return -x;}

	/**
	* Calculates the sum.
	*
	* @return Number
	*/
	function sum(/* numbers */){
		var result=0;
		for(var i=0,l=arguments.length;i<l;i++){
			result+=arguments[i];}
		return result;}

	/**
	* Multiplies numbers.
	*
	* @return Number
	*/
	function product(/* numbers */){
		var result=1;
		for(var i=0,l=arguments.length;i<l;i++){
			result*=arguments[i];}
		return result;}

	/**
	* Returns the return value of a function call, which depends
	* on the signum of a number.
	*
	* @param number x
	* @param function negF
	* @param function zeroF
	* @param function posF
	* @param mixed context (optional)
	* @return mixed
	*/
	function ifSgn(x, negF, zeroF, posF, context){
		if(x<0){
			return negF.call(context);}
		if(x==0){
			return zeroF.call(context);}
		if(x>0){
			return posF.call(context);}}

	/**
	* Returns a value according to the signum of a number.
	*
	* @param number x
	* @param mixed negV
	* @param mixed zeroV
	* @param mixed posV
	* @return mixed
	*/
	function opIfSgn(x, negV, zeroV, posV){
		if (x<0){
			return negV;}
		if (x==0){
			return zeroV;}
		if (x>0){
			return posV;}}

	/**
	* Returns the reciprocal of a number.
	* @param number x
	* @return number
	*/
	function reciprocal(x){
		return 1/x;}

	/**
	* Returns the first element of an array.
	*
	* Throws a TypeError, if the array is empty.
	*
	* @param array a
	* @return mixed
	* @throws TypeError
	*/
	function first(a){
		if(a.length){
			return a[0];}
		else{
			throw new TypeError('Cannot extract first element of an empty array.');}}

	/**
	* Returns the last element of an array.
	*
	* Throws a TypeError, if the array is empty.
	*
	* @param array a
	* @return mixed
	* @throws TypeError
	*/
	function last(a){
		if(a.length){
			return a[a.length-1];}
		else{
			throw new TypeError('Cannot extract last element of an empty array.');}}

	// Implementation of functional variants of some methods found in
	// ECMA-262 5th Ed., but not ECMA-262 3rd Ed.

	/**
	* Returns the index of the first appearance of value within arr,
	* or -1, if that value does not exist within the array.
	* If startIndex is not given, 0 is assumed.
	* @param array arr
	* @param mixed value
	* @param integer startIndex (optional)
	* @return integer
	*/
	function indexOf(arr, value, startIndex){
		for(var i=startIndex||0,max=arr.length;i<max;i++){
			if (arr[i]===value){
				return i;}}
		return -1;}

	/**
	* Returns the index of the last appearance of value within arr,
	* or -1, if that value does not exist within the array.
	* If startIndex is not given, arr.length-1 is assumed.
	* @param array arr
	* @param mixed value
	* @param integer startIndex (optional)
	* @return integer
	*/
	function lastIndexOf(arr, value, startIndex){
		for(var i=typeof startIndex=='number'?startIndex:arr.length,l=arr.length;i;i--){
			if (arr[i]==value){
				return i;}}
		return -1;}

	/**
	* Calls f for every element in a with the given context.
	* Function arguments for f are the value of the element, the element's index
	* and the array object.
	*
	* @param array a
	* @param function f
	* @param mixed context (optional)
	*/
	function forEach(a, f, context){
		for(var i=0,l=a.length;i<l;i++){
			f.call(context, a[i], i, a);}}

	/**
	* Creates a new array by applying f to all elements of a in the given context.
	* Function arguments for f are the value of the element, the element's index
	* and the array object.
	*
	* @param array a
	* @param function f
	* @param mixed context (optional)
	* @return array
	*/
	function map(a, f, context){
		var result=[];
		for(var i=0,l=a.length;i<l;i++){
			result.push(f.call(context, a[i], i, a));}
		return result;}

	/**
	* Creates a new array by applying f to all elements of a in the given context,
	* coercing the result value to boolean and filling the resulting array only with
	* those elements for which the function returned a truthy value.
	*
	* @param array a
	* @param function f
	* @param mixed context (optional)
	* @return array
	*/
	function filter(a, f, context){
		var result=[];
		for(var i=0,l=a.length;i<l;i++){
			if(f.call(context, a[i], i, a)){
				result.push(a[i]);}}
		return result;}

	/**
	* Returns true, if the return value of a call to f in the given context is true
	* for all elements of a. Execution ends immediately for the first element,
	* where the return value is falsy.
	*
	* Returns true for an empty array.
	*
	* @param array a
	* @param function f
	* @param mixed context (optional)
	* @return boolean
	*/
	function every(a, f, context){
		for(var i=0,l=a.length;i<l;i++){
			if(!f.call(context, a[i], i, a)){
				return false;}}
		return true;}

	/**
	* Returns true, if the return value of at least one call to f in the given context
	* is true. Execution ends immediately for the first element, for which the return
	* value is true.
	*
	* Returns false for an empty array.
	*
	* @param array a
	* @param function f
	* @param mixed context (optional)
	* @return boolean
	*/
	function some(a, f, context){
		for(var i=0,l=a.length;i<l;i++){
			if(f.call(context, a[i], i, a)){
				return true;}}
		return false;}

	/**
	* Reduces an array from start to end by repeatedly applying a reducing function.
	*
	* The function is called with four arguments: The previous value, the current value,
	* the current index and a.
	*
	* If no start value is given and a is empty, throws a type error. If no start value
	* is given, but a is not empty, the start value is the first element of a.
	*
	* @param array a
	* @param function f
	* @param mixed startValue (optional)
	* @return mixed
	* @throws TypeError
	*/
	function reduce(a, f, startValue){
		if(!a.length && arguments.length<3){
			throw new TypeError('Cannot reduce empty array without start value.');}
		var i, v;
		if(arguments.length<3){
			i=1;
			v=a[0];}
		else{
			i=0;
			v=startValue;}
		for(var l=a.length;i<l;i++){
			v=f(v, a[i], i, a);}
		return v;}

	/**
	* Reduces an array from end to start by repeatedly applying a reducing function.
	*
	* The function is called with four arguments: The previous value, the current value,
	* the current index and a.
	*
	* If no start value is given and a is empty, throws a type error. If no start value
	* is given, but a is not empty, the start value is the last element of a.
	*
	* @param array a
	* @param function f
	* @param mixed startValue (optional)
	* @return mixed
	* @throws TypeError
	*/
	function reduceRight(a, f, startValue){
		if(!a.length && arguments.length<3){
			throw new TypeError('Cannot reduce empty array without start value.');}
		var i,v;
		if(arguments.length<3){
			i=a.length-2;
			v=a[a.length-1];}
		else{
			i=a.length-1;
			v=startValue;}
		for(;i>=0;i--){
			v=f(v, a[i], i, a);}
		return v;}

	// Public API
	lib.add=add;
	lib.bind=bind;
	lib.divide=divide;
	lib.every=every;
	lib.filter=filter;
	lib.first=first;
	lib.forEach=forEach;
	lib.gt=gt;
	lib.gte=gte;
	lib.hold=hold;
	lib.id=id;
	lib.ifElse=ifElse;
	lib.ifSgn=ifSgn;
	lib.indexOf=indexOf;
	lib.inject=inject;
	lib.last=last;
	lib.lastIndexOf=lastIndexOf;
	lib.lt=lt;
	lib.lte=lte;
	lib.map=map;
	lib.merge=merge;
	lib.multiply=multiply;
	lib.negate=negate;
	lib.noOp=noOp;
	lib.not=not;
	lib.opIfElse=opIfElse;
	lib.opIfSgn=opIfSgn;
	lib.product=product;
	lib.reciprocal=reciprocal;
	lib.reduce=reduce;
	lib.reduceRight=reduceRight;
	lib.some=some;
	lib.subtract=subtract;
	lib.sum=sum;

	return lib;})();
