import Joi from 'joi';

export default class ValidationsSchemas {
  #joi = Joi;

  productSchema = this.#joi.object({
    name: this.#joi.string().min(3).required(),
    amount: this.#joi.string().min(3).required(),
  });
}
