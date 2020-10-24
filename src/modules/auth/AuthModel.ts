// import { Schema, Model, Document, model } from 'mongoose';
// import {Exceptions} from "../Exceptions/ExceptionModel";
//
//
//
// export interface IAuthConfig<_IUser, _IException> {
//   userModule:      IAuthUserModuleExpected<_IUser, _IException>;
//   emailModule:     IAuthEmailModuleExpected;
//   exceptionModule: Exceptions.IModule<_IException>;
//   logger: any;
// }
//
// export interface IAuthUserModuleExpected<_IUser, _IException> {
//   createUser: (params: { user: any, config?: any }) => Promise<_IUser | _IException>;
//   getById: (_id: string) => Promise<_IUser | _IException>;
// }
//
// export interface IAuthEmailModuleExpected {
//   send: (params: any) => Promise<any>;
// }
//
//
// export type TAuthType
//   =
// // 'telegram' |
//   'email';
//
//
// export type TAuthPair = { authType: TAuthType, authId: string };
// export type TAuthPairWithCode = TAuthPair & {
//   code: string
// }
//
//     ////////////////
//     //            //
//     //   Mongo:   //
//     //            //
//     ////////////////
//
//
// export interface IAuthMethod extends Document {
//   _id:        string;
//   authType:   string;
//   authId:     string;
//   userId:     string;
//   code:       string | null;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
//
// const AuthMethodSchema: Schema = new Schema({
//   authType:   String,
//   authId:     String,
//   userId:     String,
//   code:       String,
//   createdAt:  Date,
//   updatedAt:  Date
// });
//
// AuthMethodSchema.pre<IAuthMethod>('save', function(next) {
//   const now = new Date();
//
//   if (!this.createdAt) {
//     this.createdAt = now;
//   }
//   this.updatedAt = now;
//   next();
// });
//
// export const AuthMethod: Model<IAuthMethod> = model<IAuthMethod>('authmethod', AuthMethodSchema);
