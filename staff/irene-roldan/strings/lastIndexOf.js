function lastIndexOf(string, searchString) {
    debugger
    var searchStringIndex = 0;
    var numOks = 0;
    var element = -1;
    
    for (var i = 0; i < string.length; i++) {

        if (string[i] === searchString[searchStringIndex]) {
            numOks++
            searchStringIndex++
        }else {
            numOks = 0
            searchStringIndex = 0
            
            if (string[i] === searchString[searchStringIndex]) {
            numOks++
            searchStringIndex++
            }
        }
        
        if (numOks === searchString.length) {
            element =  i - searchString.length + 1 
            numOks = 0
            searchStringIndex = 0
            
        }

        

    }
    if (element === -1) {
        return -1;
        
    }else{
        return element;
    }

}

var s = 'hola mundo';

var index = lastIndexOf(s, 'o');
//var index = lastIndexOf(s, 'ol');

console.log(index)