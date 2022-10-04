export class Locale{
    readonly locale! : string;
    readonly description! : string;

    constructor(locale : string, description : string){
        this.locale = locale;
        this.description = description;
    }
}