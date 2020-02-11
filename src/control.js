class {
    //static get inherits() {return ["Mrbr.System.Object","Mrbr.Geometry.Rectangle","Mrbr.System.EventEmitter"];}
    static get using() { return []; }
    static get manifest() { return []; }
    constructor(...args) {
        this.base(...args)
        if (args[0] && args[0].id){
            this.id = args[0].id        
        }
        console.log("control constructor")
    }    
}