'use strict';

const electron = require('electron');
const app = electron.app;  
const BrowserWindow = electron.BrowserWindow;

var exec = require('child_process').exec;


const ipcMain = require('electron').ipcMain;
ipcMain.on('download-message', function(event, arg) {
  console.log(arg);  

  var child = exec("./youtube.sh " + arg, function(error, stdout, stderr) {
      if (error) console.log(error);
      process.stdout.write(stdout);
      process.stderr.write(stderr);
  });

});

ipcMain.on('check-library', function(event, arg) {
  console.log(arg);  

  var child = exec("./check-library.sh " + arg, function(error, stdout, stderr) {
      if (error) console.log(error);
      process.stdout.write(stdout);
      process.stderr.write(stderr);
  });

});




var mainWindow = null;



app.on('window-all-closed', function() {

  if (process.platform != 'darwin') {
    app.quit();
  }
});



app.on('ready', function() {
  
  mainWindow = new BrowserWindow({width: 1400, height: 1000});


  mainWindow.loadURL('file://' + __dirname + '/index.html');




  mainWindow.on('closed', function() {

    mainWindow = null;
  });
});


