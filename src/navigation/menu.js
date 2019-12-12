class extends HTMLElement {
    static get manifest() {
        const componentManifest = Mrbr.UI.Utils.Utils.componentManifest,
            entry = Mrbr.System.ManifestEntry;

        return componentManifest("Mrbr.UI.Navigation.MenuItem", false, false)
            .concat(componentManifest("Mrbr.UI.Navigation.SubMenu", false, false))
            .concat([new entry(entry.FileTypes.Class, "Mrbr.UI.Navigation.Menu_Click_EventArgs")]);
    }
    constructor(config) {
        super();
        config = config || {};
        const self = this;
        self._container = null;
        self._menucontainer = null;
        if (config.menucontainer !== undefined && config.menucontainer !== null) {
            self.menucontainer = config.menucontainer;
        }
        self.shadowroot = self.attachShadow({ mode: 'open' });
        self._template = config.content ? config.content : this.innerHTML;
        self._template1 = Mrbr.UI.Utils.Utils.template("Mrbr.UI.Navigation.Menu");
    }
    get menucontainer() { return this._menucontainer; }
    set menucontainer(value) { this._menucontainer = value; }
    get active() { return this.hasAttribute('active'); }
    set active(isActive) {
        if (isActive) {
            this.setAttribute('active', '');
        } else {
            this.removeAttribute('active');
        }
    }
    get container() { return this._container; }
    set container(value) { this._container = value; }
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
    menuParent(parent) { this.menucontainer = parent; }
    connectedCallback() {
        const self = this;
        self.innerHTML = "";
        self.shadowRoot.innerHTML = self._template + self._template1;
        if (!self.menucontainer) {
            window.requestAnimationFrame(() => {
                self.dispatchEvent(
                    new CustomEvent('menu-host', {
                        bubbles: true,
                        composed: true,
                        cancelable: true,
                        detail: {
                            callback: self.menuParent.bind(self)
                        }
                    }));
            })
        }
        self.shadowRoot.addEventListener("menuitem_click", (event) => {
            self.active = !self.active;
            self.menu_clicked(event);
        });
    }
    menu_clicked(event) {
        const menu = event.target,
            self = this;
        if (menu.tagName.toLowerCase() !== "mrbr-ui-navigation-menuitem") { return; }
        const subMenu = menu.querySelector("mrbr-ui-navigation-submenu");
        if (subMenu !== undefined && subMenu !== null) {
            self.menuParent_clicked(menu);
        }
        else {
            self.menuItem_clicked(menu);
        }
    }
    menuParent_clicked(menu) {
        const subMenu = menu.querySelector("mrbr-ui-navigation-submenu"),
            window_getComputedStyle = window.getComputedStyle;
        if (subMenu.classList.contains("-visible")) {
            subMenu.classList.remove("-visible");
            ((fn, last) => fn(fn, last))((fn, last) => {
                window.requestAnimationFrame(() => {
                    let opacity = window_getComputedStyle(subMenu).getPropertyValue("opacity");
                    if (opacity > last) { return; }
                    (opacity > 0.1) ? fn(fn, opacity) : subMenu.classList.remove("-active");
                })
            })
        } else {
            subMenu.classList.add("-active");
            window.requestAnimationFrame(() => {
                subMenu.classList.add("-visible");
            })
        }
    }
    menuItem_clicked(menu) {
        this.dispatchEvent(Mrbr.UI.Navigation.Menu_Click_EventArgs.create(menu))
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }

}