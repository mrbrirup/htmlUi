class extends HTMLElement {
    static get inherits() { return []; }
    static get using() { return []; }
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [ new entry(entry.FileTypes.Class ,"Mrbr.UI.Containers.AppContainer" ) ];
    }
    constructor() {
        super();
        //this.base(...args)
        try {
            if(this === undefined){
                //super();
            }            
        } catch (error) {
            //super();
        }
        var self = this;
        Mrbr.System.Assembly.loadClass("Mrbr.UI.Containers.AppContainer")
        .then(_ =>{
            self.appContainer = new Mrbr.UI.Containers.AppContainer();
            self.appContainer.appendChild(self);
        })
    }
}