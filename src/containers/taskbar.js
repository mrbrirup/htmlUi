class extends HTMLElement {
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [
            new entry(entry.FileTypes.Component, "Mrbr.UI.Controls.ImageButton")
        ];
    }
    constructor() {
        super();
        // element created
        //this.innerHTML = '';
        this.style.height = "var(--default-control-toolbar-size)";
        this.style.backgroundColor = "var(--default-control-background-color)";
        this.style.boxSizing = "border-box"
        this.button = new Mrbr.UI.Controls.ImageButton();
    }
    connectedCallback() {
        this.appendChild(this.button)
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