function trim(string) {
    var firstLetter = false;
    var element = ""
    
    for (let i = 0; i < string.length; i++) {
        if ((string[i] === " " && firstLetter === false) || (string[i] === "\n") || (string[i] === "\s") || (string[i] === "\r")){ 
            
        }else {
            element = element + string[i]
            firstLetter = true;
        }
    }
    firstLetter = false;
    var otroElement = "";

        for (let i = element.length-1; i >= 0; i--) {
        if (element[i] === " " && firstLetter === false){             
        }else {
            otroElement = element[i] + otroElement
            firstLetter = true;
        }
    }
    return otroElement
}
//var s = '  hola mundo   ';
var s = ' \n\s\r hola mundo \n\s\r '
var result = trim(s);
console.log(result);

