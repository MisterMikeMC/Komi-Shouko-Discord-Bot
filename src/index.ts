console.clear()
import Client from './Client';
require('./Express/index')
require('dotenv').config()
new Client().start()