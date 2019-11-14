class extends HTMLElement {
    constructor() {
        super();
         this._resizeTarget = null;
      }
      get resizeTarget() {
        return this._resizeTarget;
      }
      
      set resizeTarget(value) {
          console.log(value)
        this._resizeTarget = value;
      }
      get direction() {
        return this.getAttribute('direction');
      }
      
      set direction(value) {
        this.setAttribute('direction', value);
      }
      
      get orientation(){return this.getAttribute("orientation");}
      set orientation(value){this.setAttribute("orientation", value);}
      connectedCallback() {

        const self = this,
        config = self.config;
        self.addEventListener('mousedown', self.initResize.bind(self), false);
        self.timeOut = false;
        self.timeOutDelay = 1;
        const selfTimeOut = self.timeOut,
        selfTimeOutDelay = self.timeOutDelay,
        selfDebounce = Mrbr.UI.Containers.Splitter.debounce.bind(self);
        self.event_resizeHandle = selfDebounce(self.resize.bind(self), selfTimeOutDelay, false, self, selfTimeOut);
        self.event_stopResizeHandle = self.stopResize.bind(self);
        self.start = 0;
        self.end = 0;
        self.startSize = 0;
        self.deltaMultiplier = (self.direction === "right" || self.direction === "bottom") ? -1 : 1;        
    }
    initResize(event) {
        const self = this;
        self.element = self.resizeTarget;
        if (self.orientation === "horizontal") {
            self.start = self.end = event.clientY;
            self.startSize = self.element.offsetHeight;
        }
        else {
            self.start = self.end = event.clientX;
            self.startSize = self.element.offsetWidth;
        }
        window.addEventListener('mousemove', self.event_resizeHandle, false);
        window.addEventListener('mouseup', self.event_stopResizeHandle, { capture: false, once: true });
    }
    get delta() {
        const self = this;
        return (self.end - self.start) * self.deltaMultiplier ;//* (self.direction ==="top" ? 1 : -1);
    }
    size(position) {
        const self = this;
        self.end = position;
        return (self.startSize + self.delta) + 'px';
    }
    resize(event) {
        const self = this;
        if (self.orientation === "horizontal") {
            self.element.style.height = self.size(event.clientY)
        }
        else {
            self.element.style.width = self.size(event.clientX)
        }
    }
    stopResize(event) {
        const self = this;
        window.removeEventListener('mousemove', self.event_resizeHandle, false);
        window.removeEventListener('mouseup', self.event_stopResizeHandle, false);
    }
    static debounce(func, wait, immediate, timeout) {
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };



















    // connectedCallback() {
    //     // browser calls this method when the element is added to the document
    //     // (can be called many times if an element is repeatedly added/removed)
    // }
    // disconnectedCallback() {
    //     // browser calls this method when the element is removed from the document
    //     // (can be called many times if an element is repeatedly added/removed)
    // }
    // static get observedAttributes() {
    //     return [/* array of attribute names to monitor for changes */];
    // }
    // attributeChangedCallback(name, oldValue, newValue) {
    //     // called when one of attributes listed above is modified
    // }
    // adoptedCallback() {
    //     // called when the element is moved to a new document
    //     // (happens in document.adoptNode, very rarely used)
    // }
















}