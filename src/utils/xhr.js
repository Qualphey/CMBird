'use strict'

module.exports = class {
  static get(url, params, callback) {
    if (params) {
      url += "?data="+encodeURIComponent(JSON.stringify(params));
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", callback);
    xhr.open("GET", url);
    xhr.send();

    console.log(url);
  }

  static getParamByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  static post(url, params, callback) {
    var http = new XMLHttpRequest();
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        callback(http.responseText);
      }
    }

    var json = JSON.stringify(params);
    var param_str = 'data='+encodeURIComponent(json);
    http.send(param_str);
  }
}