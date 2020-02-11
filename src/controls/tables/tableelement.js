class extends HTMLTableElement  {
    constructor(...args) {
        super();
        // element created
        this.innerHTML = '';
        //console.log(this);
        //this.args = args;
        //this.base(...args)
        //debugger
    }
    //static get inherits() {return ["Mrbr.UI.Control"];}
    static get baseElement() {return "table";}
    connectedCallback() {
        const th = document.createElement("th")
        th.innerHTML=("Hello")
        this.appendChild(th);
        self.shadowroot = this.attachShadow({ mode: 'open' });
        //this.base(this.args)
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
}