class Docker extends HTMLDivElement {
    static get inherits() { return []; }
    static get using() { return []; }
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [
            new entry(entry.FileTypes.Class, "Mrbr.Html.Div"),
            new entry(entry.FileTypes.Style, "Mrbr.UI.Containers.Docker")
        ];
    }
    constructor() {
        super();
        this.classList.add("mrbr-ui-containers-docker")
        //this.base(...args)
    }
}