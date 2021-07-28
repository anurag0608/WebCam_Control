#!/usr/bin/env node

const sudo = require('sudo-prompt');
const options = {
    name: 'powershell'
};
const fs = require('fs')
const default_path = "C:\\webcam_control\\scripts\\";
const enable_path = "C:\\webcam_control\\scripts\\enable.ps1";
const disable_path = "C:\\webcam_control\\scripts\\disable.ps1";
// synchronous calls
  if(!fs.existsSync(enable_path) || !fs.existsSync(disable_path)){
    fs.mkdir(default_path, { recursive: true }, (err) => {
      if (err) throw err;
       create_script(enable_path, disable_path)
    })
  }
// console.log(__dirname)
const yargs = require("yargs");
const { stdout, stderr } = require('process');
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
sudo.exec(`powershell set-ExecutionPolicy RemoteSigned -Scope CurrentUser ; powershell -file ${modes[args.s].value}`,options,(error,stdout,stderr)=>{
  if (error) throw error;
  console.log(`WebCam Status : ${modes[args.s].mode}`);
})
const create_script = (script1, script2)=>{
    fs.copyFile(__dirname+"/enable.ps1", script1, (err) => {
      if (err) throw err;
      fs.copyFile(__dirname+"/disable.ps1", script2, (err) => {
        if (err) throw err;
          // both script created
      });  
    });
}