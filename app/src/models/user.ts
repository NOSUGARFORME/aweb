import { Role } from "./role";

export class User {
  constructor(
    public id = 0,
    public name = "",
    public surname = "",
    public email = "",
    public phoneNumber = "",
    public thirdname = "",
    public role = new Role(),
  ) {}

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
}
