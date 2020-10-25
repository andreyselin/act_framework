import {startApp, userModule} from "../app";

const tmp = async ()=>{
  await startApp();
  const user = await userModule.create({});
  console.log('user', user);
};

tmp();

