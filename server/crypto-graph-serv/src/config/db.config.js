"use strict";
exports.__esModule = true;
exports.dbConfig = void 0;
var config_1 = require("@nestjs/config");
exports.dbConfig = config_1.registerAs('db', function () { return ({
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPasswordUser: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
}); });
//# sourceMappingURL=db.config.js.map