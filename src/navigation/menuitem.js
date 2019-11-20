class extends HTMLElement {
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [
            /*new entry(entry.FileTypes.Style, "Mrbr.UI.Navigation.Menu"),*/
            new entry(entry.FileTypes.Component, "Mrbr.UI.Navigation.SubMenu")
        ];
    }
    constructor() {
        super();
        // element created
         //this.innerHTML = '';
        }
        get label(){return this.getAttribute('label');}
        set label(value){this.setAttribute('label', value );}
        get submenu() {
            return this.hasAttribute('submenu');
      }
      
      set submenu(val) {
        // Reflect the value of `disabled` as an attribute.
        if (val) {
            this.setAttribute('submenu', '');
        } else {
            this.removeAttribute('submenu');
        }
    }
    connectedCallback() {
        this.text = document.createElement("a");
        this.text.appendChild(document.createTextNode(this.label))
        this.appendChild(this.text)
        if(this.submenu === true){
            this.menuItems = document.createElement("mrbr-ui-navigation-submenu");            
            this.appendChild(this.menuItems)
        }
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