class extends HTMLElement {
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [
            new entry(entry.FileTypes.Component, "Mrbr.UI.Navigation.Menu"),
            new entry(entry.FileTypes.Component, "Mrbr.UI.Controls.Button"),
            new entry(entry.FileTypes.Style, "Mrbr.UI.Containers.TaskBar")
        ];
    }
    constructor() {
        super();
        this.button = new Mrbr.UI.Controls.Button();
        this.button.src= Mrbr.System.Assembly.resolveNamespaceToFile("Mrbr.UI.Resources.Images.menu-button-of-three-horizontal-lines","svg")
        this.menu = new Mrbr.UI.Navigation.Menu();
        this.menu.direction = "up";
        this.button.style.backgroundColor = "var(--default-colour-menu)"
        this.button.style.color = "var(--default-colour-menu-text)"                
    }
    connectedCallback() {
        this.button.appendChild(this.menu);
        this.appendChild(this.button)
        let self = this;
        let m1 = document.createElement("mrbr-ui-navigation-menuitem")
        m1.label = "Hello";
        this.menu.rootMenu.appendChild(m1);
    
        let m2 = document.createElement("mrbr-ui-navigation-menuitem")
        m2.label = "World";
        m2.setAttribute("submenu",'')
        this.menu.rootMenu.appendChild(m2);
        
        
        let m3 = document.createElement("mrbr-ui-navigation-menuitem")
        m3.label = "Again";
        m3.setAttribute("submenu",'')
        m2.menuItems.appendChild(m3);
        
        let m4 = document.createElement("mrbr-ui-navigation-menuitem")
        m4.label = "Again1";
        let m5 = document.createElement("mrbr-ui-navigation-menuitem")
        m5.label = "Again2";
        let m6 = document.createElement("mrbr-ui-navigation-menuitem")
        m6.label = "Again3";
        
        m3.menuItems.appendChild(m4);
        m3.menuItems.appendChild(m5);
        m3.menuItems.appendChild(m6);

        //this.button.addEventListener("click", function(){self.menu.style.display = "block"})
        self.button.addEventListener("click", function(event){
            if(!self.menu.classList.contains("show")){
                self.menu.classList.add("show");
                window.requestAnimationFrame(function(){self.menu.nav.classList.add("show");
                window.requestAnimationFrame(function(){self.menu.nav.classList.add("show");})});                
            }
            else{
                self.menu.classList.remove("show");
                self.menu.nav.classList.remove("show");    
            }

            event.stopPropagation();
            return false;
            });
        self.button.addEventListener("mouseleave", function(){
            self.menu.classList.remove("show");
            self.menu.nav.classList.remove("show");
        });
        self.menu.nav.addEventListener("click", function(event){
            const entry = Mrbr.System.ManifestEntry;
            Mrbr.System.Assembly.loadManifest(
                new entry(entry.FileTypes.Component, "Mrbr.UI.Forms.Form"),

            ).then(_=>{
                
                let w = document.createElement("mrbr-ui-forms-form")
                w.name ="name1";
                w.title = "title1";
                w.height = "200";
                w.width = "200";
                w.innerHTML = `<p>Credits:</p>
                <p>Stuff</p>
                <button onclick="alert('Ok')"> ok </button>`
                application.desktop.style.overflow = "hidden";
                application.desktop.docker.style.overflow = "hidden";
                application.desktop.docker.panels.content.style.overflow = "hidden";
                application.desktop.docker.panels.content.appendChild(w);
            });
            event.stopPropagation();
            return false;
        })

        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        return [/* array of attribute names to monitor for changes */];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}