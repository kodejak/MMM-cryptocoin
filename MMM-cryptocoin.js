/* Magic Mirror
 * Module: MMM-cryptocoin
 *
 * By Christian Handorf (mmm@kodejak.de)
 * MIT Licensed.
 *
 * Based on MMM-bitcoin module by valmassoi.
 */

Module.register("MMM-cryptocoin", {

  result: {},
  defaults: {
    transCurrency: 'EUR',
    updateInterval: 60000,
    fadeSpeed: 3000,
    coins: [
        {
          label: 'Ether',
          coin: 'ETH',
          output: '%x €',
        },
        {
          label: 'Bitcoin',
          coin: 'BTC',
          output: '%x €',
        },
    ],
  },

  start: function() {
    this.getTickers();
    this.scheduleUpdate();
  },

  getDom: function() {
    var wrapper = document.createElement("ticker");
    wrapper.className = 'medium bright';
    var data = this.result;
    var output = '<table width="95%">';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        for (var c in this.config.coins) {
          var coinEntry = this.config.coins[c];          
          if (coinEntry.coin == key) {
            var str = '<tr><td width="50%">' + coinEntry.label + '</td><td align="right">' + coinEntry.output + '</td></tr>';
            var val = data[key][this.config.transCurrency]; 
            str = str.replace("%x", val.toFixed(2));
            output += str;
            break;
          }
        }
      }
    }
    output += '</table>';
    var outputElement =  document.createElement("span");
    outputElement.innerHTML = output;
    wrapper.appendChild(outputElement);

    return wrapper;
  },

  scheduleUpdate: function(delay) {
    var nextLoad = this.config.updateInterval;
    if (nextLoad < 10000) {
      nextLoad = 10000;
    }
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }

    var self = this;
    setInterval(function() {
      self.getTickers();
    }, nextLoad);
  },

  getTickers: function () {
    var coinAdd = "";
    
    for (var c in this.config.coins) {
      var coinEntry = this.config.coins[c];
      if (coinEntry.coin.length < 1) {continue;}
      if (coinAdd.length > 0) {coinAdd += ",";}
      coinAdd += coinEntry.coin.trim();
    }
    var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + coinAdd + '&tsyms=' + this.config.transCurrency;
    this.sendSocketNotification('GET_TICKERS', url);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "TICKERS_RESULT") {
      var self = this;
      this.result = payload;
      this.updateDom(self.config.fadeSpeed);
    }
  },

});
