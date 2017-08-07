module wfjs {
    export class Logger {
        private static _logger: any;
        public static SetLogger(logger): void {
            Logger._logger = logger;
        }
        public static log(level: string, ...message: any[]): void {
            var logger = Logger.getlogger();
            var msg = Logger.composeMsg(message);
            switch (level) {
                case "error":
                    logger.error(msg);
                case "":
            }
            logger.log()
        }
        private static getlogger() {
            if (Logger._logger)
                return Logger._logger;
            else
                return null;
        }
        private static composeMsg(...msg: any[]): string {
            var res = "";
            msg.unshift((new Date()).toLocaleString());
            msg.unshift("workflowjs");
            msg.forEach((m) => {
                res += m;
            });
            return res;
        }
    }
}