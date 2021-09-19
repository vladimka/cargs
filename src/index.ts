/**
 * Match the parameter is CLI argument
 * 
 * Example:
 * 
 *      console.log(isArgument("a")) // false
 *      console.log(isArgument("-a")) // true
 * 
 * @param {String} str 
 * @returns {Boolean}
 */
 const isArgument = (str: string): Boolean => str != null && str.startsWith("-");

 /**
 * Get the argument name by argument
 * 
 * Example:
 * 
 *      console.log(getArgumentName("-abc")) // abc
 * 
 * @param {String} arg 
 * @returns {String}
 */
const getArgumentName = (arg: string): string => {
    let name = arg.replace(/-+/i, "");
    return name;
}

/**
 * Parse the process.argv and return an array with command and arguments for it.
 * 
 * @param {Array<string>} argv
 * @returns {[string, object]}
 */
function parse(argv: Array<string>): [string, object] {
    if(argv.length < 3)
        throw new Error("No command");

    const _args = argv.slice(2);
    const command = _args.shift();

    const args = {};

    for(let i = 0; i < _args.length; i++){
        let _arg: string = _args[i];
        let next_arg: string = i + 1 <= _args.length ? _args[i+ 1] : null;
        let key_name: string = getArgumentName(_arg);

        if(!isArgument(_arg))
            continue;

        if(isArgument(next_arg) || next_arg == null){
            args[key_name] = true;
            continue;
        }

        args[key_name] = next_arg;
        i++;
    }

    return [command, args];
}

export default {parse};