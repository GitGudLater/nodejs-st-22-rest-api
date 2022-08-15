import { GroupDTO } from "../dto/groupdto";
import { UserDTO } from "../dto/userdto";

export interface Argument {
    argumentName: string;
    value: number | string | UserDTO | GroupDTO;
}