class {
    static get inherits() { return []; }
    static get using() { return []; }
    static get manifest() { return []; }
    constructor(source) {
        this._source = source || {};
        this._data = source.data || null;
        this._menuid = source.menuid || "";
        this._text = source.text || ""
        this._href = source.href || "";
        this._type = source.type || "";
        this._group = source.group || "";
    }
    get source() { return this._source; }
    set source(value) { this._source = value; }
    get data() { return this._data; }
    set data(value) { this._data = value; }
    get menuid() { return this._menuid; }
    set menuid(value) { this._menuid = value; }
    get text() { return this._text; }
    set text(value) { this._text = value; }
    get href() { return this._href; }
    set href(value) { this._href = value; }
    get type() { return this._type; }
    set type(value) { this._type = value; }
    get group() { return this._group; }
    set group(value) { this._group = value; }
    static create(source, eventType) {
        return new CustomEvent(eventType || 'menuitem_click', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: new Mrbr.UI.Navigation.Menu_Click_EventArgs(source)
        })
    }
}