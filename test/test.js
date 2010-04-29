var TestFramework={
	asserts:{
		/**
		* Checks if a value is true.
		*/
		assertTrue:function(val){
			return val===true;},

		/**
		* Checks if a value is false.
		*/
		assertFalse:function(val){
			return val===false;},

		/**
		* Checks if a value is null.
		*/
		assertNull:function(val){
			return val===null;},

		/**
		* Checks if a value is undefined.
		*/
		assertUndefined:function(val){
			return typeof val==='undefined';},

		/**
		* Checks if a value is not null.
		*/
		assertNotNull:function(val){
			return val!==null;},

		/**
		* Checks if a value is NaN.
		*/
		assertNaN:function(val){
			return isNaN(val);},

		/**
		* Checks if a value is not NaN.
		*/
		assertNotNaN:function(val){
			return !isNaN(val);},

		/**
		* Checks if a value coerces to true.
		*/
		assertTruthy:function(val){
			return !!val;},

		/**
		* Checks if a value coerces to false.
		*/
		assertFalsy:function(val){
			return !val;},

		/**
		* Checks if two values are equal.
		*/
		assertEqual:function(val1, val2){
			return val1==val2;},

		/**
		* Checks if two values are identical.
		*/
		assertIdentical:function(val1, val2){
			return val1===val2;},

		/**
		* Checks if the property of a given object is equal to a given value.
		*/
		assertPropertyEquals:function(obj, prop, value){
			return typeof obj!=='undefined'&&obj!==null&&obj[prop]==value;},

		/**
		* Checks if a property exists.
		*/
		assertPropertyExists:function(obj, prop){
			return obj.hasOwnProperty(prop);},

		/**
		* Checks if value is a boolean.
		*/
		assertBoolean:function(val){
			return typeof val==='boolean';},

		/**
		* Checks if value is a string.
		*/
		assertString:function(val){
			return typeof val==='string';},

		/**
		* Checks if value is a real object, e.g. not null and not an array.
		*/
		assertObject:function(val){
			return typeof val==='object'&&val!==null&&Object.prototype.toString.apply(val)!=='[object Array]';},

		/**
		* Checks if a value is an array. Uses the miller device.
		*/
		assertArray:function(val){
			return typeof val!=='undefined'&&val!==null&&Object.prototype.toString.apply(val)==='[object Array]';},

		/**
		* Checks if a value is a number, either finite, infinite or NaN.
		*/
		assertNumber:function(val){
			return typeof val==='number';},

		/**
		* Checks if a value is finite. Does not only apply to numbers.
		*/
		assertFinite:function(val){
			return isFinite(val);},

		/**
		* Checks if a value is not finite. Does not only apply to numbers.
		*/
		assertNotFinite:function(val){
			return !isFinite(val);},

		/**
		* Checks if a value is positive infinity.
		*/
		assertPositiveInfinity:function(val){
			return val===Infinity;},

		/**
		* Checks if a value is negative infinity.
		*/
		assertNegativeInfinity:function(val){
			return val===-Infinity;}},

	/**
	* Test runner class.
	*/
	TestRunner:function(asserts, output){
		var numberOfTests=0;
		var fails=0;

		for(var assert in asserts){
			this[assert]=(function(assertF){
				return function(/* args */){
					if(!assertF.apply(null, arguments)){
						throw new Error();}};})(asserts[assert]);}

		function runTest(test, fw){
			numberOfTests++;
			try{
				test.test(fw);
				return{
					success:true,
					description:test.description};}
			catch(e){
				fails++;
				return{
					success:false,
					description:test.description};}}

		this.run=function(tests){
			for(var i=0,l=tests.length;i<l;i++){
				output(runTest(tests[i], this));}};

		this.reset=function(){
			numberOfTests=0;
			fails=0;};

		this.summary=function(){
			return{
				tests:numberOfTests,
				failures:fails,
				successes:numberOfTests-fails};};}};