'use strict';

Module.register("MMM-cryptocoin", {

  result: {},
  defaults: {
    coins: 'BTC',
    transCurrency: 'EUR',
    updateInterval: 60000
  },

  start: function() {
    this.getTickers();
    this.scheduleUpdate();
  },

  getDom: function() {
    var wrapper = document.createElement("ticker");
    wrapper.className = 'medium bright';
    var data = this.result;
    var output = "";
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (output.length > 0) {output += "<br>";}
        output += key + ": " + data[key][this.config.transCurrency] + " " + this.config.transCurrency;
      }
    }
    if (output) {
      var outputElement =  document.createElement("span");
      outputElement.innerHTML = output;
      wrapper.appendChild(outputElement);
    }

    return wrapper;
  },

  scheduleUpdate: function(delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }

    var self = this;
    setInterval(function() {
      self.getTickers();
    }, nextLoad);
  },

  getTickers: function () {
    var coinArray = this.config.coins.split(",");
    var coinAdd = "";
    for (var i = 0; i < coinArray.length; i++) {
      if (coinAdd.length > 0) {coinAdd += ",";}
      coinAdd += coinArray[i].trim();
    }
    var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + coinAdd + '&tsyms=' + this.config.transCurrency;
    this.sendSocketNotification('GET_TICKERS', url);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "TICKERS_RESULT") {
      this.result = payload;
      this.updateDom(self.config.fadeSpeed);
    }
  },

});
