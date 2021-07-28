#!/usr/bin/env node

const sudo = require('sudo-prompt');
const options = {
    name: 'powershell'
};
const fs = require('fs')
const default_path = "C:\\webcam_control\\scripts\\";

// synchronous calls
  if (!fs.existsSync(default_path)) {
    fs.mkdir(default_path, { recursive: true }, (err) => {
      if (err) throw err;
      fs.copyFile(__dirname+"/disable.ps1", default_path+"/disable.ps1", (err) => {
        if (err) throw err;
        // disable.ps1 created
        fs.copyFile(__dirname+"/enable.ps1", default_path+"/enable.ps1", (err) => {
          if (err) throw err;
        // enable.ps1 created
        });
      });
    })
  }
// console.log(__dirname)
const yargs = require("yargs");
const modes = [
                {
                "mode":"Disable",
                "value":default_path + "disable.ps1"
                },
                {
                "mode":"Enable",
                "value":default_path + "enable.ps1"
                },
            ]

const args = yargs
    .usage("Usage: -s <Flag> \n[0 : Disable, 1 : Enable]")
    .option("s", { alias: "status", 
                   describe: "Choose to disable/enable",
                   choices:[0,1],
                   type: "number", demandOption: true })
    .argv;
sudo.exec(`powershell -file ${modes[args.s].value}`, options,
  function(error, stdout, stderr) {
    if (error) throw error;
    console.log(`WebCam Status : ${modes[args.s].mode}`);
  }
);