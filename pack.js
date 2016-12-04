var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;
var config = require("./anuconfig");

var workFolder = config.globalConfig.workFolder;

fs.watch(path.join(workFolder, config.sassConfig.watchpath), function () {
  console.log("change");
});
