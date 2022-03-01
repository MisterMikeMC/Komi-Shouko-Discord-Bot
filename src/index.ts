console.clear()
require('dotenv').config()
require('./Express/index')
import Client from './Client';
new Client().start()