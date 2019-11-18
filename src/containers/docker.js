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
    static get panelPosition() {
        return {
            top: 1,
            left: 1,
            bottom: 2,
            right: 2
        }
    }
    static get resizePosition() {
        return {
            top: 1,
            left: 1,
            bottom: 2,
            right: 2
        }
    }

    get orientation() { return this.getAttribute("orientation"); }
    set orientation(value) { this.setAttribute("orientation", value); }
    static get RxOrientation() { return /-orientation-/; }
    static get RxContainer() { return /-container/; }
    createSidePanel(orientationConfig) {
        let div = document.createElement("div");
        div.className = `docker-panel-default ${orientationConfig.orientationPanel}`;
        return div;
    }
    createCentrePanel(orientationConfig) {
        let div = document.createElement("div");
        div.className = `docker-panel-default ${orientationConfig.orientationPanel} docker-panel-centre`
        return div;
    }
    createSplitter(orientationConfig, direction) {
        let div = document.createElement("mrbr-ui-containers-splitter")
        div.className = `docker-panel-default ${orientationConfig.resizer}`
        div.orientation = this.orientation
        div.direction = direction;
        return div;
    }
    static get orientationClasses() {
        return {
            horizontal: {
                container: "docker-horizontal-column",
                orientationPanel: "docker-panel-vertical",
                resizer: "resize-bar resize-bar-horizontal",
                resizerDirection1: "top",
                resizerDirection2: "bottom",
                first: "top",
                last: "bottom"
            },
            vertical: {
                container: "docker-vertical-row",
                orientationPanel: "docker-panel-horizontal",
                resizer: "resize-bar resize-bar-vertical",
                resizerDirection1: "left",
                resizerDirection2: "right",
                first: "left",
                last: "right"
            }
        }
    }
    constructor(config) {
        super();
        config = config || {};
        const docker = Mrbr.UI.Containers.Docker,
            self = this;
        self.orientation = config.orientation ? config.orientation : "horizontal"
        const orientationConfig = Mrbr.UI.Containers.Docker.orientationClasses[self.orientation]
        self.orientation = (config.orientation !== undefined) ? config.orientation : docker.orientation.horizontal;
        self.panelPositions = (typeof config.panelPositions === undefined) ? 0 : config.panelPositions;
        self.resizePositions = (typeof config.resizerPositions === undefined) ? 0 : config.resizePositions;

        self._resizers = {};
        self._panels = {}

        let panelHtml = [];
        if (self.panelPositions & docker.panelPosition.top) {
            self.panels[orientationConfig.first] = self.createSidePanel(orientationConfig)
            panelHtml.push(self.panels[orientationConfig.first]);
            if (self.resizePositions & docker.resizePosition.top) {
                self._resizers[orientationConfig.first] = self.createSplitter(orientationConfig, orientationConfig.resizerDirection1)
                panelHtml.push(self._resizers[orientationConfig.first]);
                self._resizers[orientationConfig.first].resizeTarget = self.panels[orientationConfig.first]
            }
        }
        self._panels.content = self.createCentrePanel(orientationConfig)
        panelHtml.push(self.panels.content);
        if (self.panelPositions & docker.panelPosition.bottom) {
            if (self.resizePositions & docker.resizePosition.bottom) {
                self._resizers[orientationConfig.last] = self.createSplitter(orientationConfig, orientationConfig.resizerDirection2)
                panelHtml.push(self._resizers[orientationConfig.last]);
                self._panels[orientationConfig.last] = self.createSidePanel(orientationConfig)
                panelHtml.push(self._panels[orientationConfig.last]);
                self._resizers[orientationConfig.last].resizeTarget = self.panels[orientationConfig.last]
            }
            else {
                self._panels[orientationConfig.last] = self.createSidePanel(orientationConfig)
                panelHtml.push(self._panels[orientationConfig.last]);
            }
        }
        let container = document.createElement("div")
        container.className = `docker-container ${orientationConfig.container}`
        panelHtml.forEach(panel => {
            container.appendChild(panel);
        });
        self.appendChild(container);
        self.config = config;
    }
    get resizers() { return this._resizers; }
    set resizers(value) { this._resizers = value; }
    get orientation() { return this._orientation; }
    set orientation(value) { this._orientation = value; }
    get panels() { return this._panels; }
    set panels(value) { this._panels = value; }
    get contentPanel() { return this._panels.content }
    connectedCallback() {
    }
}