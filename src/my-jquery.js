var jQuery = function(selector){
	if(this instanceof jQuery){ //this is determined when a function is being constructed 
		this.elements = document.querySelectorAll(selector);	
	}
	else{ //this is window
		return new jQuery(selector); 
	}
	
};

jQuery.prototype.html = function(){
    if (arguments.length == 0) {
        for (var i = 0; i < this.elements.length; i++) {
            return this.elements[i].innerHTML; 
        }
    } 
    else { 
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].innerHTML = arguments[0];
        }
    }
    return this;

};

jQuery.prototype.css = function(){
	//arguments //all the parameters passed into the function
	var property = arguments[0];
	
	if(arguments.length == 2){
	var value = arguments[1];

		for(var i=0;i <this.elements.length;i++){
			this.elements[i].style[property] = value;
		}

	}
	else{
		//create css object
		for(var i = 0; i < this.elements.length; i++){
			for(var key in property){
				this.elements[i].style[key] = property[key];
			}
		}		
	}
	return this; //returns undefined by default 


};



jQuery.prototype.attr = function(){
	var property = arguments[0];
	


    if (arguments.length == 1) { 
        return this.elements[0].getAttribute(property);
    } 
    else {
    var value = arguments[1];	
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].setAttribute(property,value);
        }
    }
    return this;
	
}

jQuery.each = function(event, callback){
  if(event instanceof Array){

      for (var i = 0; i < event.length; i++) {
        callback(i, event[i]);  
    }
  }else if (event.constructor === Object) {   
      for(var property in event){        
        if(event.hasOwnProperty(property)){
          callback(property, event[property]);
        }
      }
  }
}

jQuery.prototype.on = function(event,callback){
	for(var i=0;i < this.elements.length; i++){
		this.elements[i].addEventListener(event, function(e){
			//normalize event object here for cross browser
			var element = this; 
			console.log(element);

			var normalizedEvent = e; //normalize here 
			callback.call(element, normalizedEvent);
			//callback.apply(element,[normalizedEvent]);
		});
	}
}; //can use callback or anything else

//Static methods
jQuery.param = function(obj){
	var queryString = [];
	for(var key in obj){ //obj that it passed in,apply methods to functions

		queryString.push(key + '=' + obj[key]); //appends to the array
	}

	return queryString.join('&');
};



window.$ = jQuery; 

//call points to 