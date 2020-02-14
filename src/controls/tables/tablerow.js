class {
    static get inherits() {return [];}
    static get using() { return []; }
    static get manifest() { return []; }
    constructor(...args) {
        this.base(...args)        
        this._row = document.createElement("tr");
    }     
    get row(){return this._row;}
    set row(value){this._row = value;}
}