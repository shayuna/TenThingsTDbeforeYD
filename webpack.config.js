const path = require("path");
const myPath=path.join(__dirname,"public","scripts");
console.log (myPath);
module.exports = {
   entry:"./react/main.js",
   output:{
       path:myPath,
       filename:'bundle.js'
   },
   mode:"development",
   devtool:"cheap-module-eval-source-map",
   module:{
       rules:[
           {
               loader:"babel-loader",
               test: /\.js$/,
               exclude:/node_modules/
           }
       ]
   },

}
