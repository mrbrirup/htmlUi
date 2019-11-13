class extends HTMLElement {
    static get inherits() { return []; }
    static get using() { return []; }
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [
            new entry(entry.FileTypes.Class, "Mrbr.Html.Div"),
            new entry(entry.FileTypes.Component, "Mrbr.UI.Containers.Splitter"),
            new entry(entry.FileTypes.Style, "Mrbr.UI.Containers.Docker")
        ];
    }
    static get orientation() {
        return {
            horizontal: "horizontal",
            vertical: "vertical"
        }
    }
    static get panelPosition(){
        return {
            top:1,
            left:1,
            bottom:2,
            right:2
        }
    }
    static get resizePosition(){
        return {
            top:1,
            left:1,
            bottom:2,
            right:2
        }
    }
    static get RxOrientation(  ){return /-orientation-/ ;}
    static get RxContainer(  ){return /-container/ ;}
    constructor(config) {
        super();
        this.shadow = this.attachShadow({mode:'open'});
        this.classList.add("Mrbr-UI-Containers-Docker")
        this.classList.add("docker-horizontal-column")
        config = config || {};
        const docker = Mrbr.UI.Containers.Docker,
        self = this;
        self.orientation = (config.orientation !== undefined) ? config.orientation : docker.orientation.horizontal;
        self.panelPositions = config.panelPositions || 7;
        self.resizePositions = config.resizerPositions || 3;

        let panelHtml = [];
        if (self.panelPositions & docker.panelPosition.top) { 
            panelHtml.push('<div id="first-horizontal-panel" class="docker-panel-default docker-panel-vertical docker-panel-first"></div>') 
            if(self.resizePositions & docker.resizePosition.top){
                panelHtml.push('<mrbr-ui-containers-splitter id="splitter1" direction="top"  class="docker-panel-default docker-panel-vertical docker-resizer-first resize-bar-horizontal"></mrbr-ui-containers-splitter>');
            }
        }
        panelHtml.push('<div class="docker-panel-default docker-panel-vertical docker-panel-centre"></div>')
        if (self.panelPositions & docker.panelPosition.bottom) { 
            if(self.resizePositions & docker.resizePosition.bottom){
                panelHtml.push('<mrbr-ui-containers-splitter id="splitter2"  class="docker-panel-default docker-panel-vertical docker-resizer-last resize-bar-horizontal"></mrbr-ui-containers-splitter>');
                panelHtml.push('<div id="last-horizontal-panel" direction="bottom" class="docker-panel-default docker-panel-vertical docker-panel-last"></div>') 
            }
            else{
                panelHtml.push('<div id="last-horizontal-panel" class="docker-panel-default docker-panel-vertical docker-panel-last"></div>') 
            }
        }


        self._panels = [];
        self._resizers = {};
        if (self.orientation === docker.orientation.horizontal) {
        }
        else{
        }
        this.shadow.innerHTML =  `<style>
        .docker-horizontal-column {
            display: flex;
            flex-direction: column;
            flex-flow: column nowrap;
            width: 100%;
            height: 100%;
        }
        
        .docker-vertical-row {
            display: flex;
            flex-direction: row;
            flex-flow: row nowrap;
            width: 100%;
            height: 100%;
        }
        
        .docker-panel-default {
            box-sizing: border-box;
            display: flex;
            flex-flow: nowrap;
            flex-direction: column;
            padding: var(--default-control-padding);
            overflow: hidden;
        }
        
        .docker-panel-horizontal {
            height: inherit;
        }
        
        .docker-panel-vertical {
            width: inherit;
        }
        
        .resize-bar-horizontal {
            background-color: var(--default-control-background-color);
            height: var(--default-control-resize-bar-size);
            cursor: ns-resize;
            box-sizing: border-box;
        }
        
        .resize-bar-vertical {
            background-color: var(--default-control-background-color);
            width: var(--default-control-resize-bar-size);
            cursor: ew-resize;
            box-sizing: border-box;
        }
        
        .docker-panel-first {
            order: 1;
            background-color: red;
        }
        
        .docker-resizer-first {
            order: 2;
        }
        
        .docker-panel-centre {
            flex: 1;
            order: 3;
            padding: 0%;
            background-color: green;
        }
        
        .docker-resizer-last {
            order: 4;
        }
        
        .docker-panel-last {
            order: 5;
            background-color: blue;
        }
        </style>` +  "<div class='docker-horizontal-column'>" +  panelHtml.join("") +"</div>";
        self.shadowRoot.getElementById("splitter1").resizeTarget =self.shadowRoot.getElementById("first-horizontal-panel")
        self.shadowRoot.getElementById("splitter2").resizeTarget=self.shadowRoot.getElementById("last-horizontal-panel")
        self.config = config;
        self.init(config);
    }    
    get resizers(){return this._resizers;}
    set resizers(value){this._resizers = value;}
    get orientation() { return this._orientation; }
    set orientation(value) { this._orientation = value; }
    get panels() { return this._panels; }
    set panels(value) { this._panels = value; }
    get contentPanel(){return this.panels[1]}


    // <div class="app-container">
    //     <div class="docker-horizontal-column">
    //         <div id="first-horizontal-panel" class="docker-default-panel docker-panel-vertical docker-first-panel"></div>
    //         <div id="docker-first-resizer1" class="docker-default-panel docker-panel-vertical docker-first-resizer resize-bar-horizontal"></div>
    //         <div class="docker-default-panel docker-panel-vertical docker-centre-panel">
    //             <div class="docker-vertical-row">
    //                 <div id="first-vertical-panel" class="docker-default-panel docker-horizontal-panel docker-first-panel"></div>
    //                 <div id="docker-first-resizer" class="docker-default-panel docker-horizontal-panel docker-first-resizer resize-bar-vertical"></div>
    //                 <div class="docker-default-panel docker-horizontal-panel docker-centre-panel"></div>
    //                 <div id="docker-last-resizer" class="docker-default-panel docker-horizontal-panel  docker-last-resizer resize-bar-vertical"></div>
    //                 <div id="last-vertical-panel" class="docker-default-panel docker-horizontal-panel docker-last-panel"></div>
    //             </div>
    //         </div>
    //         <div id="docker-last-resizer1" class="docker-default-panel docker-panel-vertical docker-last-resizer resize-bar-horizontal"></div>
    //         <div id="last-horizontal-panel" class="docker-default-panel docker-panel-vertical docker-last-panel"></div>
    //     </div>
    // </div>








    init(config) {

    }
    get currentResizer() {
        return this._currentResizer;
    }
    set currentResizer(value) { this._currentResizer = value; }
    connectedCallback() {
        var self = this;


        // const self = this,
        // config = self.config,
        // docker = Mrbr.UI.Containers.Docker,
        // MrbrUIContainersDocker = Mrbr.UI.Containers.Docker,
        // rxOrientation = MrbrUIContainersDocker.RxOrientation,
        // rxContainer = MrbrUIContainersDocker.RxContainer,
        // orientation = self.orientation,
        // MrbrHtmlDiv = Mrbr.Html.Div,
        // panelSuffix = ["first", "centre", "last"];
        // //self.attachShadow({ mode: 'open' });

        // //self.classList.add("docker-orientation-column".replace(rxOrientation,`-${orientation}-`))
        // self.classList.add("docker-horizontal-column")

        // if (typeof self._currentResizer === undefined) { self._currentResizer = null; }
        
        // if (self.panelPositions & docker.panelPosition.top &&  self.resizePositions & docker.resizePosition.top){
        //     //self.resizers["docker-first-resizer1"] = [self.shadowRoot.getElementById("docker-first-resizer1"), self.shadowRoot.getElementById("first-horizontal-panel"), 1];
        // }
        // if (self.panelPositions & docker.panelPosition.bottom && self.resizePositions & docker.resizePosition.bottom){
        //     self.resizers["docker-last-resizer1"] = [self.shadowRoot.getElementById("docker-last-resizer1"), self.shadowRoot.getElementById("last-horizontal-panel"), -1];
        // }

        // self.currentResizer = null;
        // Object.keys(self.resizers).forEach(resizePair => {
        //     let resizer = self.resizers[resizePair][0];
        //     let element = self.resizers[resizePair][1];
        //     resizer = self.shadowRoot.getElementById(resizer.id);
        //     element = self.shadowRoot.getElementById(element.id);
        //     resizer.addEventListener('mousedown', self.initResize.bind(self), false);
        // });
        // self.timeOut = false;
        // self.timeOutDelay = 1;
        // const selfTimeOut = self.timeOut,
        // selfTimeOutDelay = self.timeOutDelay,
        // selfDebounce = Mrbr.UI.Containers.Docker.debounce.bind(self);
        // self.event_resizeHandle = selfDebounce(self.resize.bind(self), selfTimeOutDelay, false, self, selfTimeOut);
        // self.event_stopResizeHandle = self.stopResize.bind(self);
        // self.start = 0;
        // self.end = 0;
        // self.startSize = 0;
        // self.direction = config.direction;
        // self.deltaMultiplier = (self.direction === "right" || self.direction === "bottom") ? -1 : 1;        
    }
    // initResize(event) {
    //     const self = this;
    //     self.currentResizer = event.currentTarget.id;
    //     if (self.orientation === "horizontal") {
    //         self.start = self.end = event.clientY;
    //         self.startSize = self.resizers[self.currentResizer][1].offsetHeight;
    //     }
    //     else {
    //         self.start = self.end = event.clientX;
    //         self.startSize = self.resizers[self.currentResizer][1].offsetWidth;
    //     }
    //     window.addEventListener('mousemove', self.event_resizeHandle, false);
    //     window.addEventListener('mouseup', self.event_stopResizeHandle, { capture: false, once: true });
    // }
    // get delta() {
    //     const self = this;
    //     return (self.end - self.start) * self.deltaMultiplier * self.resizers[self.currentResizer][2];
    // }
    // size(position) {
    //     const self = this;
    //     self.end = position;
    //     return (self.startSize + self.delta) + 'px';
    // }
    // resize(event) {
    //     const self = this;
    //     if (self.orientation === "horizontal") {
    //         self.resizers[self.currentResizer][1].style.height = self.size(event.clientY)
    //     }
    //     else {
    //         self.resizers[self.currentResizer][1].style.width = self.size(event.clientX)
    //     }
    // }
    // stopResize(event) {
    //     const self = this;
    //     window.removeEventListener('mousemove', self.event_resizeHandle, false);
    //     window.removeEventListener('mouseup', self.event_stopResizeHandle, false);
    // }
    // static debounce(func, wait, immediate, timeout) {
    //     return function () {
    //         const context = this, args = arguments;
    //         const later = function () {
    //             timeout = null;
    //             if (!immediate) func.apply(context, args);
    //         };
    //         const callNow = immediate && !timeout;
    //         clearTimeout(timeout);
    //         timeout = setTimeout(later, wait);
    //         if (callNow) func.apply(context, args);
    //     };
    // };
}