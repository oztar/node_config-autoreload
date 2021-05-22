'user strict'
/**
  * @file Check_MK for NODEJS (checkMK)
  * @autor Alfredo Roman Domiguez <alfredoromandominguez@gmail.com> 
  * @example
  * let check = require('checkMK');
  * 
  * let  options = {
  *    host:  '192.168.72.20'    
  * }
  * check.createServer(options);
  * check.addService('prueba',{name: 'prueba'});
  * check.addService('prueba2',{
  *  name: 'prueba2',
  *  ok: 'prueba 2',
  *  counter: {
  *	linea : '9;2;3;0;10',
  *	linea2: '1;2;7'
  *  }
  *})
  * ...
  * ...
  *  check.updateService('prueba2',{
  *	linea : 9,
  *	linea2: 1
  *  });
  */


/* basic memory */
let config =  {
    'mem': {}
};
let _tmp = {
    config : {},
    mem   : {}
};
/**
 * Config
 *
 * @constructor
 * @param {string} path 
*/
const createConfig = (path)=>{
    if( path === undefined){ return;}
    _tmp.mem    = config.mem;
    try{
	delete require.cache[require.resolve(path)];
	_tmp.config = require(path);
    }catch(err){
	console.log(err);
	config = {err: err.toString()}
	config.mem = _tmp.mem;
	return;
    }
    
    config = Object.assign({} ,_tmp.config); 
    
    if(config.refreshConfig === undefined){ config.refreshConfig  = 30;}
    
   
    config.mem = _tmp.mem;
    setTimeout( ()=>{
	createConfig(path);
    },config.refreshConfig*1000);
    

    module.exports.config = config;
}


module.exports = {
    createConfig,
    config
};



