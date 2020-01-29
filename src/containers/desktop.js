class extends HTMLElement {
    static get manifest() {
        const componentManifest = Mrbr.UI.Utils.Utils.componentManifest,
            entry = Mrbr.System.ManifestEntry;


        return componentManifest("Mrbr.UI.Widgets.Clock", true, true)
            .concat(componentManifest("Mrbr.UI.Widgets.TaskbarSettings", true, true))
            .concat(componentManifest("Mrbr.UI.Navigation.Menu", true, false))
            .concat(componentManifest("Mrbr.UI.Navigation.StartMenu", true, true))
            //.concat(componentManifest("Mrbr.UI.Dialogs.Dialog", true, true))
            .concat(componentManifest("Mrbr.UI.Widgets.AssemblyMonitor", true, true))
            //.concat([new entry(entry.FileTypes.Component, "Mrbr.UI.Widgets.AssemblyMonitor")])
            
            //.concat([new entry(entry.FileTypes.Component, "Mrbr.UI.Dialogs.Dialog")])
        //.concat([new entry(entry.FileTypes.Style, "Mrbr.UI.Dialogs.Dialog")]);
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
        this._layers = [];
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
            this.addEventListener("navlocation", (event) => {
                if (self.navlocation !== event.detail.position) {
                    self.classList.remove("fadein");
                    self.classList.add("fadeout");
                    setTimeout(() => {
                        self.navlocation = event.detail.position;
                        self.dispatchEvent(new CustomEvent("mrbr-ui-desktop-navlocation-change", { detail: self.navlocation }))
                    }, parseFloat(getComputedStyle(document.body).getPropertyValue('--default-control-animation-speed')) * 1000)
                }
            })
            self.assemblyMonitor = new Mrbr.UI.Widgets.AssemblyMonitor({desktop:self})
            //self.assemblyMonitor = new Mrbr.UI.Widgets.AssemblyMonitor()
            // d.style.width = "24px"
            // d.style.height = "24px"
            // d.style.backgroundColor = "red";
            self.controlBox.prepend(self.assemblyMonitor);
            self.addEventListener("mrbr-control-layer-focused", self.layerFocused.bind(self));
            self.addEventListener("mrbr-control-layer-register", self.layerRegister.bind(self));
            self.addEventListener("mrbr-control-layer-unregister", self.layerUnregister.bind(self));
            window.requestAnimationFrame(() => {
                self.dispatchEvent(new CustomEvent("mrbr-ui-desktop-navlocation-change", { detail: self.navlocation }))
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
                window.requestAnimationFrame(() => {
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
    get layers() { return this._layers }
    set layers(value) { this._layers = value; }
    layerFocused(event) {
        //event.detail.source.style.zIndex = 100;
        //       debugger
        this.relayer(event.detail.source);
    }
    layerRegister(event) {
        //     debugger
        const self = this;
        const target = event.detail.source;
        this.layers.push(target)
        let targetStyleZIndex = target.style.zIndex
        if (targetStyleZIndex === "" || !targetStyleZIndex) {
            target.style.zIndex = self.layers.length * 10;
            //target.style.zIndex = target.style.zIndex ? target.style.zIndex : 0;
        }
    }
    layerUnregister(event) {
        const target = event.detail.source;
        //delete this.layers[target];
    }
    relayer(target) {
        const self = this;
        let keysSorted = self.layers.sort(function (a, b) {
            return parseInt(a.style.zIndex) - parseInt(b.style.zIndex);
        })
        for (let layerCounter = 0; layerCounter < self.layers.length; layerCounter++) {
            if (keysSorted[layerCounter].pin === "pinned") {
                keysSorted[layerCounter].style.zIndex = self.layers.length * 10 + layerCounter * 10;
            }
            else {
                keysSorted[layerCounter].style.zIndex = layerCounter * 10;
            }
        }
        if (target.pin === "pinned") {
            target.style.zIndex = target.style.zIndex *10 + 1 +  self.layers.length;
        }
        else {
            target.style.zIndex = self.layers.length * 10 + 1;
        }

    }
}