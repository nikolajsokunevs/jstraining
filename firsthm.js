var user = { 
    id: 7,
    name: {
        firstName: "Nikolay",
        lastName: "Okunev"
    },
    email: [
        "first@gmail.com",
        "second@gmail.com"
    ],
    additional: {
        x: 6,
        y: 8,
        deep: {
            x: "valuez"
        }
    }
}

function println(user) {
    document.getElementById("inputfield").textContent = user;
}

function isObject(val) {
    return val instanceof Object;
}

function isArray(object) {
    if (object.constructor === Array) return true;
    else return false;
}

function isNumeric(num){
    return !isNaN(num)
}

println(jsonToString(user));
//println(JSON.stringify(user));

function jsonToString(yourJson) {
    var result = "{";
    result = cicle(result, yourJson);
    result = result + "}";
    return result;
}


function cicle(result, node) {
    if (isObject(node)) {

        if (isArray(node)) {
            result = result + "[" + arrayToNiceString(node) + "]";
        } else {

            var childNodesList = getChildNodesAsList(node);
            var counter = 0;

            while (counter < childNodesList.length) {
                var newJson = node[childNodesList[counter]];
                if (counter>0){
                    result = result +",";
                }
                result = result + "\"" + childNodesList[counter] + "\":";
                if (isObject(newJson) && !isArray(newJson)) {
                    result = result + "{"
                }
                result = cicle(result, newJson);
                counter++;
                if (isObject(newJson) && !isArray(newJson)) {
                    result = result + "}";
                }
            }
        }
    } else {
        if (isNumeric(node)){
             result = result + node;
        }else{
             result = result + "\"" +node+"\"";
        }
    }
    return result;
}

function arrayToNiceString(arrayBefore){
    var result="";
    var counter=0;
    while(counter<arrayBefore.length){
        if (counter>0){
            result=result+",";
        }
        result=result+"\""+arrayBefore[counter]+"\"";
        counter++;
    }
    return result;
}

function getChildNodesAsList(yourJson) {
    return Object.keys(yourJson);
}