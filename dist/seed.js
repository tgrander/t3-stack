"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var vercel_postgres_1 = require("drizzle-orm/vercel-postgres");
var postgres_1 = require("@vercel/postgres");
var schema = require("./schema");
var schema_1 = require("./schema");
var db = (0, vercel_postgres_1.drizzle)(postgres_1.sql, { schema: schema });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var userId, userRes, personas, description, aiCharRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Seeding started 🚀");
                    userId = (0, uuid_1.v4)();
                    return [4 /*yield*/, db.insert(schema_1.users).values({
                            id: userId,
                            email: "luckduck@gmail.com",
                            firstName: "Luck",
                            lastName: "Duck",
                            cloudinaryPublicId: "spacecrafts/fp63kdvlfckpgwix0hrn",
                        })];
                case 1:
                    userRes = _a.sent();
                    console.log("Success creating user: ", userRes);
                    personas = [
                        "Creative Genius",
                        "Comedic Relief",
                        "Rebel with a Cause",
                    ];
                    description = "A master of comedy with a sharp, insightful edge, known for his fearless social commentary and unique perspective on culture and society. This character combines wit, wisdom, and a laid-back demeanor, offering humor that's as thought-provoking as it is hilarious.";
                    return [4 /*yield*/, db.insert(schema_1.aiCharacters).values({
                            name: "Dave Chapell",
                            createdById: userId,
                            cloudinaryPublicId: "ai-chat-app/personas/m0zpghyfpgyjujgfrqkq",
                            personaType: personas,
                            description: description,
                        })];
                case 2:
                    aiCharRes = _a.sent();
                    console.log("Success creating AI character: ", aiCharRes);
                    console.log("Seeding finished! ✅");
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then()
    .catch(function (err) {
    console.error(err);
    process.exit(0);
});
