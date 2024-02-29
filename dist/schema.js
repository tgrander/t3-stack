"use strict";
// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiCharactersRelations = exports.aiCharacters = exports.personaTypeEnum = exports.personaTypes = exports.aiCharactersOnChatsRelations = exports.aiCharsOnChats = exports.chatsRelations = exports.chats = exports.usersRelations = exports.users = exports.messagesRelations = exports.messages = exports.roleEnum = exports.messageRoles = exports.createTable = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
exports.createTable = (0, pg_core_1.pgTableCreator)(function (name) { return "t3-test_".concat(name); });
/************************************************************
 * MESSAGES
 ************************************************************/
exports.messageRoles = [
    "user",
    "assistant",
    "system",
    "tool",
    "function",
];
exports.roleEnum = (0, pg_core_1.pgEnum)("role", exports.messageRoles);
exports.messages = (0, exports.createTable)("message", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    message: (0, pg_core_1.varchar)("message", { length: 1000 }).notNull(),
    userId: (0, pg_core_1.varchar)("user_id", { length: 36 }),
    isGuest: (0, pg_core_1.boolean)("is_guest").default(false),
    guestSessionId: (0, pg_core_1.varchar)("guest_session_id", { length: 36 }),
    aiCharacterId: (0, pg_core_1.serial)("ai_character_id"),
    chatId: (0, pg_core_1.serial)("chat_id"),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"]))))
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
    flags: (0, pg_core_1.json)("flags"),
    role: (0, exports.roleEnum)("role").notNull(),
}, function (example) { return ({
    messageIndex: (0, pg_core_1.index)("message_idx").on(example.message),
}); });
// RELATIONS
exports.messagesRelations = (0, drizzle_orm_1.relations)(exports.messages, function (_a) {
    var one = _a.one;
    return ({
        user: one(exports.users, {
            fields: [exports.messages.userId],
            references: [exports.users.id],
        }),
        chat: one(exports.chats, {
            fields: [exports.messages.chatId],
            references: [exports.chats.id],
        }),
        aiCharacter: one(exports.aiCharacters, {
            fields: [exports.messages.aiCharacterId],
            references: [exports.aiCharacters.id],
        }),
    });
});
/************************************************************
 * USERS
 ************************************************************/
exports.users = (0, exports.createTable)("user", {
    id: (0, pg_core_1.varchar)("id", { length: 36 }),
    email: (0, pg_core_1.varchar)("email", { length: 256 }).unique(),
    firstName: (0, pg_core_1.varchar)("name", { length: 256 }),
    lastName: (0, pg_core_1.varchar)("name", { length: 256 }),
    avatarImage: (0, pg_core_1.varchar)("avatar_image", { length: 255 }),
    cloudinaryPublicId: (0, pg_core_1.varchar)("cloudinary_public_id", { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"]))))
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
}, function (example) { return ({
    userIndex: (0, pg_core_1.index)("user_idx").on(example.id, example.email),
}); });
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, function (_a) {
    var many = _a.many;
    return ({
        messages: many(exports.messages),
        chats: many(exports.chats),
        aiCharacters: many(exports.aiCharacters),
    });
});
/************************************************************
 * CHATS
 ************************************************************/
exports.chats = (0, exports.createTable)("chat", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 256 }),
    userId: (0, pg_core_1.varchar)("user_id", { length: 36 }),
    guestSessionId: (0, pg_core_1.varchar)("guest_session_id", { length: 36 }),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"]))))
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
}, function (example) { return ({
    chatIndex: (0, pg_core_1.index)("chat_idx").on(example.id),
}); });
exports.chatsRelations = (0, drizzle_orm_1.relations)(exports.chats, function (_a) {
    var many = _a.many, one = _a.one;
    return ({
        messages: many(exports.messages),
        aiCharacters: many(exports.aiCharsOnChats),
        users: one(exports.users, {
            fields: [exports.chats.userId],
            references: [exports.users.id],
        }),
    });
});
/************************************************************
 * 🧬 CHAT + AI_CHAR JOIN TABLE
 ************************************************************/
exports.aiCharsOnChats = (0, exports.createTable)("ai_characters_chats", {
    aiCharacterId: (0, pg_core_1.serial)("ai_character_id")
        .notNull()
        .references(function () { return exports.chats.id; }),
    chatId: (0, pg_core_1.serial)("chat_id")
        .notNull()
        .references(function () { return exports.aiCharacters.id; }),
}, function (table) { return ({
    pk: (0, pg_core_1.primaryKey)({ columns: [table.aiCharacterId, table.chatId] }),
}); });
exports.aiCharactersOnChatsRelations = (0, drizzle_orm_1.relations)(exports.aiCharsOnChats, function (_a) {
    var one = _a.one;
    return ({
        chat: one(exports.chats, {
            fields: [exports.aiCharsOnChats.chatId],
            references: [exports.chats.id],
        }),
        aiCharacter: one(exports.aiCharacters, {
            fields: [exports.aiCharsOnChats.aiCharacterId],
            references: [exports.aiCharacters.id],
        }),
    });
});
/************************************************************
 * AI CHARACTERS
 ************************************************************/
exports.personaTypes = [
    "Inspirational Leader",
    "Creative Genius",
    "Comedic Relief",
    "Wise Mentor",
    "Rebel with a Cause",
    "Tragic Hero",
    "Adventurer",
    "Romantic",
    "Intellectual",
    "Villain",
    "Survivor",
    "Everyman",
    "Mystic",
    "Innovator",
    "Diplomat",
];
exports.personaTypeEnum = (0, pg_core_1.pgEnum)("personaType", exports.personaTypes);
exports.aiCharacters = (0, exports.createTable)("ai_character", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    createdById: (0, pg_core_1.varchar)("user_id", { length: 36 }),
    personaType: (0, pg_core_1.json)("persona_type").notNull(),
    description: (0, pg_core_1.varchar)("description", { length: 500 }),
    avatarImage: (0, pg_core_1.varchar)("avatar_image", { length: 255 }),
    cloudinaryPublicId: (0, pg_core_1.varchar)("cloudinary_public_id", { length: 255 }),
    configurationData: (0, pg_core_1.json)("configuration_data"),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"]))))
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
}, function (example) { return ({
    aiIndex: (0, pg_core_1.index)("ai_idx").on(example.id), // For faster lookups
}); });
// RELATIONS
exports.aiCharactersRelations = (0, drizzle_orm_1.relations)(exports.aiCharacters, function (_a) {
    var many = _a.many, one = _a.one;
    return ({
        messages: many(exports.messages),
        chats: many(exports.aiCharsOnChats),
        users: one(exports.users, {
            fields: [exports.aiCharacters.createdById],
            references: [exports.users.id],
        }),
    });
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
