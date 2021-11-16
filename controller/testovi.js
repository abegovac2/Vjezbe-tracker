class TestoviParser {
    dajTestove(json){
        let test = (/\"(tests)\"\s?:\s?(\d+)/g).exec(json);
        if(test == null) return null;
        test = test[0].replace(/\"/g,"");

        let pass = (/\"(passes)\"\s?:\s?(\d+)/g).exec(json);
        if(pass == null) return null;
        pass = pass[0].replace(/\"/g,"");

        test = (/\d+/g).exec(test);
        test = parseInt(test[0]);

        pass = (/\d+/g).exec(pass);
        pass = parseInt(pass[0]);

        return pass/test;
    } 

    dajPaleTestove(json){
        //let reg = /\"(passes)\"\s?:\s?\[\{.*\}\]/g;
        let res = (/\"(failures)\"\s?:\s?\[\{.*?\}\]/g).exec(json);
        //console.log(res[0]);
        res = res[0].match(/\"fullTitle\"\s?:\s?\".*?\"/g);
        return res.map((str)=> str.split(/\"fullTitle\"\s?:\s?/g)[1]);
    }

    dajTacnost(json) {
        let tacnost = this.dajTestove(json);
        if(tacnost == null) return "{\"tacnost\" : \"0%\", greske : \"Testovi se ne mogu izvrsiti\"}";
        let res = "{\"tacnost\" : \"" + (tacnost*100)  + "%\", greske : [";
        if(tacnost == 1) res += "]}";
        else{
            let text = this.dajPaleTestove(json);
            if(text == null) return "{\"tacnost\" : \"0%\", greske : \"Testovi se ne mogu izvršiti\"}";
            res += text + "}";
        }
        return res;
    }
}
//var testoviParser = TestoviParser;

module.exports = TestoviParser;
//let json = "{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":1,\"pending\":0,\"failures\":1,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";
//let str2 = "";
//var testoviParser = new TestoviParser();
//console.log(testoviParser.dajTacnost(json));