class extends HTMLElement {
    constructor() {
        super();
        const self = this;
        self._template = Mrbr.UI.Utils.Utils.template("Mrbr.UI.Widgets.TaskbarSettings");
        self.shadowroot = this.attachShadow({ mode: 'open' });
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
        var self = this;
        self.shadowRoot.innerHTML = self._template;
        window.requestAnimationFrame(() => {
            self.shadowRoot.querySelector("mrbr-ui-navigation-menu").shadowRoot.addEventListener("menuitem_click", function (event) {
                if (event.detail.group === "navlocation") {
                    window.requestAnimationFrame(() => {
                        self.dispatchEvent(
                            new CustomEvent("navlocation", {
                                bubbles: true,
                                cancelable: true,
                                composed: true,
                                detail: {
                                    position: event.detail.menuid
                                }
                            }))
                    })
                }
                event.preventDefault();
            })
        })
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        return ["navlocation"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        const self = this;
        if (!self.shadowRoot) { return; }
        const subMenu = self.shadowRoot.querySelector("mrbr-ui-navigation-menu").shadowRoot.querySelector("mrbr-ui-navigation-menuitem > mrbr-ui-navigation-submenu");
        if (!subMenu) { return; }
        setTimeout(() => {
            subMenu.classList.remove("mrbr-ui-navigation-menu-bottom-right");
            subMenu.classList.remove("mrbr-ui-navigation-menu-left-bottom");
            subMenu.classList.remove("mrbr-ui-navigation-menu-top-right");
            subMenu.classList.remove("mrbr-ui-navigation-menu-right-bottom");
            window.requestAnimationFrame(() => {

                switch (newValue) {
                    case "top":
                        subMenu.classList.add("mrbr-ui-navigation-menu-top-right");
                        break;
                    case "bottom":
                        subMenu.classList.add("mrbr-ui-navigation-menu-bottom-right");
                        break;
                    case "left":
                        subMenu.classList.add("mrbr-ui-navigation-menu-left-bottom");
                        break;
                    case "right":
                        subMenu.classList.add("mrbr-ui-navigation-menu-right-bottom");
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