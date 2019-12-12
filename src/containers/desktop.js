class extends HTMLElement {
    static get manifest() {
        const componentManifest = Mrbr.UI.Utils.Utils.componentManifest;
        return componentManifest("Mrbr.UI.Widgets.Clock", true, true).concat(componentManifest("Mrbr.UI.Widgets.TaskbarSettings", true, true)).concat(componentManifest("Mrbr.UI.Navigation.Menu", true, false)).concat(componentManifest("Mrbr.UI.Navigation.StartMenu", true, true))
    }
    constructor(config) {
        super();
        config = config || {}
        this.navlocation = config.navlocation || "bottom";
        const utils = Mrbr.UI.Utils.Utils;
        this.id = utils.uniqueId();
        this.desktopId = utils.uniqueId();
        this.menuMenuId = utils.uniqueId();
        this.menuControlBoxId = utils.uniqueId();
        this.navHomeId = utils.uniqueId();
        this._template = utils.template("Mrbr.UI.Containers.Desktop", ["{{mrbr:menuControlBoxId}}", "{{mrbr:navlocation}}", "{{mrbr:desktopId}}", "{{mrbr:menuMenuId}}"], [this.menuControlBoxId, this.navlocation, this.desktopId, this.menuMenuId]);
        this._initialised = false;
        var self = this;
        this.addEventListener("menu-host", function (event) {
            event.detail.callback(self.desktop);
            event.stopPropagation()
        }, { capture: true })
    }
    set desktop(value) { this._desktop = value; }
    get desktop() { return this._desktop; }
    get initialised() {
        return this._initialised;
    }
    set initialised(value) {
        this._initialised = value;
    }
    get template() {
        return this._template;
    }
    set template(value) {
        this._template = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get desktopId() {
        return this._desktopId;
    }
    set desktopId(value) {
        this._desktopId = value;
    }
    get menuMenuId() {
        return this._menuMenuId;
    }
    set menuMenuId(value) {
        this._menuMenuId = value;
    }
    get menuControlBoxId() {
        return this._menuControlBoxId;
    }
    set menuControlBoxId(value) {
        this._menuControlBoxId = value;
    }
    get navHomeId() {
        return this._navHomeId;
    }
    set navHomeId(value) {
        this._navHomeId = value;
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
    set controlBox(value) { this._controlBox = value; }
    get controlBox() { return this._controlBox }
    connectedCallback() {
        if (!this.initialised) {
            self = this;
            this.innerHTML = this.template;
            this.desktop = document.getElementById(this.desktopId);
            this.controlBox = document.getElementById(this.menuControlBoxId);
            this.startMenu = document.getElementById(this.menuMenuId);
            this.initialised = true;
            this.setChildPositions(this.navlocation);
            this.addEventListener("navlocation", (event)=>{
                if(self.navlocation !== event.detail.position){
                    self.classList.remove("fadein");
                    self.classList.add("fadeout");
                    setTimeout(() => {
                        self.navlocation= event.detail.position;
                    },parseFloat(getComputedStyle(document.body).getPropertyValue('--default-control-animation-speed')) * 1000)
                }
            })
        }
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        return ["navlocation"];
    }
    setChildPositions(position) {
        const self = this,
        ctrlBox = document.getElementById(self.menuControlBoxId);
        if (this.childNodes && self.childNodes.length > 0) {
            this.childNodes.forEach(node => {
                if (node.setAttribute) { node.setAttribute("navlocation", position) };
                if (node.childNodes && node.childNodes.length > 0) {
                    node.childNodes.forEach(childNode => {
                        if (childNode.setAttribute) { childNode.setAttribute("navlocation", position) }
                    });
                }
            });
        }
        if (ctrlBox !== undefined && ctrlBox !== null) {
            if (ctrlBox.childNodes !== undefined && ctrlBox.childNodes !== null) {
                ctrlBox.childNodes.forEach(node => {
                    if (node.setAttribute) {
                        node.setAttribute("navlocation", position);
                    }
                });
            }
        }
        self.startMenu.setAttribute("navlocation", position)
    }
    attributeChangedCallback(name, oldValue, newValue) {
        const self = this;
        if (name === "navlocation" && this.initialised === true) {
            self.setChildPositions(newValue);                                
            setTimeout(() => {
                window.requestAnimationFrame(()=>{                    
                    self.classList.add("fadein");
                    self.classList.remove("fadeout");
                }) 
            }, parseFloat(getComputedStyle(document.body).getPropertyValue('--default-control-animation-speed')) * 1000);
        }
        ;
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}