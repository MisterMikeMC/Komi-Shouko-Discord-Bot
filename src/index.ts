console.clear();
require("dotenv");
require("./Express/index");
import Client from "./Client";
new Client().start();

let array: any[] = [1, 2, 3, 4, 5];

console.log(array);
