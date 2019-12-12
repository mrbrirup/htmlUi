class extends HTMLElement {
    constructor() {
        super();
        // element created
        this._template = Mrbr.UI.Utils.Utils.template("Mrbr.UI.Navigation.StartMenu");
        this.shadowroot = this.attachShadow({
            mode: 'open'
        });
    }
    set navlocation(value) {
        this.setAttribute("navlocation", value)
    }
    get navlocation() {
        if (!this.hasAttribute("navlocation")) {
            return "bottom";
        } else {
            return this.getAttribute("navlocation");
        }
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = this._template;
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)

    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        //return [/* array of attribute names to monitor for changes */];
        return ["navlocation"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if(this.shadowRoot && name==="navlocation"){
            let childMenu = this.shadowRoot.querySelector("mrbr-ui-navigation-menu")
            if(childMenu){childMenu.setAttribute("navlocation",newValue);}
        }
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}