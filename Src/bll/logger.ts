module wfjs {
    export class Logger {
        private static _logger: any;
        public static SetLogger(logger): void {
            Logger._logger = logger;
        }
        public static log(level: string, ...message: any[]): void {
            var logger = Logger.getlogger();
            if (logger == null) return;
            var msg = Logger.composeMsg(message);
            switch (level) {
                case "error":
                    logger.error.apply(logger,msg);
                    break;
                case "warn":
                    logger.warn.apply(logger,msg);
                    break;
                default:
                    logger.log.apply(logger,msg);
                    break;
            }
        }
        private static getlogger(): ILogger {
            if (Logger._logger)
                return Logger._logger;
            else
                return null;
        }
        private static composeMsg(...msg: any[]): Array<any> {
            var res = "";
            msg.unshift((new Date()).toLocaleString());
            msg.unshift("workflowjs");
            msg.forEach((m) => {
                // if (typeof m == "object")
                //     res += JSON.stringify(m) + " ";
                // else
                res += m + " ";
            });
            return msg;
        }
    }
    interface ILogger {
        error(msg: string): void;
        error(error: Error): void;
        warn(msg: string): void;
        log(msg: string): void;
    }
}