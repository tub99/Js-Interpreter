//Lexer- responsible for breaking down lexerInput string to tokenArray
function LexicalAnalyzer(lexerInput){
  this.lexAnalyze = function () {
    var tokenArray = [];
    var checkIfOperator = function (c) { 
      return /[+\-*\/\^%=(),]/.test(c);
    },
    checkIfDigit = function (c) { 
      return /[0-9]/.test(c); 
    },
    checkIfSpace = function (c) { 
      return /\s/.test(c); 
    },
    checkIfIdentifier = function (c) { 
      return typeof c === "string" && !checkIfOperator(c) && !checkIfDigit(c) && !checkIfSpace(c); 
    };
    var tokenArray = [], c, i = 0;
    var moveForward = function () { 
      return c = lexerInput[++i];
    };
    var insertToken = function (type, value) {
      tokenArray.push({
        type: type,
        value: value
      });
    };
    while (i < lexerInput.length) {
      c = lexerInput[i];
      if (checkIfSpace(c))
        moveForward();
      else if (checkIfOperator(c)) {
        insertToken(c);
        moveForward();
      }
      if (checkIfSpace(c)) moveForward();
      else if (checkIfOperator(c)) {
        insertToken(c);
        moveForward();
      }
      else if (checkIfDigit(c)) {
        var num = c;
        while (checkIfDigit(moveForward())) 
          num += c;

        if (c === ".") {
            do num += c; while (checkIfDigit(moveForward()));
        }
        num = parseFloat(num);
        if (!isFinite(num)) 
         document.getElementById('displayBar').innerHTML+="Error: Entered number is too big. \n";
        insertToken("number", num);
      }
      else if (checkIfIdentifier(c)) {
          var idn = c;
          while (checkIfIdentifier(moveForward())) idn += c;
          insertToken("identifier", idn);
      }
      else document.getElementById('displayBar').innerHTML+="Error: Token '"+c+"' cannot be recognized. \n"; 
    }
    insertToken("(end)");
    return tokenArray;
  };
}