export { } 

declare global { 

    interface String {

        replaceAll(target: string, replace: string, ignore?: boolean): string;

    }

}

String.prototype.replaceAll = function (str1: string, str2: string, ignore: boolean = false) {
    return this.replace(new RegExp('\\b(?:' +str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\$&")+')\\b', 
    (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}