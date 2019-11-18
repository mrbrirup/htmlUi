class extends HTMLElement {
        static get manifest() {   
            const entry = Mrbr.System.ManifestEntry;      
            return [
            new entry(entry.FileTypes.Style, "Mrbr.UI.Controls.Button")
        ]; }
    constructor() {
        super();
        this._button = null;
    }
    get button() { return this._button; }
    set button(value) { this._button = value; }
    get displayStyle() { return this.getAttribute('displayStyle'); }
    set displayStyle(value) { this.setAttribute('displayStyle', value); }
    get orientation() { return this.getAttribute('orientation'); }
    set orientation(value) { this.setAttribute('orientation', value); }
    get src() { return this.getAttribute('src'); }
    set src(value) { this.setAttribute('src', value); }
    get text() { return this.getAttribute('text'); }
    set text(value) { this.setAttribute('text', value); }
    get order() { return this.getAttribute('order'); }
    set order(value) { this.setAttribute('order', value); }
    connectedCallback() {
        let displayStyle = (this.src !== undefined && this.src !== null) ? 1 : 0;
        displayStyle += (this.text !== undefined && this.text !== null) ? 2 : 0;
        // const displayStyle = this.displayStyle;        
        let order = (this.order || "imageText").toLowerCase(),
        orientation = (this.orientation || "horizontal").toLowerCase();
        switch (displayStyle) {
            case 1:
                this.button = document.createElement("button")
                this.image = document.createElement("img")
                this.image.className  = `button-image`;
                this.image.src = this.src;
                this.buttonDisplay = document.createElement("div")
                this.buttonDisplay.className = `button-display`;                
                this.buttonDisplay.appendChild(this.image)
                this.button.style.height = "100%"
                this.button.appendChild(this.buttonDisplay);
                break;
            case 2:
                this.button = document.createElement("button");
                this.button.appendChild(document.createTextNode(this.text));
                break;
            case 3:
                this.button = document.createElement("button");
                this.buttonDisplay = document.createElement("div")
                this.buttonDisplay.className = `button-display button-display-${order}-${orientation}`;
                this.image = document.createElement("img")
                this.image.className  = `button-image button-display-content-${orientation}`;
                this.image.src = this.src;
                this.textNode = document.createElement("div");
                this.textNode.className = `text-div button-display-content-${orientation}`
                this.textNode.appendChild(document.createTextNode(this.text));
                this.buttonDisplay.appendChild(this.image)
                this.buttonDisplay.appendChild(this.textNode);
                this.button.appendChild(this.buttonDisplay);
                this.appendChild(this.button)                  
                break;
            case "textimage":
                break;
            default:
                break;
        }
        this.appendChild(this.button)
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