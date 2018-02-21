#!/usr/bin/env node


var fs = require('fs'),
name = process.argv.slice(2)[0],
cssmin = require('cssmin'),
css = fs.readFileSync('.tmp/css/'+name+'.css', encoding='utf8'),
min = cssmin(css);

fs.writeFile('.tmp/css/'+name+'.min.css', min, (err) => {
    if (err) throw err;
    console.log('.tmp/css/'+name+'.min.css' + ' created');
});
  
