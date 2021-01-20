let fs = require('fs');
const FILE_NAME = './assets/colors.json';

let colorsRepo = {
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }
        });
    },
    getByID: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let color = JSON.parse(data).find(p => p.id == id);
                resolve(color);
            }
        });
    },
    insert: function(newData, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
                console.log("error " + err);
            }
            else{
                let colors = JSON.parse(data);
                colors.push(newData);
                console.log(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(colors), function(err){
                    if(err){
                        reject(err);
                        console.log("error " + err);
                    }
                    else{
                        resolve(newData);
                        console.log(newData);
                    }
                });
            }
        });
    },
    update: function(newData, id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let colors = JSON.parse(data);
                let color = colors.find(c => c.id == id);
                if(color){
                    Object.assign(color, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(colors), function(err){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(newData);
                        }
                    });
                }
            }
        });
    },
    delete: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let colors = JSON.parse(data);
                let color = colors.findIndex(c => c.id == id);
                if(color != -1){
                    colors.splice(color, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(colors), function(err){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(color);
                        }
                    });
                }
            }
        });
    }

};
module.exports = colorsRepo;