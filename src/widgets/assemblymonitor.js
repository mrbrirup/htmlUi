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
        self.shadowroot = self.attachShadow({ mode: 'open' })
        self.shadowroot.innerHTML = self._template;
        self.countLabel = self.shadowroot.querySelector("div.mrbr-system-eventhandler-counter");
        self.loadingAnim = self.shadowroot.querySelector("div.mrbr-system-eventhandler-loader");
        self.assembly.loader.on(self.assembly.EVENTS.loadStart, self.onStart.bind(self))
        self.assembly.loader.on(self.assembly.EVENTS.loadComplete, self.onComplete.bind(self))
        if (args && args[0] && args[0].desktop) {
            self.desktop = args[0].desktop;
            self.desktop.addEventListener("mrbr-ui-desktop-navlocation-change", event => self.navlocation = event.detail)
        }
    }
    onComplete(event) {
        const self = this;
        window.requestAnimationFrame(()=>{
            self.pendingCount = self.pendingCount - 1;            

        })
    }
    onStart(event) {
        const self = this;
        self.pendingCount = self.pendingCount + 1;
    }
    _onLoading(event) {
        const self = this;
    }
    _onLoaded(event) {
        const self = this;
    }
    get pendingCount() { return this._pendingCount; }
    set pendingCount(value) {
        const self = this;
        self._pendingCount = value;
        window.requestAnimationFrame(() => {
            if (value > 0 & !self.loadingAnim.classList.contains("mrbr-system-eventhandler-display")) {
                self.loadingAnim.classList.remove("mrbr-system-eventhandler-hidden")
                self.loadingAnim.classList.add("mrbr-system-eventhandler-display")
                window.requestAnimationFrame(() => {
                })
            }
            else if (value <= 0  & !self.loadingAnim.classList.contains("mrbr-system-eventhandler-hidden")) {
                self.loadingAnim.classList.add("mrbr-system-eventhandler-hidden")
                self.loadingAnim.classList.remove("mrbr-system-eventhandler-display")
                window.requestAnimationFrame(() => {
                })
            }
            self.countLabel.innerHTML = value;
        })
    }
    connectedCallback() {     
        const self = this;
        self.pendingCount = 0;
        self.assemblymonitor_click_handler = self._eventHandler.add("click", self.assemblymonitor_click.bind(self),{target:self} )   
    }
    assemblymonitor_click(event){
        const self = this;
        console.log(self.assembly.loader)
    }
    disconnectedCallback() {
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