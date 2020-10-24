import {IDefaultUser} from "../modules/user/mongo";
import {Document, Model, model, Schema} from "mongoose";

export interface IUser extends IDefaultUser {

}

export const UserSchema = new Schema
