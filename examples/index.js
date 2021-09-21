const fargs = require('../dist/index').default;
const [command, args] = fargs.parse(process.argv, { hasCommand : true, delimeter : '-' });

console.log(command, args);