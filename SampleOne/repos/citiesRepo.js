let fs = require('fs');
const FILE_NAME = './assets/cities.json';

let citiesRepo = {
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
                let city = JSON.parse(data).find(p => p.id == id);
                resolve(city);
            }
        });
    },
    search: function(searchObject, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let cities = JSON.parse(data);

                //perform a search
                if(searchObject){
                    cities = cities.filter(
                        c => (searchObject.id ? c.id == searchObject.id : true) &&
                        (searchObject.name ? c.name.toLowerCase().indexOf(searchObject.name) >= 0 : true));
                }

                resolve(cities);
            }
        });
    },
    insert: function(newData, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let cities = JSON.parse(data);
                cities.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(cities), function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(newData);
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
                let cities = JSON.parse(data);
                let city = cities.find(c => c.id == id);
                if(city){
                    Object.assign(city, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(cities), function(err){
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
                let cities = JSON.parse(data);
                let city = cities.findIndex(c => c.id == id);
                if(city != -1){
                    cities.splice(city, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(cities), function(err){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(city);
                        }
                    });
                }
            }
        });
    }
};


module.exports = citiesRepo;