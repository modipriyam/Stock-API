
// xhr request promise call for fetching data from API
let request = obj => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(obj.method || "GET", obj.url);
    if (obj.headers) {
      Object.keys(obj.headers).forEach(key => {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(obj.body);
  });
};
// RX js observer to get JSON data from the API server
let observer = {
  next: function(value) {
    var inputStockSymbols = stockSymbolsClass[0].value;
    console.log();
    request({
      url: `https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=demo`
    })
      .then(response => {
        console.log(response);
        let stocktable = document.getElementsByClassName("stockListTable")[0];
        if (typeof stocktable != "undefined" && stocktable != null) {
          // if it exists, remove it.
          container.removeChild(stocktable);
        }
        let inputSymbolsArray = inputStockSymbols.split(",");
        let filteredData = response.data.filter(f =>
          inputSymbolsArray.includes(f.symbol)
        );
        GenerateTable(filteredData);
      })
      .catch(error => {
        console.log(error);
      });
  },
  // In reality, the error and complete functions below would never be
  // called for a button click event, but this shows the basic structure
  // of an Observable; generally implementing the three functions: next, error, and complete...
  error: function(error) {
    console.log(error);
  },
  complete: function() {
    console.log("Completed");
  }
};

// method to generate table from the json output
function GenerateTable(stockDetailsArray) {
  //Build an array containing Customer records.
  //Create a HTML Table element.

  let table = document.createElement("table");
  table.setAttribute("class", "stockListTable");
  table.classList.add("table-responsive");
  table.border = "1";

  //Get the count of columns.

  //Add the header row.
  let row = table.insertRow(-1);
  //var headerCount = 0;
  for (let key in stockDetailsArray[0]) {
    //headerCount++;
    var headerCell = document.createElement("th");
    headerCell.innerHTML = key;
    row.appendChild(headerCell);
  }

  //Add the data rows.
  for (let i = 0; i < stockDetailsArray.length; i++) {
    row = table.insertRow(-1);
    for (let key in stockDetailsArray[i]) {
      let cell = row.insertCell(-1);
      cell.innerHTML = stockDetailsArray[i][key];
    }
  }
  container.appendChild(table);
}
function unsubscribeSubmitbtn() {
  console.log("unload");
  // Later:
  // This cancels the ongoing Observable execution which
  // was started by calling subscribe with an Observer.
  subscriberObject.unsubscribe();
}

let submitBtn = document.getElementsByClassName("submitBtn");
let stockSymbolsClass = document.getElementsByClassName("stockSymbols");
let container = document.getElementsByClassName("container")[0];


// event listener observer for click submit button using Rxjs
let subscriberObject = Rx.Observable.fromEvent(submitBtn, "click").subscribe(
  observer
);


window.onunload = unsubscribeSubmitbtn;
