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

	// Global object.
	var global=this;

	// Some shortcuts.
	var concat=Array.prototype.concat;
	var slice=Array.prototype.slice;

	/**
	* Returns a random integer from min to max.
	* @param integer min
	* @param integer max
	* @return integer
	*/
	function random(min, max){
		return Math.floor(Math.random()*(max-min)+min);}

	/**
	* RegExp objects used by trim, ltrim and rtrim.
	*/
	var ws='\\uFEFF\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029';
	var trimRE=new RegExp('^['+ws+']*([^'+ws+']*)['+ws+']*$');
	var ltrimRE=new RegExp('^['+ws+']+');
	var rtrimRE=new RegExp('['+ws+']+$');

	/**
	* Trims all whitespace from both sides of the string.
	* Should work like ECMA-262 5th Ed.'s String.prototype.trim().
	* @param string s
	* @return string
	*/
	function trim(s){
		return s.replace(trimRE, '$1');}

	/**
	* Trims whitespace from the left side of the string.
	* @param string s
	* @return string
	*/
	function ltrim(s){
		return s.replace(ltrimRE, '');}

	/**
	* Trims whitespace from the right side of the string.
	* @param string s
	* @return string
	*/
	function rtrim(s){
		return s.replace(rtrimRE, '');}

	/**
	* Functification of &&.
	* Returns true, if both arguments are truthy, else false.
	* @param mixed left
	* @param mixed right
	* @return boolean
	*/
	function and(left, right){
		return !!(left && right);}

	/**
	* Functification of ||.
	* Returns true, if at least one argument is truthy, else false.
	* @param mixed left
	* @param mixed right
	* @return boolean
	*/
	function or(left, right){
		return !!(left ||right);}

	/**
	* XOR.
	* Returns true, if exactly one arguments is truthy,
	* and the other is falsy. Else, returns false.
	* @param mixed left
	* @param mixed right
	* @return boolean
	*/
	function xor(left, right){
		return (!left)!=(!right);}

	/**
	* NAND.
	* Returns true, if at least one argument is falsy, else false.
	* @param mixed left
	* @param mixed right
	* @return boolean
	*/
	function nand(left, right){
		return !(left && right);}

	/**
	* NOR
	* Returns true, if both arguments are false, else false.
	* @param mixed left
	* @param mixed right
	* @return boolean
	*/
	function nor(left, right){
		return !(left||right);}

	/**
	* Returns true, if both arguments have either a truthy or a falsy value.
	* If one is falsy and the other one is truthy, return false.
	* @param mixed left
	* @param mixed right
	* @return boolean
	*/
	function xnor(left, right){
		return (!left)==(!right);}

	/**
	* Returns all property names of an object.
	* If 'all' is truthy, inherited names will be included.
	*
	* @param object obj
	* @param mixed all (optional)
	*/
	function keys(obj, all){
		var result=[];
		for(var prop in obj){
			if (all||obj.hasOwnProperty(prop)){
				result.push(prop);}}
		return result;}

	/**
	* Returns all property values of an object.
	* If 'all' is truthy, inherited values will be included.
	*
	* @param object obj
	* @param mixed all (optional)
	*/
	function values(obj, all){
		var result=[];
		for(var prop in obj){
			if (all|obj.hasOwnProperty(prop)){
				result.push(obj[prop]);}}
		return result;}

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
	* Composes functions to form a new function.
	*
	* f is the innermost function and takes arbitrary arguments.
	* All other functions take exactly one argument. They are
	* applied in order, so the last function in the argument list
	* is the outermost one. The return value of that function is
	* returned.
	*
	* @param function f
	* @param function funcs*
	* @return function
	*/
	function compose(f /* wrapping functions */){
		var args=arguments;
		function result(){
			var ret=f.apply(null, arguments);
			for(var i=1,l=args.length;i<l;i++){
				ret=args[i](ret);}
			return ret;}
		return result;}

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
	* Creates a curried version of a function.
	*
	* @param function f
	* @param number n (optional)
	*/
	function curry(f, n){
		if (typeof n=='undefined'){
			n=f.length;}
		return function(){
			if (arguments.length>=n){
				return f.apply(null, arguments);}
			else{
				var args=arguments;
				return curry(function(){
					return f.apply(null, toArray(args).concat(toArray(arguments)));}, n-arguments.length);};};}

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
	* Creates a function which ignores all arguments
	* and returns always the same value.
	*
	* @param mixed value
	* @return function
	*/
	function constant(value){
		return function(){
			return value;};}

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
	* Checks wether a value is between given bounds.
	* @param number value
	* @param number min
	* @param number max
	*/
	function between(value, min, max){
		return value>=min && value<=max;}

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

	/**
	* Returns the first n elements. If n is not given, return the first element as an array.
	* @param array a
	* @param number|undefined n
	* @return array
	*/
	function head(a, n){
		return typeof n==='number'?Array.prototype.slice.call(a, 0, n):[a[0]];}

	/**
	* Returns the last n elements. If n is not given, return the last element as an array.
	* @param array a
	* @param number|undefined n
	* @return array
	*/
	function tail(a, n){
		return typeof n==='number'?Array.prototype.slice.call(a, -n):[a[a.length-1]];}

	/**
	* Creates a generator from a start value,
	* a function and an extractor.
	*
	* @param function f
	* @param array start
	* @param function extract (optional)
	* @return function
	*/
	function generator(f, start, extract){
		var value=start;
		extract=extract||id;
		return function(){
			value=f.apply(null, value);
			return extract(value);};}

	/**
	* Returns a property of an object or an element of an array.
	*
	* @param array|object obj
	* @param number|string name
	* @return mixed
	*/
	function item(obj, name){
		return obj[name];}

	/**
	* Returns properties of an object or elements of an array.
	*
	* @param array|object obj
	* @return array
	*/
	function items(obj /*, names */){
		var result=[];
		for(var i=1,l=arguments.length;i<l;i++){
			result.push(obj[arguments[i]]);}
		return result;}

	/**
	* Returns the median of the values.
	* @param array values
	* @param function comparator (optional) A comparator as accepted by Array.prototype.sort().
	* @return mixed
	* @throws TypeError if no values were given.
	*/
	function median(values, comparator){
		if (!values.length){
			throw new TypeError('Median can only be calculated with at least one value.');}
		if (!comparator){
			comparator=lt;}
		var temp=toArray(values);
		temp.sort(comparator);
		return temp[Math.floor(temp.length/2)];}

	/**
	* Returns the arithmetic mean of the values.
	* @param array values
	* @param function pAdd (optional)
	* @param function pDiv (optional)
	* @return mixed
	* @throws TypeError if no values were given.
	*/
	function arithmeticMean(values, pAdd, pDiv){
		pAdd=pAdd||add;
		pDiv=pDiv||divide;
		return pDiv(reduce(values, pAdd), values.length);}

	/**
	* Returns the geometric mean of the values.
	* @param array values
	* @param function pMul (optional)
	* @param function pExp (optional)
	* @return mixed
	* @throws TypeError if no values were given.
	*/
	function geometricMean(values, pMul, pExp){
		pMul=pMul||multiply;
		pExp=pExp||Math.pow;
		return pExp(reduce(values, pMul), 1/values.length);}

	/**
	* Returns the harmonic mean of the values.
	* @param array values
	* @param function pAdd (optional)
	* @param function pDiv (optional)
	* @param mixed unit (optional)
	* @param 
	*/
	function harmonicMean(values, pAdd, pDiv, unit){
		pAdd=pAdd||add;
		pDiv=pDiv||divide;
		unit=(arguments.length>=4?unit:1);
		var num;
		var recs=map(values, function(n, i){
			if (i==0){
				num=unit;}
			else{
				num=pAdd(num, unit);}
			return pDiv(unit, n);});
		return pDiv(num, reduce(recs, pAdd));}

	/**
	* Loops while a given condition is true.
	* Returns the result of the last action.
	*
	* @param function condition
	* @param function action
	* @param object context (optional)
	* @return mixed
	*/
	function loop(condition, action, context){
		var result;
		while(condition.call(context)){
			result=action.call(context);}
		return result;}

	/**
	* Loops until a given condition is true.
	* Returns the result of the last action.
	*
	* @param function condition
	* @param function action
	* @param object context (optional)
	* @return mixed
	*/
	function until(condition, action, context){
		var result;
		while(!condition.call(context)){
			result=action.call(context);}
		return result;}

	/**
	* Returns true, if the number is odd, else false.
	*
	* @param number n
	* @return boolean
	*/
	function odd(n){
		return !!(n%2);}

	/**
	* Returns true, if the number is even, else false.
	*
	* @param number n
	* @return boolean
	*/
	function even(n){
		return !(n%2);}

	/**
	* Invokes f on every property of obj.
	*
	* @param object obj
	* @param function f
	* @param object context (optional)
	*/
	function forEachProperty(obj, f, context){
		for (var prop in obj){
			if (obj.hasOwnProperty(prop)){
				f.call(context, obj[prop], prop, obj);}}}

	/**
	* Invokes f on every property of obj and returns the return values
	* as an object.
	*
	* @param object obj
	* @param function f
	* @param object context (optional)
	* @return object
	*/
	function mapProperties(obj, f, context){
		var result={};
		for (var prop in obj){
			if (obj.hasOwnProperty(prop)){
				result[prop]=f.call(context, obj[prop], prop, obj);}}
		return result;}

	/**
	* Returns a filtered version of an object by only copying those
	* properties, where f returns a truthy value.
	*
	* @param object obj
	* @param function f
	* @param object context
	* @return object
	*/
	function filterProperties(obj, f, context){
		var result={};
		for (var prop in obj){
			if (obj.hasOwnProperty(prop)){
				if (f.call(context, obj[prop], prop, obj)){
					result[prop]=obj[prop];}}}
		return result;}

	/**
	* Checks if for every property a given condition holds.
	*
	* @param object obj
	* @param function f
	* @param object context (optional)
	* @return boolean
	*/
	function everyProperty(obj, f, context){
		for (var prop in obj){
			if (obj.hasOwnProperty(prop)){
				if (!f.call(context, obj[prop], prop, obj)){
					return false;}}}
		return true;}

	/**
	* Checks if some properties hold a given condition.
	*
	* @param object obj
	* @param function f
	* @param object context (optional)
	* @return boolean
	*/
	function someProperty(obj, f, context){
		for (var prop in obj){
			if (obj.hasOwnProperty(prop)){
				if (f.call(context, obj[prop], prop, obj)){
					return true;}}}
		return false;}

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
	lib.and=and;
	lib.arithmeticMean=arithmeticMean;
	lib.between=between;
	lib.bind=bind;
	lib.compose=compose;
	lib.constant=constant;
	lib.curry=curry;
	lib.divide=divide;
	lib.even=even;
	lib.every=every;
	lib.everyProperty=everyProperty;
	lib.filter=filter;
	lib.filterProperties=filterProperties;
	lib.first=first;
	lib.forEach=forEach;
	lib.forEachProperty=forEachProperty;
	lib.generator=generator;
	lib.geometricMean=geometricMean;
	lib.gt=gt;
	lib.gte=gte;
	lib.harmonicMean=harmonicMean;
	lib.head=head;
	lib.hold=hold;
	lib.id=id;
	lib.ifElse=ifElse;
	lib.ifSgn=ifSgn;
	lib.indexOf=indexOf;
	lib.inject=inject;
	lib.item=item;
	lib.items=items;
	lib.keys=keys;
	lib.last=last;
	lib.lastIndexOf=lastIndexOf;
	lib.loop=loop;
	lib.lt=lt;
	lib.lte=lte;
	lib.ltrim=ltrim;
	lib.map=map;
	lib.mapProperties=mapProperties;
	lib.median=median;
	lib.merge=merge;
	lib.multiply=multiply;
	lib.negate=negate;
	lib.nand=nand;
	lib.noOp=noOp;
	lib.nor=nor;
	lib.not=not;
	lib.odd=odd;
	lib.opIfElse=opIfElse;
	lib.opIfSgn=opIfSgn;
	lib.or=or;
	lib.product=product;
	lib.random=random;
	lib.reciprocal=reciprocal;
	lib.reduce=reduce;
	lib.reduceRight=reduceRight;
	lib.rtrim=rtrim;
	lib.some=some;
	lib.someProperty=someProperty;
	lib.subtract=subtract;
	lib.sum=sum;
	lib.tail=tail;
	lib.trim=trim;
	lib.until=until;
	lib.values=values;
	lib.xnor=xnor;
	lib.xor=xor;

	// Prototypal extensions (optional)
	var protos={
		'Number':[
			'add',
			'multiply',
			'subtract',
			'divide',
			'reciprocal',
			'gt',
			'gte',
			'lt',
			'lte',
			'ifSgn',
			'opIfSgn',
			'negate',
			'odd',
			'even'],
		'String':['trim','ltrim','rtrim'],
		'Array':[
			'indexOf',
			'lastIndexOf',
			'forEach',
			'map',
			'every',
			'some',
			'filter',
			'reduce',
			'reduceRight',
			'first',
			'last',
			'head',
			'tail',
			'item',
			'items'],
		'Boolean':[
			'and',
			'or',
			'xor',
			'nand',
			'nor',
			'xnor',
			'not',
			'opIfElse',
			'ifElse'],
		'Function':['bind','compose','curry','generator','hold','loop','until']};

	var fromMathToNumber=[
		'abs',
		'acos',
		'asin',
		'atan',
		'ceil',
		'cos',
		'exp',
		'floor',
		'log',
		'pow',
		'round',
		'sin',
		'sqrt',
		'tan'];

	var otherProtos={
		'Function':{
			'forEach':{
				pos:1},
			'map':{
				pos:1},
			'filter':{
				pos:1},
			'every':{
				pos:1},
			'some':{
				pos:1},
			'reduce':{
				pos:1},
			'reduceRight':{
				pos:1}}
	};

	/**
	* Adds a function as a method to an object.
	*
	* If obj already has a property with that name and
	* options.override is not true, the property will not
	* be overwritten. If no property is present or
	* options.override was set, the new property is a
	* method.
	*
	* If options.thisPosition is null, the function will
	* be just set as a method. If options.thisPosition is
	* a number or not set, which means, it defaults to 0,
	* this will be the position of the object itself in the
	* argument list.
	*
	* @param object obj
	* @param string name
	* @param function func
	* @param options (optional)
	*/
	function addMethod(obj, name, func, options){
		options=options||{};
		var thisPos=options.hasOwnProperty('thisPosition')?options.thisPosition:0;
		if (!obj.hasOwnProperty(name) || options.override){
			if (typeof thisPos=='number'){
				obj[name]=function(){
					var args=toArray(arguments);
					return func.apply(this, concat.call(slice.call(args, 0, thisPos), [this], slice.call(args, thisPos)));};}
			else{
				obj[name]=func;}
			return true;}
		return false;}

	lib.addMethod=addMethod;

	/**
	* Activate prototypal extensions.
	*/
	lib.activatePrototypeExtensions=function(){
		// Add methods for lib functions.
		for(var prop in protos){
			if (protos.hasOwnProperty(prop)){
				var proto=global[prop].prototype;
				var meths=protos[prop];
				forEach(meths, function(meth, i, arr){
					if (!proto.hasOwnProperty(meth)){
						proto[meth]=function(){
							return lib[meth].apply(null, Array.prototype.concat.call([this], toArray(arguments)));};}});}}

		// Add Math object number functions.
		numProto=Number.prototype;
		forEach(fromMathToNumber, function(name, i, arr){
			if (!numProto.hasOwnProperty(name)){
				numProto[name]=function(){
					return Math[name].apply(null, Array.prototype.concat.call([this], toArray(arguments)));};}});

		for(var prop in otherProtos){
			if (otherProtos.hasOwnProperty(prop)){
				var proto=global[prop].prototype;
				var meths=otherProtos[prop];
				for(var mName in meths){
					if (meths.hasOwnProperty(mName)){
						var meth=meths[mName];
						var tName=meth.name||mName;
						var config={override:false, thisPosition:meth.pos};
						addMethod(proto, tName, lib[mName], config);}}}}}

	return lib;})();
