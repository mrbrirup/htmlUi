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
        self.docker = new Mrbr.UI.Containers.Docker({ layoutStyle: Mrbr.UI.Containers.Docker.orientation.horizontal, orientation: "horizontal", panelPositions: 3 });
        let taskBar = new Mrbr.UI.Containers.TaskBar();
        self.docker.panels.bottom.appendChild( taskBar)
        self.docker.panels.bottom.style.backgroundColor = "transparent";
        self.docker.panels.content.style.backgroundColor = "var(--default-colour-desktop)";
        // --default-colour-menu: rgb(212, 208, 200);
        // --default-colour-menu-text: rgb(0, 0, 0);
    
        this.appendChild(self.docker);
    }
}