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
      transCurrency: 'EUR',
      updateInterval: 60000,
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
    }
  },
]
````


## Configuration options

| Option                | Description
| --------------------- | -----------
| `transCurrency`       | <BR>Symbol of real world currency like EUR, USD, GBP, RUB, ...<BR><EM> Must be a string </EM>
| `coins`               | <BR>Array of one or more crypto coin entries<BR>


### Coins options:
| Option                | Description
| --------------------- | -----------
| `label`               | String for labelling the coin, e.g. 'Ether'.
| `coin`                | String of coin symbol matched to CryptoCompare API, e.g. 'ETH', 'ETC', 'BTC', 'LTC', ... .
| `output`              | Format string for output where %x is for the retrieved currency value, e.g. '$%x', '%x €', ... . %x will be string replaced with the coin value, do not change it.

## Screenshot
![](preview.png?raw=true)

## Credits
Using request API by [CryptoCompare](https://www.cryptocompare.com/api/).

## Copyright
Copyright (C) 2017 by Christian Handorf under [MIT License](LICENSE.md)
