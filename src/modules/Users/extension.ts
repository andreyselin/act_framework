import {Users} from "./";


// Later do stuff through Users Module, accepting extension
// through importing and returning combined interface and mongo object
// To work with Users module, User entity and types from all the spaces,
// not with this -- this is only to define entities and interfaces and send to Users


export interface IExtendedUser extends Users.IDefaultUser {}

export const schemaConfig = {
  ...Users.defaultUserSchemaConfig
};
