class {
    static get inherits() { return []; }
    static get using() { return ["Mrbr.Geometry.Rectangle"]; }
    static get manifest() { return []; }
    constructor(...args) {
        this.base(...args)
    }
    static arrayReplace(source, findArray, replaceArray) {
        findArray = Array.isArray(findArray) ? findArray : [findArray];
        replaceArray = Array.isArray(replaceArray) ? replaceArray : [replaceArray];
        let regex = [], map = {};
        for (let entryCounter = 0, entryCount = findArray.length; entryCounter < entryCount; entryCounter++) {
            regex.push(findArray[entryCounter].replace(/([-[\]{}()*+?.\\^$|#,])/g, '\\$1'));
            map[findArray[entryCounter]] = replaceArray[entryCounter];
        }
        regex = regex.join('|');
        source = source.replace(new RegExp(regex, 'g'), function (matched) {
            return map[matched];
        });
        return source;
    }
    static componentManifest(componentName, includeCss, includeTemplate) {
        const system = Mrbr.System,
            assembly = system.Assembly,
            entry = system.ManifestEntry,
            fileTypes = entry.FileTypes;
        let manifest = [new entry(fileTypes.Component, componentName)];
        if (includeCss === true) {
            manifest.push(new entry(fileTypes.File, assembly.resolveNamespaceToFile(componentName, "css")));
        }
        if (includeTemplate === true) {
            manifest.push(new entry(fileTypes.File, assembly.resolveNamespaceToFile(componentName, "html")));
        }
        return manifest;
    }
    static uniqueId(prefix) {
        return (prefix ? prefix : "ctrl_") + new Date().getTime().toString() + Math.random().toString().replace('.', '');
    }
    static template(componentName, find, replace) {
        const assembly = Mrbr.System.Assembly,
            loaderNamespacedFile = assembly.loaderNamespacedFile;
            let arrTemplate = []
        if (find === undefined || replace === undefined) { 
            if (loaderNamespacedFile(componentName, "css")) {
                arrTemplate.push(`<style>${assembly.loaderNamespacedFileResult(componentName, "css")}</style>`)
            }
            if (loaderNamespacedFile(componentName, "html")) {
                arrTemplate.push(assembly.loaderNamespacedFileResult(componentName, "html"));
            }
        }
        else{
            if (loaderNamespacedFile(componentName, "css")) {
                arrTemplate.push(`<style>${Mrbr.UI.Utils.Utils.arrayReplace(assembly.loaderNamespacedFileResult(componentName, "css"), find, replace)}</style>`)
            }
            if (loaderNamespacedFile(componentName, "html")) {
                arrTemplate.push(Mrbr.UI.Utils.Utils.arrayReplace(assembly.loaderNamespacedFileResult(componentName, "html"), find, replace));
            }
        }
        return arrTemplate.join("\n")
    }
    static elementInnerSize(element){
        if (!element){return null;}
        const viewportOffset = element.getBoundingClientRect();        
        return new Mrbr.Geometry.Rectangle({x:viewportOffset.left,y:viewportOffset.top, width: element.clientWidth || element.innerWidth, height: element.clientHeight || element.innerHeight})         
    }
    static elementOuterSize(element){
        if (!element){return null;}
        const viewportOffset = element.getBoundingClientRect();        
        return new Mrbr.Geometry.Rectangle({x:viewportOffset.left,y:viewportOffset.top, width: element.offsetWidth  , height: element.offsetHeight })         
    }
}