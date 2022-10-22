function numWord(value, words) {  
	value = Math.abs(value) % 100; 
	var num = value % 10;

	if(value > 10 && value < 20) {
        return words[2];
    } 

	if(num > 1 && num < 5) {
        return words[1];
    }

	if(num == 1) {
        return words[0];
    }

	return words[2];
}

function convertH2M(timeInHour){
    var timeParts = timeInHour.split(":");
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
}

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

export {numWord, convertH2M, removeChilds}