var rad = Math.PI / 180;
var OFFSET = 640;
var MAX_VAL = 200;
var CIRCLE = 360;

function getLastValues(plant, number){
	var length = waterlog.length;
	var lastValues = {labels:[], values:[]};
	
	for(var i = number; i > 0; i--){
		var index = length - i;
		
		if(index > 0){
			lastValues.labels.push(waterlog[index].time);
			lastValues.values.push(getDegreeFromSensor(waterlog[index].value));
		}
	}
	return lastValues;
}

function getLastHourValues(plant, number){
	var tenMinutes = getLastValues(plant, number * 6);
	var length = tenMinutes.values.length;
	var lastValues = {labels:[], values:[]};
	
	for(var i = number; i > 0; i--){
		var index = length - i;
		
		if(index > 0){
			lastValues.labels.push(waterlog[index].time);
			lastValues.values.push(getDegreeFromSensor(waterlog[index].value));
		}
	}
	return lastValues;
}

function getDegreeFromSensor(value){
	var newVal = value - OFFSET;
	if(newVal < 0){newVal = 0;}
	if(newVal > MAX_VAL){newVal = MAX_VAL;}
	newVal = MAX_VAL - newVal;
	newVal = newVal * CIRCLE / MAX_VAL;
	return newVal;
};

function getDegreeFromPercent(value){
	var newVal = value;
	if(newVal < 0){newVal = 0;}
	if(newVal > 100){newVal = 100;}
	newVal = newVal * CIRCLE / 100;
	return newVal;
};

function getPercentFromSensor(value){
	var newVal = getDegreeFromSensor(value);
	newVal = newVal / 3.6;
	return Math.round(newVal, 0);
};

function getSmoothed(values, cycles){
	var newValues = values;
	for(var cy = 1; cy <= cycles; cy++){
		for (var i = 1; i < newValues.length -1; i++) {
			var b = newValues[i-1];//before
			var c = newValues[i];//current
			var a = newValues[i+1];//after
			
			if(!(c > b && c < a) && !(c < b && c > a)){// c liegt nicht zwischen b und a
				newValues[i] = ((a - b) / 2 ) + (b * 1);
			}
		}		
	}
	return newValues;
}

function getSquare(values, number){
	var newValues = [];
	var pos = 1;
	var temp = 0;
	
	for(var i = 0; i < values.length; i++){
		if(pos == number){
			newValues.push(temp + values[i]);
			temp = 0;
			pos = 1;
		} else {
			temp += values[i];
			pos++;
		}
	}
	return newValues;
}