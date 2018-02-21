#!/usr/bin/env node

const jsonfile = require('jsonfile')
 
const exec = require('child_process').exec;
const v = jsonfile.readFileSync('./gruntConfig.json')['bootstrap']['v'][process.argv.slice(2)[0]][0] || '0.13.4';

const
    spawn = require( 'child_process' ).spawn,
    installer = spawn( 'bower', [ 'install', 'angular-bootstrap#'+v ], {} );

installer.stdout.on( 'data', (data) => {
    console.log(data.toString('utf8'));//stdout
});

installer.stderr.on( 'data', (data) => {
    console.log( data.toString('utf8'));//stderr
});

installer.on( 'close', code => {
    console.log( 'child process exited with code ${code}', code);
});
