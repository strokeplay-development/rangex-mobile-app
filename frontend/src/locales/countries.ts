class Country {
    _name: string;
    _nation: string;
    _language: string;
    _localeFilename: string;
    _timezone: string;
    _dialingCode: string;

    constructor(
        name: string, 
        nation: string, 
        language: string, 
        localeFilename: string, 
        timezone: string, 
        dialingCode: string
    ) {
        this._name = name;
        this._nation = nation;
        this._language = language;
        this._localeFilename = localeFilename;
        this._timezone = timezone;
        this._dialingCode = dialingCode;
    }

    get name() { return this._name; }
    get nation() { return this._nation; }
    get language() { return this._language; }
    get localeFilename() { return this._localeFilename; }
    get timezone() { return this._timezone; }
    get dialingCode() { return this._dialingCode; }

    set timezone(tz) {
        this._timezone = tz;
    }
    set language(lang) {
        this._language = lang;
    }
}

export default [
    // South Korea
    new Country("South Korea", "kr", "ko", "ko", "Asia/Seoul", "+82"),
    // United States
    new Country("United States", "us", "en", "en", "America/New_York", "+1"),
    // Singapore
    new Country("Singapore", "sg", "en", "en-sg", "Asia/Singapore", "+65")
];