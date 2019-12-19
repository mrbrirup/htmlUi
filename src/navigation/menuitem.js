class extends HTMLElement {
    constructor() {
        super();
        this._data = null;
    }
    get parentMenu() { return this.hasAttribute('parentmenu'); }
    set parentMenu(value) {

        if (value) {
            this.setAttribute('parentmenu', '');
        } else {
            this.removeAttribute('parentmenu');
        }


    }
    get group(){return this.getAttribute('group');}
    set group(value){this.setAttribute('group', value );}
    get data(){return this._data;}
    set data(value){this._data = value;}
    get menuid() { return this.getAttribute('menuid'); }
    set menuid(value) { this.setAttribute('menuid', value); }
    get icon() { return this.getAttribute('icon'); }
    set icon(value) { this.setAttribute('icon', value); }
    get text() { return this.getAttribute('text'); }
    set text(value) { this.setAttribute('text', value); }
    get href() { const href = this.getAttribute('href'); return (!href || href === "") ? "#" : href; }
    set href(value) { this.setAttribute('href', value); }
    get type() {
        if (this.hasAttribute("type")) {
            return this.getAttribute('type');
        }
        else { return 'standard' }
    }
    set type(value) { this.setAttribute('type', value); }
    set navLocation(value) {
        this.setAttribute("navlocation", value)
    }
    get navLocation() {
        if (!this.hasAttribute("navlocation")) {
            return "bottom";
        } else {
            return this.getAttribute("navlocation");
        }
    }
    connectedCallback() {
        this.id = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');
        const text = this.text;
        this.childNodes.forEach(node => { if (node.tagName && node.tagName.toLowerCase() === "mrbr-ui-menu" && !(node.classList.contains("-hasSubmenu"))) { this.classList.add("-hasSubmenu") } });
        const div = document.createElement("div");
        if(this.icon !== null){div.style.backgroundImage = `url(${this.icon})`; }
        const a = document.createElement("a"),
            txt = document.createTextNode(this.text);

        a.appendChild(txt);
        this.prepend(a);
        this.prepend(div);
        const div2 = document.createElement("div");
        this.appendChild(div2);
        const self = this;
        window.requestAnimationFrame(() => {
            self.addEventListener("click", (event) => {
                self.dispatchEvent(Mrbr.UI.Navigation.Menu_Click_EventArgs.create(self));
                event.preventDefault()
            })
            self.addEventListener("mouseenter", (event) => {
                self.dispatchEvent(Mrbr.UI.Navigation.Menu_Click_EventArgs.create(self, "menuitem_enter"));
                event.preventDefault()
            })
            self.addEventListener("mouseleave", (event) => {
                self.dispatchEvent(Mrbr.UI.Navigation.Menu_Click_EventArgs.create(self,"menuitem_leave"));
                event.preventDefault()
                //self.style.backgroundColor = "transparent";
            })

        })
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}