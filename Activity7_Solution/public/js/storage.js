
var localAdapter = {

    saveColorData: function(object){
        var stringified = JSON.stringify(object);
        localStorage.setItem("colorData", stringified);
        return true; 
    },
    getColors: function(){
        return JSON.parse(localStorage.getItem("colorData"));
    },
    saveLastFetched: function(date){
        localStorage.setItem("lastFetched",date);
        return true;
    },
    getLastFetched: function(){
        return localStorage.getItem("lastFetched");
    },
    saveLastUpdate: function(date){
        localStorage.setItem("lastUpdate",date);
        return true;
    },
    getLastUpdate: function(){
        return localStorage.getItem("lastUpdate");
    },
    saveNextUpdate: function(date){
        localStorage.setItem("nextUpdate",date);
        return true;
    },
    getNextUpdate: function(){
        return localStorage.getItem("nextUpdate");
    }

};

var storage = localAdapter;

const getColors = async () => {
    const url = 'http://localhost:5001/colors.json'
    await fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      localAdapter.saveColorData(data);
      localAdapter.saveLastUpdate(data.LastUpdatedDate);
      localAdapter.saveNextUpdate(addOneHour(data.LastUpdatedDate));
      })
}

function addOneHour(date){
    var nextUpdate = new Date(date);
    nextUpdate.setHours(nextUpdate.getHours() + 1);
     return nextUpdate.toString();
}

const pollColorsAPI = async ({ interval }) => {
    console.log('Start polling');

    const executePoll = async () => {
      console.log('- polling colors');
    
      const nextUpdate = storage.getNextUpdate();
      var nextUpdateDate = new Date(nextUpdate);
     
            if(!nextUpdate || nextUpdateDate < new Date()){
                console.log('Data has expired - calling the API!');
            const result = await getColors();

            }
   setTimeout(executePoll, interval);
      
    };

    return new Promise(executePoll);
};

function isDateBeforeToday(date) {
    var fetchedDateString = date.toDateString();
    var todayString = new Date(new Date().toDateString());
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

  
var helpers = {

    getHtml: function (id) {

        return document.getElementById(id).innerHTML;

    },
    setHtml: function (id, html) {

        document.getElementById(id).innerHTML = html;
        return true;

    },
    updateColors: function () {

        var colors = localAdapter.getColors(),
            template = this.getHtml('colorTemplate'),
            compiled = _.template(template, {
                items: colors.ColorsList
            });
        this.setHtml('main', compiled);

    }

};


document.addEventListener('DOMContentLoaded', function () {

    // getColors().then(helpers.updateColors())
    // .then(function(){
            
    // });

    pollColorsAPI({interval:10000}).then(helpers.updateColors())
    .then(function(){
            
    });


}); 