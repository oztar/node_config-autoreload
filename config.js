'user strict'
/**
  * @file config_autoreload for NODEJS ()
  * @autor Alfredo Roman Domiguez <alfredoromandominguez@gmail.com> 
  */
const fs   = require('fs');
const p    = require('path');
/*
  @title createMem
  @description Create others departamente with mem, no refreshed
  @param {array} arr  Array, names of departamentes
*/
const createMem = function(arr){
    for( let i in arr){
	const id = arr[i];
	ex[id] = {};
    }
    module.exports = ex;
}

/*
  @title save
  @description create file
  @param {string} option  Name of raiz memory
  @param {string} path    Folder create file
  @param {boolean}human   true or false, file human read
*/
const save = function(option,path,human){
    if( option     === undefined){return false;}
    if( ex[option] === undefined){return false;}
    if( path       === undefined){return false;}
    if( human      === undefined){ human = false;}
    if( typeof human !== "boolean"){ human = false;}
   
    if(human){
	try{
	    fs.writeFileSync(path, JSON.stringify(ex[option], null, 2));
	}catch(e){
	    console.log(e);
	    return false
	}
    }else{
	try{
	    fs.writeFileSync(path, JSON.stringify(ex[option]));
	}catch(e){
	    console.log(e);
	    return false
	}
    }
    
    return true;
}


/**
 * @title createRefresh
 * @description Create new departamente, require file, and refreshed
 * @param {string} option  Name of raiz memory
 * @param {string} path 
 */

const createRefresh = function(option,path){
    if( option === undefined){return false;}
    if( path === undefined){ return false;}    
    if( ex[option] === undefined){ ex[option] = {};}
    
    if(ex[option].autosave){	
	if(!save(option,path,ex[option].human)){
	    console.log('err auto save');
	    return;
	}
    }
    //reload file
    try{
	ex[option] = null;
	ex[option] = Object.assign({},require(path));
	delete require.cache[require.resolve(path)];
    }catch(err){
	console.log(err);
	ex[option] = null;
	ex[option] = {err: err.toString()}
	return;
    }

    if(ex[option].refreshConfig === undefined){ ex[option].refreshConfig  = 30;}
    //autosave
    if(ex[option].autosave === undefined){ ex[option].autosave  = false;}
    if(ex[option].human    === undefined){ ex[option].human     = false;}

    setTimeout( ()=>{
	createRefresh(option,path);
    },ex[option].refreshConfig*1000);
    
    module.exports[option] = ex[option];
}


/**
 * @title createConfig
 * @description Create departamente config, require file and refreshed
 * @param {string} path 
 */

const createConfig = (path)=>{
    const xpath = path;
    path = null;
    return createRefresh('config',xpath);
}

let ex ={
    save,
    createMem,
    createRefresh,
    createConfig,
    mem : {}
};

module.exports = ex;



