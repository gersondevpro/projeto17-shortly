import joi from "joi";

const urlSchemaCreate = joi.object ({
    "url": joi.string().required().min(10)
});

export {
    urlSchemaCreate,
};