var TestoviParser = (function () {

    const dajJSONObj = function (json) {
        let jsonObj;
        try {
            jsonObj = JSON.parse(json);
            if (
                jsonObj == null ||
                jsonObj.stats == null ||
                jsonObj.stats.passes == null ||
                jsonObj.stats.tests == null ||
                jsonObj.failures == null ||
                jsonObj.tests == null
            )
                throw "Greska";
        } catch (err) {
            jsonObj = null
        }
        return jsonObj;
    }

    const areEqual = function (arr1, arr2) {
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

    const dajTacnost = function (json) {
        let jsonObj;
        try {
            jsonObj = JSON.parse(json);
            if (
                jsonObj == null ||
                jsonObj.stats == null ||
                jsonObj.stats.passes == null ||
                jsonObj.stats.tests == null ||
                jsonObj.failures == null)
                throw "Greska";
        } catch (err) {
            let res = {
                tacnost : "0%",
                greske : "Testovi se ne mogu izvrsiti"
            };
            return res;
        }
        let res = {};

        res['tacnost'] = (jsonObj.stats.passes / jsonObj.stats.tests * 100) + "%";
        res['greske'] = jsonObj.failures.map(x => x.fullTitle);
        return res;
    };

    const porediRezultate = function (rezultat1, rezultat2) {
        let obj1 = dajJSONObj(rezultat1);
        if (obj1 == null) return "Greska";

        let obj2 = dajJSONObj(rezultat2);
        if (obj2 == null) return "Greska";

        let res = {};

        obj1.failures = obj1.failures.map(x => x.fullTitle);
        obj2.failures = obj2.failures.map(x => x.fullTitle);

        let testovi1 = obj1.tests == null ? [] : obj1.tests.map(x => x.fullTitle);
        let testovi2 = obj2.tests == null ? [] : obj2.tests.map(x => x.fullTitle);

        if (areEqual(testovi1, testovi2)) {
            res['promjena'] = (obj2.stats.passes / obj2.stats.tests * 100) + "%";
            res['greske'] = obj2.failures == null ? [] : obj2.failures.sort();
        } else {
            let greske = [];
            for (let i = 0; i < obj1.failures.length; i++)
                if (!obj2.failures.includes(obj1.failures[i]))
                    greske.push(obj1.failures[i]);

            greske.sort();
            let promjena = (greske.length + obj2.stats.failures) / (greske.length + obj2.stats.tests) * 100;
            promjena = promjena.toFixed(2);
            if (obj2.failures != null) greske = greske.concat(obj2.failures.sort());
            res['promjena'] = promjena + "%";
            res['greske'] = greske;
        }
        return res;
    };

    return {
        dajTacnost: dajTacnost,
        porediRezultate: porediRezultate
    };
}());