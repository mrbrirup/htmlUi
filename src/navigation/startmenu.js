class extends HTMLElement {
    constructor() {
        super();
        // element created
        this._template = Mrbr.UI.Utils.Utils.template("Mrbr.UI.Navigation.StartMenu");
        this.shadowroot = this.attachShadow({ mode: 'open' });
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
        if (this.shadowRoot && name === "navlocation") {
            let childMenu = this.shadowRoot.querySelector("mrbr-ui-navigation-menu")
            if (childMenu) { childMenu.setAttribute("navlocation", newValue); }
        }
        const self = this;
        if (!self.shadowRoot) { return; }
        const subMenu = self.shadowRoot.querySelector("mrbr-ui-navigation-menu").shadowRoot.querySelector("mrbr-ui-navigation-menuitem > mrbr-ui-navigation-submenu");
        if (!subMenu) { return; }
        setTimeout(() => {
            subMenu.classList.remove("bottom-left");
            subMenu.classList.remove("left-top");
            subMenu.classList.remove("right-top");
            subMenu.classList.remove("top-left");
            window.requestAnimationFrame(() => {

                switch (newValue) {
                    case "top":
                        subMenu.classList.add("top-left");
                        break;
                    case "bottom":
                        subMenu.classList.add("bottom-left");
                        break;
                    case "left":
                        subMenu.classList.add("left-top");
                        break;
                    case "right":
                        subMenu.classList.add("right-top");
                        break;
                }
            })
            //window.requestAnimationFrame(() => {subMenu.classList.add("fadein");});
        }, parseFloat(getComputedStyle(document.body).getPropertyValue('--default-control-animation-speed')) * 1000)
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}