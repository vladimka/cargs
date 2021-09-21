# cargs

Lightweight parser of cli arguments

## Installation

### Using `npm`
```bash
    npm i cargs
```

## Example of usage

```js
    const fargs = require('cargs').default;
    const [command, args] = fargs.parse(process.argv, { hasCommand : true, delimeter : '-' });

    console.log(command, args);
```