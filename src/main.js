import {Observable} from 'rxjs';

let getJSON = function (url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            let status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
};
getJSON('https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=demo').then(function (data) {

    alert('Your Json result is:  ' + data);
    const res = data.data;
    let dat = res.length;
    console.log("Data at 0 index is  : " + data);
    populate(res);
}, function (status) { //error detection....
    alert('Something went wrong.');
});


const rankingBody = document.querySelector("#result > tbody");

function populate(res) {
    console.log("in pop");
    console.log(res);

    //clearing existing data
    while (rankingBody.firstChild) {
        rankingBody.removeChild(rankingBody.firstChild);

    }

    //populate table
    res.forEach((row) => {
        console.log(row);
        const r = document.createElement("tr");
        let x;
        for (x in row) {
            const c = document.createElement("td");
            console.log(row[x]);

            c.textContent = row[x];
            r.appendChild(c);

        }
        rankingBody.appendChild(r);
    });

}

let button = document.querySelector('#submitbutton');
let clicks$ = Rx.Observable
    .fromEvent(button, 'click');

clicks$.getJSON(e => {
    console.log('increase count');
});