# Just use this.

[Inputmask - documentation](https://robinherbots.github.io/Inputmask/#/documentation)

### Code preparation:

```js
import Inputmask from '../inputmask/inputmask.es6.js'

new Inputmask({
  mask: 'A9[*]{1,10}',
  // repeat: 10,

  /*
  definitions: {
    '*': {
      validator: "[0-9A-Za-z]",
      casing: "upper"
    }
  },
  */
}).mask(document.querySelector('input[name="your_name"]'))
```
