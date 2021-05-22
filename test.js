'use strict';

const exp      = require('chai').expect;
const lib      = require('./config.js');
const variable = 'a'; 
const loops    = 4;// repeats
const timers   = 1000;//1 second
lib.createConfig('./config.json');
				


it('create lib config  ',function(){
    exp(lib.config).to.be.an('Object');
});



const printTest = function(c,time){
    lib.config.mem.test = variable;
    it('create mem '+c,function(done){
	setTimeout( function(){
	    try {
		exp(lib.config.mem).to.be.an('Object');	
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    });
     it('var mem '+c,function(done){	
	 setTimeout( function(){
	    try {
		exp(lib.config.mem.test).to.be.a('string');
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    });
     it('var mem '+c,function(done){	
	 setTimeout( function(){
	    try {
		exp(lib.config.mem.test).to.equal(variable);
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    });
    it('var config '+c,function(done){	
	setTimeout( function(){
	    try {
		exp(lib.config.test).to.be.a('Number');
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    }); 
    it('var inmutable '+c,function(done){	
	setTimeout( function(){
	    try {
		exp(lib.config.test).to.equal(2);
		lib.config.test = variable;
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    });
    it('refhesh config '+c,function(done){	
	setTimeout( function(){
	    try {
		exp(lib.config.refreshConfig).to.be.a('Number');
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    });
}

for ( let i =1; i<=loops ; i++){
    describe(i+' second',function(){
	printTest(i,timers);
    });
}

