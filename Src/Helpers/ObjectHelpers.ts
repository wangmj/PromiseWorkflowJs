module wfjs.Helpers {
    export class ObjectHelpers {
        public static CombineObj(target: Dictionary<any>, ...source: Dictionary<any>[]): Dictionary<any> {
            source.forEach((item) => {
                for (var i in item) {
                    target[i] = item[i];
                }
            });
            return target;
        }
        public static CombineObjAsync(...source: Dictionary<any>[]): Dictionary<any> {
            var target = {};
            source.forEach(item => {
                for (var k in item) {
                    target[k] = item[k];
                }
            });
            return Promise.resolve(target);
        }
    }
}