# MMM-cryptocoin
A `cryptocoin ticker` <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> module.

## Using the module
Add `MMM-cryptocoin` module to the `modules` array in the `config/config.js` file:
````javascript
modules: [
  {
    module: 'MMM-cryptocoin',
    position: 'top_right',
    config: {
      coins: 'ETH', // e.g. 'BTC' or 'BTC,ETH' or 'BTC,ETH,DASH' or ...
      transCurrency: 'EUR', // e.g. 'USD' or 'GBP' or 'RUB' or ...
      updateInterval: 60000 // update interval in milliseconds
    }
  },
]
````

## Credits
Using request API by [CryptoCompare](https://www.cryptocompare.com/api/). 
