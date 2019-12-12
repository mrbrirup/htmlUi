class {
    static get inherits() { return ["Mrbr.Html.Div", "Mrbr.UI.Control"]; }
    static get using() { return ["Mrbr.Html.Body", "Mrbr.UI.Containers.ResizeEventArgs", "Mrbr.Utils.Events"]; }
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [
            new entry(entry.FileTypes.Style, "Mrbr.UI.Containers.AppContainer"),
            new entry(entry.FileTypes.Style, "Mrbr.UI.Style.Default")
        ];
    }
    constructor(...args) {
        let self = this;
        if (args === undefined || args.length === 0) {
            args = [];
            args[0] = {};
        }
        if (args[0].id === undefined) {
            args[0].id = "appContainer";
        }
        self.base(...args)
        self.body = new Mrbr.Html.Body({ element: document.getElementsByTagName("body")[0] });
        let bodyInnerHTML = self.body.innerHTML;
        self.body.innerHTML = "";
        self.body.addChild(self);
        self.innerHTML = bodyInnerHTML;
        self.classList.add("Mrbr-UI-Containers-AppContainer");
        self.timeOut = false;
        self.timeOutDelay = 125;
        self.debounce = Mrbr.Utils.Events.debounce;
        self.wireEvents();
    }
    wireEvents() {
        const self = this,
            selfTimeOut = self.timeOut,
            selfTimeOutDelay = self.timeOutDelay,
            selfDebounce = self.debounce.bind(self),
            selfEmitResize = self.emitResize.bind(self),
            selfResize = selfDebounce(selfEmitResize, selfTimeOutDelay, false, self, selfTimeOut);
            selfResize();
        window.addEventListener('resize', selfResize);
    }
    emitResize() {
        let self = this,
            size = self.getResizeEventArgs(self);
        self.width = size.width;
        self.height = size.height;
        self.emit("appcontainer-resize", size);
    }
    getResizeEventArgs(source) {
        return new Mrbr.UI.Containers.ResizeEventArgs({
            source: source,
            eventArgs: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    }
}