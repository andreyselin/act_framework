import {Users} from "./UserModel";
import {IDefaultUser, prepareUserInMongo} from "./mongo";
import {Model} from "mongoose";
import {Commons} from "../Commons";


class UserModule<_IUser extends IDefaultUser, _IException> implements Users.IModule<_IUser, _IException>{

  User: Model<_IUser>;
  exceptionsModule: Commons.IExpectedExceptionsModule<_IException>;

  constructor({ schemaConfig, exceptionsModule }: Users.IModuleConfig<_IUser, _IException>) {
    this.User = prepareUserInMongo<_IUser>(schemaConfig);
    this.exceptionsModule = exceptionsModule;
  }

  async create (params) {
    try {
      const newUser = new this.User(params.user);
      return await newUser.save();
    } catch (e) {
      return this.exceptionsModule.create();
    }
  }

  async getById(_id: string) {
    const result = await this.User.findById(_id);
    if (!result) {
      return this.exceptionsModule.create()
    }
    return result;
  }

  async updateBy() {

  }

}


    // Testing below


interface ITmpUser extends IDefaultUser {
  aa: 2
}

const userModule = new UserModule<ITmpUser>();
var a = userModule.getById().then(f=>{
  f.aa // ura!
});
