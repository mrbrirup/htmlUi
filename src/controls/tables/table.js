class extends HTMLElement {
    constructor(...args) {
        super();
        // element created
        //this.innerHTML = '';
        this.shadowroot = this.attachShadow({ mode: 'open' });
        //this.args =args;
        console.log("Table constructor")
        this._header = null;
        this._body = null;
        this._footer = null;
        this._caption = null;
    }
    get caption() { return this._caption; }
    set caption(value) { this._caption = value; }
    get header() { return this._header; }
    set header(value) { this._header = value; }
    get body() { return this._body; }
    set body(value) { this._body = value; }
    get footer() { return this._footer; }
    set footer(value) { this._footer = value; }
    init(...args) {
        this.args = args;
        this.base(...args)
        let config = args[0]
        this.table = document.createElement("table")
        const table = Mrbr.UI.Controls.Tables.Table,
            self = this;

        if (config) {
            self.createCaption(config.caption);
            self.createHeader(config.header);
            self.createBody(config.body);
            self.createFooter(config.footer);
            //if (config.body !== undefined) { this.body = config.body; }
            //if (config.footer !== undefined) { this.footer = config.footer; }
        }
        const style = document.createElement("style");
        style.textContent = this.myStyle;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(this.table);

    }
    createCaption(caption) {
        if (caption === undefined) { return; }    
        const self = this;
        if (typeof caption === "string") {
            self.caption = document.createElement("caption");
            self.caption.appendChild(document.createTextNode(caption))
        }
        else if (caption instanceof HTMLElement) {
            self.caption = caption;
        }
        if (self.caption) {
            self.table.appendChild(self.caption);
        }
        
    }
    createHeader(header) {
        if (header === undefined) { return; }
        const self = this;
        if (typeof header === "boolean" && header === true) {
            self.header = document.createElement("thead");
        }
        else if (header instanceof HTMLElement) {
            self.header = header
        }
        if (self.header) {
            self.table.appendChild(self.header);
        }
    }
    createBody(body){
        if (body === undefined) { return; }
        const self = this;
        if (typeof body === "boolean" && body === true) {
            self.body = document.createElement("tbody");
        }
        else if (body instanceof HTMLElement) {
            self.body = body
        }
        if (self.body) {
            self.table.appendChild(self.body);
        }
    }
    createFooter(footer){
        if (footer === undefined) { return; }
        const self = this;
        if (typeof footer === "boolean" && footer === true) {
            self.footer = document.createElement("tfoot");
        }
        else if (footer instanceof HTMLElement) {
            self.footer = footer
        }
        if (self.footer) {
            self.table.appendChild(self.footer);
        }
    }
    //static get baseElement() {return "table";}
    static get inherits() { return ["Mrbr.UI.Control"]; }


    connectedCallback() {

        //debugger
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        return [/* array of attribute names to monitor for changes */];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
    get myStyle() {
        return ` 
        :host > table{    position: absolute;
        width: 150px;
        height: 150px;
        top: 0px;
        left: 0px;
        background-color: white;
        }

        :host > table  caption {
            width: 100%;            
            background-color: cyan;
            }
    
        
        `

    }
}