class extends HTMLElement {
    static get using() { return ["Mrbr.System.EventHandler"]; }
    constructor(...args) {
        super();
        // element created
        this._pendingCount = 0;
        const self = this;
        self._template = Mrbr.UI.Utils.Utils.template("Mrbr.UI.Widgets.AssemblyMonitor");
        self._eventHandler = new Mrbr.System.EventHandler({ target: self });
        self.assembly = Mrbr.System.Assembly;

        //        self.assembly.fileInterceptor.pre(
        //         new function(){},
        //         //self.loaded.bind(self),
        //         self
        //    )
        self.shadowroot = self.attachShadow({ mode: 'open' })
        self.shadowroot.innerHTML = self._template;
        self.countLabel = self.shadowroot.querySelector("div");
        self._loaded_handle = self._eventHandler.add('mrbr-ui-widgets-assemblymonitor-loaded', self._onLoading.bind(self), { target: self });
        self._loading_handle = self._eventHandler.add('mrbr-ui-widgets-assemblymonitor-loading', self._onLoaded.bind(self), { target: self });
        if (args && args[0] && args[0].desktop) {

            self.desktop = args[0].desktop;
            self.desktop.addEventListener("mrbr-ui-desktop-navlocation-change", event => self.navlocation = event.detail)
            //self.dispatchEvent(new CustomEvent(, { detail: self.navlocation }))
        }
    }
    loaded(entry) {
        const self = this;
        //self.dispatchEvent(new CustomEvent("mrbr-ui-widgets-assemblymonitor-loaded", { detail: { entry: entry } }));
       // return entry;
    }
    loading(entry,b,c,d,e) {
        debugger
        const self = this;
        //self.dispatchEvent(new CustomEvent("mrbr-ui-widgets-assemblymonitor-loading", { detail: { entry: entry } }));
     //   return entry;
    }
    _onLoading(event) {
        const self = this;
        //self.pendingCount = self.pendingCount+1;
        //console.log(`Loading: ${event.detail.entry.url}`)
    }
    _onLoaded(event) {
        const self = this;
        //self.pendingCount = self.pendingCount-1;
        //console.log(`Loaded: ${event.detail.entry.url}`)
        
    }
    get pendingCount() { return this._pendingCount; }
    set pendingCount(value) {
        const self = this;
        self._pendingCount = value;
        window.requestAnimationFrame(() => {
            self.countLabel.innerHTML = value;
        })
    }
    connectedCallback() {
        this.pendingCount = 0;
        const self = this;
        self.assembly.fileInterceptor.pre(
            self.loading.bind(self),
            //self.loaded.bind(self),
            self
        )
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        return ["navlocation"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
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
}