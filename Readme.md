## config-autoreload
Is a library archive cofigure refres whitout restart node


If you overwrite <key your_key_file_config> infile config you need restart node for load.

But with this library and the refreshconfig parameter,
it is in charge of updating the config file and updating <key your_key_file_config>




## Install
npm install config-autoreload





## explample file config
{
  "your_key_file_config" : x,
  "otrhes" : {
     "key" : "value"
 }
  "refreshConfig": 1	
}


Es necesary, integer in key refreshConfig, is a time in second libs reload file. 






## Usage Example
# File config
const path_file_config = './config.json';

let lib = requie(config-autoreload);

//indicate file reload.
lib.createConfig(path_file_config);
 
module.exports = lib;


# File source a
...
let c = require('./config');

...
/* memory file config.json */
var your_key_file_config  = c.config.your_key_file_config; // value = x
...   

...
/* memory permanent into node */
c.mem.your_key_node_values = 1;
...


# File source b
...
let c = require('./config');

...
var your_key_node_values = c.mem.your_key_node_values; // value asigned in souce A = 1;
...





