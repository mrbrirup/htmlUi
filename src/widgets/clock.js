class extends HTMLElement {
    static get using() { return ["Mrbr.UI.Utils.Utils"]; }
    constructor() {
        super();
        // element created
        this.shadowroot = this.attachShadow({
            mode: 'open'
        });
        const utils = Mrbr.UI.Utils.Utils;
        this.id = utils.uniqueId();
        this.dateId = utils.uniqueId();
        this.timeId = utils.uniqueId();
        this._initialised = false;
        this._dateField = null;
        this._timeField = null;
        this.interval_handle = null;
    }


    get dateField() {
        return this._dateField;
    }
    set dateField(value) {
        this._dateField = value;
    }

    get timeField() {
        return this._timeField;
    }
    set timeField(value) {
        this._timeField = value;
    }
    get initialised() {
        return this._initialised;
    }
    set initialised(value) {
        this._initialised = value;
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
    connectedCallback() {
        if (this.initialised === false) {
            this.shadowroot.innerHTML = Mrbr.UI.Utils.Utils.template("Mrbr.UI.Widgets.Clock", ["{{mrbr:timeId}}", "{{mrbr:dateId}}"], [this.timeId, this.dateId]);
            requestAnimationFrame(_ => {
                setTimeout(this.startTime.bind(this), 1);                
                this.interval_handle = setInterval(this.startTime.bind(this), 1000);
            })
            this.dateField = this.shadowroot.getElementById(this.dateId);
            this.timeField = this.shadowroot.getElementById(this.timeId)
            this.initialised = true;
        }
        else if (this.interval_handle === null){
            this.interval_handle = setInterval(this.startTime.bind(this), 1000);
        }
    }

    startTime() {
        const today = new Date();

        this.dataDate = today.toLocaleDateString("en-GB", { dateStyle: "medium" });
        this.dataTime = today.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
    get dataTime() { return this.getAttribute('data-time'); }
    set dataTime(value) { this.setAttribute('data-time', value); }
    get dataDate() { return this.getAttribute('data-date'); }
    set dataDate(value) { this.setAttribute('data-date', value); }
    disconnectedCallback() {
        if(this.interval_handle){
            clearInterval(this.interval_handle)
            this.interval_handle = null;
        }
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        return ["navlocation", "data-time", "data-date"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        window.requestAnimationFrame(()=>{
            if (name === "data-date" && oldValue !== newValue) {
                this.dateField.innerHTML = newValue
            }
            else if (name === "data-time" && oldValue !== newValue) {
                this.timeField.innerHTML = newValue
            }
        });
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}