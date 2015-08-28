var fs = require('fs');
var getDirName = require("path").dirname;

var config, srcPath, outPath;
var basePath = process.cwd();

function traverse(path, floor, handleFile) {  
    handleFile(path, floor);  
    floor++;  
    fs.readdir(path, function(err, files) {  
        if (err) {  
            console.log('read dir error');  
        } else {  
            files.forEach(function(item) {  
                var tmpPath = path + '/' + item;  
                fs.stat(tmpPath, function(err1, stats) {  
                    if (err1) {  
                        console.log('stat error');  
                    } else {  
                        if (stats.isDirectory()) {  
                            traverse(tmpPath, floor, handleFile);  
                        } else {  
                            handleFile(tmpPath, floor);  
                        }  
                    }  
                })  
            });  
  
        }  
    });  
}

function handleFile(path, floor){
    var ext = path.split('.');
    ext = ext[ext.length-1];
    if(config.rules[ext]){
        if(ext == 'js'){
            preproccessJs(path);
        }
    }
}

function getConfig(){
	var jsData = fs.readFileSync(basePath + '/zebra-config.json', "utf-8");  
	config = JSON.parse(jsData);
}

function relative2absolute(path, base) {
    if (!base || path.match(/^\//)) {
        return path;
    }
    var pathParts = path.split('/');
    var basePathParts = base.split('/');

    var item = pathParts[0];
    while(item === '.' || item === '..') {
        if (item === '..') {
            basePathParts.pop();
        }
        pathParts.shift();
        item = pathParts[0];
    }
    return basePathParts.join('/') + '/' + pathParts.join('/');
}

function preproccessJs(path){
	var jsData = fs.readFileSync(path,"utf-8");
	var relativeOutPath = outPath.replace(basePath, ''), // /build
        relativePath = path.replace(srcPath, ''), // /build/dust/..
        relativeDir = getDirName(path).replace(srcPath, '');  // /dust/...
	var outFile = outPath + relativePath;

    //给module注入路径
	var reg = /module\s*\(\s*(function\s*\(.*?\)\s*\{)/;
	jsData = jsData.replace(reg, function(s0, s1){
		return 'module("'+ relativeOutPath + relativePath+'", ' + s1;
	});

    //将require的相对路径换成绝对路径
    var reg2 = /require\(([^\)]+)\)/g;
    jsData = jsData.replace(reg2, function(s0, s1){
        var rpath = s1.slice(1, -1);
        if(/^(\.\/)|(\.\.\/)/.test(rpath)){
            rpath = relative2absolute(rpath, relativeDir);
        }
        if(rpath.slice(-3) != '.js'){
            rpath += '.js';
        }
        console.log('>> [', relativeOutPath + rpath, ']');
        return 'require("'+ relativeOutPath + rpath +'")';
    });

    //将inline的内容注入
    var reg3 = /__inline\(([^\)]+)\)/g;
    jsData = jsData.replace(reg3, function(s0, s1){
        var rpath = s1.slice(1, -1);
        if(/^(\.\/)|(\.\.\/)/.test(rpath)){
            rpath = srcPath + relative2absolute(rpath, relativeDir);
        }
        return '"' + getFileAsString(rpath) + '"';
    });
    
    writeFile(outFile, jsData);
}

function getFileAsString(path) {
    var fileData = fs.readFileSync(path,"utf-8");
    fileData = fileData.replace(/\n/g, '\\n'); // \n
    fileData = fileData.replace(/'/g, "\\'");  // '
    fileData = fileData.replace(/"/g, '\\"');  // "
    return fileData.replace(/\n/g, '\\n');
}

function writeFile(path, contents) {
    var dir = getDirName(path);
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(path, contents, {encoding: 'utf8', mode: 438, flag: 'w'});
}

function setup(){
	getConfig();
	srcPath = relative2absolute(config.base, basePath);
	outPath = relative2absolute(config.output, basePath);

	traverse(srcPath, 0, handleFile);
}

setup();
