export { } 

declare global { 

    interface String {

        replaceAll(target: string, replace: string, ignore?: boolean): string;

    }

}

String.prototype.replaceAll = function (str1: string, str2: string, ignore: boolean = false) {
    let reg : RegExp = new RegExp('\\b(?:' +str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\$&")+')\\b', 
    (ignore ? "gi" : "i"));

    let finalString : string = this.toString();

    while(reg.test(finalString)){
    finalString = finalString.replace(new RegExp('\\b(?:' +str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\$&")+')\\b', 
    (ignore ? "gi" : "i")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    }

    return finalString;
}