class extends HTMLElement {
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [
            new entry(entry.FileTypes.Style, "Mrbr.UI.Navigation.Menu"),
            new entry(entry.FileTypes.Component, "Mrbr.UI.Navigation.SubMenu"),
            new entry(entry.FileTypes.Component, "Mrbr.UI.Navigation.MenuItem")
        ];
    }
    constructor() {
        super();
        // element created
    }
    connectedCallback() {
        this.nav = document.createElement("nav");
        this.appendChild(this.nav);
        this.rootMenu = document.createElement("mrbr-ui-navigation-submenu");    
        this.nav.appendChild(this.rootMenu);
    }
    get direction(){return this.getAttribute('direction');}
    set direction(value){this.setAttribute('direction', value );}
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