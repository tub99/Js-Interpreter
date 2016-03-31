//Calculator gives us the ultimate result from the parse tree
function Calculator(parseTree) {

	this.calculate = function () {

		var variables = {
	    pi: Math.PI,
	    e: Math.E
	};	
	
  	var opt = {
	    "+": function(a, b) {
	        	return a + b;
    	},
	    "-": function(a, b) {
	        if (typeof b === "undefined") return -a;
	        	return a - b;
	    },
	    "*": function(a, b) {
	        return a * b;
	    },
	    "/": function(a, b) {
	        return a / b;
	    },
	    "%": function(a, b) {
	        return a % b;
	    },
	    "^": function(a, b) {
	        return Math.pow(a, b);
	    }
	};

	var args = {};

	var functions = {
	      
	    round: Math.round,
	    ceil: Math.ceil,
	    floor: Math.floor,
	    log: Math.log,
	    exp: Math.exp,
	    sqrt: Math.sqrt,
	    sin: Math.sin,
	    cos: Math.cos,
	    tan: Math.cos,
	    max: Math.max,
	    min: Math.min,
	    random: Math.random
	};
	

	var paseElement = function (el) {
		  if (el.type === "number") return el.value;
		  else if (opt[el.type]) {
		    if (el.left) return opt[el.type](paseElement(el.left), paseElement(el.right));
		    return opt[el.type](paseElement(el.right));
		  }
		  else if (el.type === "identifier") {
		    var value = args.hasOwnProperty(el.value) ? args[el.value] : variables[el.value];
		    if (typeof value === "undefined") document.getElementById('displayBar').innerHTML=document.getElementById('displayBar').innerHTML+ el.value + " is undefined.";
		    return value;
		  }
		  else if (el.type === "assign") {
		    variables[el.name] = paseElement(el.value);
		  }
		  else if (el.type === "call") {
		    for (var i = 0; i < el.args.length; i++) el.args[i] = paseElement(el.args[i]);
		    return functions[el.name].apply(null, el.args);
		  }
		  else if (el.type === "function") {
		    functions[el.name] = function () {
		      for (var i = 0; i < el.args.length; i++) {
		        args[el.args[i].value] = arguments[i];
		      }
		      var ret = paseElement(el.value);
		      args = {};
		      return ret;
		    };
		  }
	};
	
  var result = "";
  for (var i = 0; i < parseTree.length; i++) {
    var value = paseElement(parseTree[i]);
    if (typeof value !== "undefined") result += value + "\n";
  }
  return result;
};

}