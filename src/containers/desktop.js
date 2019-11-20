class extends HTMLElement {
    static get inherits() { return []; }
    static get using() { return []; }
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [
            new entry(entry.FileTypes.Class, "Mrbr.UI.Containers.AppContainer"),
            new entry(entry.FileTypes.Component, "Mrbr.UI.Containers.Docker"),
            new entry(entry.FileTypes.Component, "Mrbr.UI.Containers.TaskBar")
        ];
    }
    constructor() {
        super();
        var self = this;
        self.appContainer = new Mrbr.UI.Containers.AppContainer();
        self.appContainer.appendChild(self);
        let docker = new Mrbr.UI.Containers.Docker({ layoutStyle: Mrbr.UI.Containers.Docker.orientation.horizontal, orientation: "horizontal", panelPositions: 3 });
        let taskBar = new Mrbr.UI.Containers.TaskBar();
        docker.panels.bottom.appendChild( taskBar)
        this.appendChild(docker);
    }
}