interface IOptions{
    hasCommand?: boolean;
    delimeter?: string;
}

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
 const isArgument = (str: string, delimeter : string): Boolean => str != null && str.startsWith(delimeter);

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
const getArgumentName = (arg: string, delimeter : string): string => {
    let name = arg.replace(new RegExp(`${delimeter}+`), "");
    return name;
}

/**
 * Parse the process.argv and return an array with command and arguments for it.
 * 
 * @param {Array<string>} argv
 * @returns {[string, object]}
 */
function parse(argv: Array<string>, _options: IOptions): [string, object] {
    let options = _options || { hasCommand : true, delimeter : '-' };

    let hasCommand = options.hasCommand || true;
    let delimeter = options.delimeter || '-';

    const _args = argv.slice(2);
    let command = null;
    
    if(hasCommand)
        command = _args.shift();

    const args = {};

    for(let i = 0; i < _args.length; i++){
        let _arg: string = _args[i];
        let next_arg: string = i + 1 <= _args.length ? _args[i+ 1] : null;
        let key_name: string = getArgumentName(_arg, delimeter);

        if(!isArgument(_arg, delimeter))
            continue;

        if(isArgument(next_arg, delimeter) || next_arg == null){
            args[key_name] = true;
            continue;
        }

        args[key_name] = next_arg;
        i++;
    }

    return [command, args];
}

export default {parse};