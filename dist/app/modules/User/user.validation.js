"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUseValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name Is required' }),
    email: zod_1.z.string({ required_error: 'email Is required' }),
    password: zod_1.z
        .string({
        invalid_type_error: 'Password Must Be String',
    })
        .max(20, { message: 'Password can not be more than 20 characters' })
        .optional(),
});
const UpdateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name Is required' }).optional(),
        email: zod_1.z.string({ required_error: 'email Is required' }).optional(),
        password: zod_1.z
            .string({
            invalid_type_error: 'Password Must Be String',
        })
            .max(20, { message: 'Password can not be more than 20 characters' })
            .optional(),
    }),
});
exports.UserValidation = {
    createUseValidationSchema,
    UpdateUserValidationSchema,
};
