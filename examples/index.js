const fargs = require('../dist/index').default;
const [command, args] = fargs.parse(process.argv);

console.log(command, args);