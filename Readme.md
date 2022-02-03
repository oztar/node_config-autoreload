## config-autoreload  Version 2.0.2
It is a library to store information in Json format:
- Update files automatically whitout restart node
- Stores information by departments in memory
- Create backup copies
- Autosave

If you overwrite <key your_key_file_config> infile config you need restart node for load.

But with this library and the refreshconfig parameter,

it is in charge of updating the config file and updating <key your_key_file_config>


If you overwrite <key your_key_file_config> infile file.json you need restart node for load.

But with this library and the refreshconfig parameter,

it is in charge of updating the file.json and updating <key your_key_file_config>


for default file is config.json but you are using custon names.

## Install

npm install config-autoreload

## explample file config

{
  "your_key_file_config" : x,

  "otrhes" : {

     "key" : "value"

 }

  "refreshConfig": 1, //1 second refresh library	

  "autosave" : false,

  "human"    : true

}


Es necesary, integer in key refreshConfig, is a time in second libs reload file. 

If key refreshConfig is empty lib create key whit 30 seconds value.


Key autosave -> is used to save the configuration to file.json according to value refreshconfig time

key human    -> is used to save legible human json. 




## Usage Example

# File source config.js

const path_file_config = './config.json';

const path_file_custom = './custom.json';

//require library

const lib = requie(config-autoreload);

//create file config.son

lib.createConfig(path_file_config);
 
//create file custom.json

lib.createRefresh('custom',path_file_custom);

//create memory internal, whitout file

lib.createMem(['second_mem','custom_mem']);

//exports

module.exports = lib;


# File source a.js

...

let config = require('./config');

...

/* memory width files *.json */

const your_key_file_config  = config.config.your_key_infile_config; // value = x

const your_key_file_custom  = config.custom.your_key_infile_custom; // vasle = y

...   

...

/* memory permanent into node */

config.mem.your_key_node_values = 1;

config.second_mem.new_value = 'x';

config.custom_mem.new_value = 'x';

...


# File source b.js
...

let config = require('./config');

...

var your_key_node_values = config.mem.your_key_node_values; // value asigned in source a.js = 1;

var your_key_node_new_value = config.second_mem.new_value; // value asigned in source a.js = 'x';

/* memory width files *.json */

const your_key_file_config  = config.config.your_key_infile_config; // value = x

...


# File source backup.js

...

let config = require('./config');

...

const res = lib.save('second_nem','./backup/second.json',true);  //return true or false

if( res){

    console.log(' save ok ');

}