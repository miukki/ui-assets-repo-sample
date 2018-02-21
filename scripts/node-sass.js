#!/usr/bin/env node

var sass = require('node-sass');
const fs = require('fs');
const project = process.argv.slice(2)[0];

console.log('process!', process.argv.slice(2) && process.argv.slice(2)[0], process.argv.slice(2) && process.argv.slice(2)[1] === 'map');


function throwError (error) {
  if (error) throw error;
}

if (project == undefined) {
  throwError ('Project undefined');
}
fs.mkdir('.tmp', 0o777, function(){
  fs.mkdir('.tmp/css', 0o777, function(){


    sass.render({
      file: 'assets/scss/compiled/'+project+'.scss',
      outFile: '.tmp/css/'+project+'.css',
      outputStyle: 'compact',
      sourceMap: process.argv.slice(2) && process.argv.slice(2)[1] === 'map',
      includePaths: ['lib/', 'mod/']
    }, function(err, result) { // node-style callback from v3.0.0 onwards
      

      if (err) {
        return throwError(err);
        
      }
      else {
        console.log(result.stats);
        
        if (result.map) {
        //result.map
          fs.writeFile('.tmp/css/'+project+'.css.map', result.map.toString(), (err) => {
            if(err){
              return throwError(err);
                //err log written on disk
            }
            console.log('.tmp/css/'+project+'.css.map' + ' compiled');
          });
          
        }

       // result.css
          fs.writeFile('.tmp/css/'+project+'.css', result.css.toString(), (err) => {
            if(err){
              return throwError(err);
                //err log written on disk
            }

             console.log('.tmp/css/'+project+'.css' + ' compiled');
          });
       }
    });


  });  
});

