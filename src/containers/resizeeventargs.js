class {
    static get inherits() { return ["Mrbr.System.EventArgs"]; }
    static get using() { return []; }
    static get manifest() { return []; }
    constructor(...args) {
        if(args.length === 0){
            args = [];
            args[0] = {};
        }
        if(args[0].eventArgs === undefined){
            args[0].eventArgs = {
                width : 0,
                height : 0
            }
        }
        this.base(...args)
    }
    get width(){return this.eventArgs.width;}
    set width(value){this.eventArgs.width = value;}
    get height(){return this.eventArgs.height;}
    set height(value){this.eventArgs.height = value;}
}