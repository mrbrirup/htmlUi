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
        self.shadowRoot.addEventListener("menuitem_enter", (event) => {
            event.detail.source.classList.add("mrbr-ui-navigation-menu-menuenter")
            const sm = event.detail.source.querySelector("mrbr-ui-navigation-submenu");
            if (sm && sm.parentNode === event.detail.source && event.detail.source.parentNode && event.detail.source.parentNode.tagName && event.detail.source.parentNode.tagName.toLowerCase() !== "mrbr-ui-navigation-menu") {
                self.menuParent_clicked(event.detail.source)
            }
        });
        self.shadowRoot.addEventListener("menuitem_leave", (event) => {
            const subMenu = event.detail.source.querySelector("mrbr-ui-navigation-submenu");
            if (subMenu && subMenu.parentNode === event.detail.source && event.detail.source.parentNode && event.detail.source.parentNode.tagName && event.detail.source.parentNode.tagName.toLowerCase() !== "mrbr-ui-navigation-menu") {
                self.menuParent_clicked(event.detail.source)
                const window_getComputedStyle = window.getComputedStyle;
                ((fn, last) => fn(fn, last))((fn, last) => {
                    window.requestAnimationFrame(() => {
                        let opacity = window_getComputedStyle(subMenu).getPropertyValue("opacity");
                        if (opacity > last) { return; }
                        //(opacity > 0.1) ? fn(fn, opacity) : event.detail.source.classList.remove("mrbr-ui-navigation-menu-menuenter");;
                        (opacity > 0.1) ? fn(fn, opacity) : event.detail.source.querySelectorAll(".mrbr-ui-navigation-menu-menuenter").forEach(node => node.classList.remove("mrbr-ui-navigation-menu-menuenter"));
                    })
                })
            } else {
                event.detail.source.classList.remove("mrbr-ui-navigation-menu-menuenter")

            }
        });
        self.addEventListener("mouseleave", (event) => {
            self.hideMenu();
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
                    (opacity > 0.1) ? fn(fn, opacity) : subMenu.classList.remove("mrbr-ui-navigation-menu-active");
                })
            })
        } else {
            subMenu.classList.add("mrbr-ui-navigation-menu-active");
            window.setTimeout(() => {
                subMenu.classList.add("mrbr-ui-navigation-menu-visible");
            }, getComputedStyle(document.body).getPropertyValue('--default-control-animation-speed') * 1000);
        }
    }
    hideMenu(event) {
        const self = this,
            subMenu = self.shadowRoot.querySelector("mrbr-ui-navigation-submenu"),
            window_getComputedStyle = window.getComputedStyle;
        if (subMenu.classList.contains("mrbr-ui-navigation-menu-visible")) {
            subMenu.classList.remove("mrbr-ui-navigation-menu-visible");
        }
        ((fn, last) => fn(fn, last))((fn, last) => {
            window.requestAnimationFrame(() => {
                let opacity = window_getComputedStyle(subMenu).getPropertyValue("opacity");
                if (opacity > last) {
                    // subMenu.classList.remove("-active");
                    // self.shadowRoot.querySelectorAll(".mrbr-ui-navigation-menu-menuenter").forEach(_ => { _.classList.remove("mrbr-ui-navigation-menu-menuenter") });
                    // self.shadowRoot.querySelectorAll(".-active").forEach(_ => { _.classList.remove("-active") });
                    // self.shadowRoot.querySelectorAll(".-visible").forEach(_ => { _.classList.remove("-visible") });
                    self.clearActiveMenu(subMenu);
                    return;
                }
                if (opacity > 0.1) { fn(fn, opacity) }
                else {
                    // console.log("1", opacity);
                    // subMenu.classList.remove("-active");
                    // console.log("2", opacity);
                    // self.shadowRoot.querySelectorAll(".mrbr-ui-navigation-menu-menuenter").forEach(_ => { console.log(_); _.classList.remove("mrbr-ui-navigation-menu-menuenter") });
                    // self.shadowRoot.querySelectorAll(".-active").forEach(_ => { console.log(_); _.classList.remove("-active") });
                    // self.shadowRoot.querySelectorAll(".-visible").forEach(_ => { console.log(_); _.classList.remove("-visible") });
                    self.clearActiveMenu();
                };
            })
        })
        //}
    }
    clearActiveMenu(menu){
        const self = this;
        menu = menu || self.shadowRoot;
        let menuClassList = menu.classList;
        if (menuClassList && menu.tagName.toLowerCase().indexOf("mrbr-ui-navigation") >=0 ){
            window.requestAnimationFrame(()=>{
                menuClassList.remove("mrbr-ui-navigation-menu-menuenter") ;
                menuClassList.remove("mrbr-ui-navigation-menu-active");
                menuClassList.remove("mrbr-ui-navigation-menu-visible");
            })
        }
        menu.childNodes.forEach(child =>self.clearActiveMenu(child)  );
    }
    menuItem_clicked(menu) {
        const self = this;
        self.dispatchEvent(Mrbr.UI.Navigation.Menu_Click_EventArgs.create(menu))
        //self.clearActiveMenu();
        //this.hideMenu(menu);
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