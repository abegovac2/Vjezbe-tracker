class HelperClass{
    static dajTestove(json) {

        let test = this.dajBrojcaniAtribut("tests", json);
        if (test == null) return null;
        let pass = this.dajBrojcaniAtribut("passes", json);
        if (pass == null) return null;
        return pass / test;
    }
    
    static dajPaleTestove(json) {
        let res = (/\"(failures)\"\s?:\s?\[\{.*?\}\]/g).exec(json);
        res = res[0].match(/\"fullTitle\"\s?:\s?\".*?\"/g);
        return res.map((str) => str.split(/\"fullTitle\"\s?:\s?/g)[1]);
    }
    
    static kreirajObjekat(json) {
        let [tacnost, ...greske] = json.replace(/[\{\}]/g, '').split(/\s?\,\s?/i);
        tacnost = tacnost.replace(/[\"\s]/g, '').split(/:/g);
        let reg = /(\s?:\s?|\"\,\")/g;
        greske = greske.join(',')
            .replace(/[\[\]]/g, '')
            .split(reg)
            .filter((str) => !reg.test(str))
            .map((str) => str.replace(/\"/g, ''));
    
        let obj = {};
        obj[tacnost[0]] = tacnost[1];
        obj[greske.shift()] = greske.map((str) => `"${str}"`);
        return obj;
    }

    static dajBrojcaniAtribut(atribut, json) {
        let reg = new RegExp("\\\"(" + atribut + ")\\\"\\\s?:\\\s?(\\\d+)", "g");
        let test = reg.exec(json);
        if (test == null) return null;
    
        test = (/\d+/g).exec(test);
        test = parseInt(test[0]);
    
        return test;
    }
    
    static areEqual(arr1, arr2) {
        let n = arr1.length;
        let m = arr2.length;
        if (n != m) return false;
        arr1.sort();
        arr2.sort();
        for (let i = 0; i < n; i++)
            if (arr1[i] != arr2[i])
                return false;
        return true;
    }
}


class TestoviParser {
    dajTacnost(json) {
        let tacnost = HelperClass.dajTestove(json);
        if (tacnost == null) return "{\"tacnost\" : \"0%\", \"greske\" : \"Testovi se ne mogu izvrsiti\"}";
        let res = "{\"tacnost\" : \"" + (tacnost * 100) + "%\", \"greske\" : [";
        if (tacnost == 1) res += "]}";
        else {
            let text = HelperClass.dajPaleTestove(json);
            if (text == null) return "{\"tacnost\" : \"0%\", \"greske\" : \"Testovi se ne mogu izvršiti\"}";
            res += text + "}";
        }
        return res;
    }

    porediRezultate(rezultat1, rezultat2) {
        let obj1 = HelperClass.kreirajObjekat(this.dajTacnost(rezultat1));
        let obj2 = HelperClass.kreirajObjekat(this.dajTacnost(rezultat2));
        let res = `{"promjena":"`;
        if (HelperClass.areEqual(obj1.greske, obj2.greske)) {
            obj2.greske = obj2.greske.map((str) => "\"" + str + "\"");
            res += obj2.tacnost + `","greske":[${obj1.greske.sort()}]}`;
        } else {
            let promjena = [];
            for (let i = 0; i < obj1.greske.length; i++)
                if (!obj2.greske.includes(obj1.greske[i])) promjena.push(obj1.greske[i]);
            promjena.sort();
            let promjena1 = promjena.length;
            let brTestova2 = HelperClass.dajBrojcaniAtribut("failures", rezultat2);
            promjena1 = (promjena1 + obj2.greske.length) / (promjena1 + brTestova2) * 100;
            promjena.push(obj2.greske.sort());
            res += promjena1 + `%","greske":[${promjena}]}`;
        }
        return res;
    }

}

module.exports = TestoviParser;
let json = "{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":1,\"pending\":0,\"failures\":1,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";
//let json = "{\"tacnost\" : \"50%\", \"greske\" : [\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"Tabela crtaj() should draw 3 columns in row 2 when parameter are 2,3\",\"Tabela crtaj() should draw 4 columns in row 2 when parameter are 2,3\"}";
var testoviParser = new TestoviParser();
console.log(testoviParser.porediRezultate(json, json));
//console.log(testoviParser.dajBrojcaniAtribut('tests', json));