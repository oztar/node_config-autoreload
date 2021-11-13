'use strict';

const exp      = require('chai').expect;
const fs       = require('fs');
const lib      = require('./config.js');
const variable = 'a'; 
const loops    = 4;// repeats
const timers   = 1000;//1 second


				


it('create lib config for file  ',function(done){
    lib.createConfig('./config.json');
    exp(lib.config).to.be.an('Object');
    done();
});



it('create lib new for file  ',function(done){
    fs.copyFile('./config.json', './fnew.json', (err) => {
	if (err) throw err;
	lib.createRefresh('fnew','./fnew.json');
	exp(lib.fnew).to.be.an('Object');
	done();
    });
});

it('create lib smem for mem  ',function(done){
    lib.createMem(['secondmem']);
    exp(lib.secondmem).to.be.an('Object');
    done();
});


const printTest = function(c,time,departamentConfig,departamentMem){
    it('asing variable in '+departamentMem+' '+c,function(done){
	try {
	    lib[departamentMem].test = variable;
	    done();
	}catch{
	    throw new Error();
	}
    });
    it('create '+departamentMem+' '+c,function(done){
	setTimeout( function(){
	    try {
		exp(lib[departamentMem]).to.be.an('Object');	
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    });
     it('var '+departamentMem+' string '+c,function(done){	
	 setTimeout( function(){
	    try {
		exp(lib[departamentMem].test).to.be.a('string');
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    });
     it('var '+departamentMem+' equal '+c,function(done){	
	 setTimeout( function(){
	    try {
		exp(lib[departamentMem].test).to.equal(variable);
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    });
    it('var '+departamentConfig+' number '+c,function(done){	
	setTimeout( function(){
	    try {
		exp(lib[departamentConfig].test).to.be.a('Number');
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    }); 
    it('var inmutable '+departamentConfig+' equal '+c,function(done){	
	setTimeout( function(){
	    try {
		exp(lib[departamentConfig].test).to.equal(2);
		lib[departamentConfig].test = variable;
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    });
    it('refhesh '+departamentConfig+' '+c,function(done){	
	setTimeout( function(){
	    try {
		exp(lib[departamentConfig].refreshConfig).to.be.a('Number');
		done();
	    }catch{
		throw new Error();
	    }
	},time);
    });
}

describe('Save new File fnew',function(){
    it('save error ',function(done){	
	const path = './fnew.json';
	try{
	    const res = lib.save('newoptions',path,true);
	    if( !res){
		done();
	    }else{
		throw new Error();
	    }
	}catch{
	    throw new Error();
	}
    });

    it('save human',function(done){	
	const path = './fnew.json';
	try{
	    lib.save('fnew',path,true);
	    if (fs.existsSync(path)) {
		done();
	    }else{
		throw new Error();
	    }
	}catch{
	    throw new Error();
	}
    });

    it('save minimal',function(done){	
	const path = './fnew.json';
	try{
	    lib.save('fnew',path,false);
	    if (fs.existsSync(path)) {
		done();
	    }else{
		throw new Error();
	    }
	}catch{
	    throw new Error();
	}
    }); 
   it('save without option human',function(done){	
	const path = './fnew.json';
	try{
	    lib.save('fnew',path);
	    if (fs.existsSync(path)) {
		done();
	    }else{
		throw new Error();
	    }
	}catch{
	    throw new Error();
	}
    }); 
    it('save other file backup',function(done){	
	const path = './backup.json';
	try{
	    lib.save('fnew',path);
	    if (fs.existsSync(path)) {
		done();
	    }else{
		throw new Error();
	    }
	}catch{
	    throw new Error();
	}
    });
});

describe('auto save',function(){
    it('fnew update with auto save',function(done){
	try{
	    lib.fnew.human = true;
	    lib.fnew.autosave = true;
	    lib.fnew.fnewtest = variable; 
	    lib.save('fnew','./fnew.json');
	    done();
	}catch{
	    throw new Error();
	}
    });
    it('check auto save',function(done){
	setTimeout( function(){
	    try {
		exp(lib.fnew.fnewtest).to.be.a('string');		    
		done();
	    }catch(e){
		console.log(e);
		throw new Error();
	    }
	},timers);
    });
    it('time perdurable',function(done){
	try{
	    setTimeout( function(){
		try {
		    exp(lib.fnew.fnewtest).to.be.a('string');	    
		    done();
		}catch(e){
		    console.log(e);
		    throw new Error();
		}
	    },timers);
	}catch{
	    throw new Error();
	}
    });
    if('check auto save', function(done){
	console.log(lib.fnew.fnewtest);
	exp(lib.fnew.fnewtest).to.equal(variable);
	done();
    });
    it('fnew update without auto save',function(done){
	try{
	    lib.fnew.human = false;
	    lib.fnew.autosave = false;
	    lib.save('fnew','./fnew.json');
	    done();
	}catch{
	    throw new Error();
	}
    });

}); 

//loop for secods
for ( let i =1; i<=loops ; i++){
    describe(i+' second for config',function(){
	printTest(i,timers,'config','mem');
    }); 

    describe(i+' second for new',function(){
	printTest(i,timers,'fnew','secondmem');
    });
}


