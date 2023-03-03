import joi from "joi";

const userSchemaCreate = joi.object ({
    name: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
    confirmPassword: joi.string().required().min(6)
});

const loginSchema = joi.object ({
    email: joi.string().email().required().min(3),
    password: joi.string().required().min(6)
});

export {
    userSchemaCreate,
    loginSchema
};