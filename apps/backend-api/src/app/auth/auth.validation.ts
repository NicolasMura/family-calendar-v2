import * as Joi from 'joi';
// import { User, UserDocument } from '../users/user.schema';
// import { UserDocument } from '../users/user.schema';
import { User } from '@family-calendar-v2/models';

/**
* @export
* @class AuthValidation
* @extends Validation
*/
// export class AuthValidation extends Validation {
export class AuthValidation {

  createUser(params: User): any {
  // createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
    const userProfile: Joi.Schema = Joi.object().keys({
      isChild: Joi.boolean().required(),
      name: Joi.string().required(),
      gender: Joi.string(),
      location: Joi.string(),
      picture: Joi.string()
    }).required();

    const schema: Joi.Schema = Joi.object().keys({
      mobile: Joi.string().allow(''),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      profile: userProfile
    });

    return schema.validate(params)
    // return Joi.validate(params, schema, { allowUnknown: true });
  }

  // getUser(params: IUserModel): any {
  //   const schema: Joi.Schema = Joi.object().keys({
  //     password: Joi.string().required(),
  //     email: Joi.string().email().required()
  //   });

  //   return Joi.valid(params, schema);
  // }
}
