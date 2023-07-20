import { UserLoginReponseViewModel } from "./user-login-respon-view-model";

export class UserSessionModel {
    flag: boolean = false;
    value: UserLoginReponseViewModel | undefined;
    msg: string = '';
  }
  