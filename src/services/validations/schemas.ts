import Joi from 'joi';

export default class ValidationsSchemas {
  #joi = Joi;

  productSchema = this.#joi.object({
    name: this.#joi.string().min(3).required(),
    amount: this.#joi.string().min(3).required(),
  });

  userSchema = this.#joi.object({
    username: this.#joi.string().min(3).required(),
    vocation: this.#joi.string().min(3).required(),
    level: this.#joi.number().integer().min(1).required(),
    password: this.#joi.string().min(8).required(),
  });

  loginSchema = this.#joi.object({
    username: this.#joi.string().required(),
    password: this.#joi.string().required(),
  });
}
