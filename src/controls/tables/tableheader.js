class {
    static get inherits() { return []; }
    static get using() { return []; }
    static get manifest() { return []; }
    constructor(...args) {
        this.base(...args)
        this._header = document.createElement("thead");
    }
    get header() { return this._header; }
    set header(value) { this._header = value; }
}