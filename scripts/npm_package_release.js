var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

var npm_package_path = path.resolve(__dirname, '../npm_package/');

var libDir = path.join(path.resolve(process.cwd()), 'lib');
var libEsm = path.join(path.resolve(process.cwd()), 'lib-esm');
var release = path.join(path.resolve(process.cwd()), 'release');

copyIntoRelease(libDir);
copyIntoRelease(libEsm);
copyIntoRelease(release);
buildPackageJson();

function copyIntoRelease(folderPath) {
  shell.cp('-r', folderPath, npm_package_path);
}

function buildPackageJson() {
  const outputPath = path.resolve(npm_package_path, 'package.json');
  const packagePath = path.resolve(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath));
  packageJson.name = 'angular-ui-router-extended';
  const scripts = {
    prePublishOnly: 'echo Preaparing for Publish...',
  };
  packageJson.scripts = scripts;
  fs.writeFileSync(outputPath, JSON.stringify(packageJson, null, 2));
}
