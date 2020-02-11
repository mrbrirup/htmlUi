class  extends HTMLElement {
    constructor(...args) {
        super();
        // element created
        //this.innerHTML = '';
        this.shadowroot = this.attachShadow({ mode: 'open' });
        //this.args =args;
        console.log("Table constructor")
    }
    init(...args){
        this.args =args;
        this.base(...args)
    }
    //static get baseElement() {return "table";}
    static get inherits() {return ["Mrbr.UI.Control"];}
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
}