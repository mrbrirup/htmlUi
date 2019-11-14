class extends HTMLElement {
    static get using() { return ["Mrbr.Html.Button","Mrbr.Html.Div","Mrbr.Html.Img"]; }
    constructor() {
        super();
        // element created
        this.button = new Mrbr.Html.Button();
        //this.button.innerHTML = "Hello"
        this.button.style.border = "0px";// "var(--default-control-border)"
        this.button.style.height = "100%"
        this.style.boxSizing = "border-box";
        this.image = new Mrbr.Html.Img();
        this.div = new Mrbr.Html.Div();
        this.image.src = "images/icons8-phone-48.png"
        this.image.style.height = "50%"
        //this.image.height = "50%"
        this.div.style.height = "50%"
        this.div.style.fontSize = ".55rem"        
        this.div.innerHTML = "Phone"
        this.button.addChild(this.image)
        this.button.addChild(this.div)        
        this.appendChild(this.button.element)
        
    }
    connectedCallback() {
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