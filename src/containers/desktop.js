class extends HTMLElement {
    static get inherits() { return []; }
    static get using() { return []; }
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [new entry(entry.FileTypes.Class, "Mrbr.UI.Containers.AppContainer"),
        new entry(entry.FileTypes.Component, "Mrbr.UI.Containers.Docker")];
    }
    constructor() {
        super();
        //this.base(...args)
        try {
            if (this === undefined) {
                //super();
            }
        } catch (error) {
            //super();
        }
        var self = this;
        //Mrbr.System.Assembly.loadClass("Mrbr.UI.Containers.AppContainer")
        //.then(_ =>{
        self.appContainer = new Mrbr.UI.Containers.AppContainer();
        self.appContainer.appendChild(self);
        //let docker = new Mrbr.UI.Containers.Docker({ layoutStyle : Mrbr.UI.Containers.Docker.orientation.horizontal, element: document.getElementById('first-horizontal-panel'), resizer: document.getElementById('docker-first-resizer1'), direction: "top"});        
        let docker = new Mrbr.UI.Containers.Docker({ layoutStyle : Mrbr.UI.Containers.Docker.orientation.horizontal, direction: "top"});        
        //let innerDock = new Mrbr.UI.Containers.Docker( { layoutStyle : Mrbr.UI.Containers.Docker.orientation.vertical});
        this.appendChild(docker);
        //docker.contentPanel.appendChild(innerDock)
        //})
    }
}