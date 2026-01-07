import { Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { first } from "rxjs";

@Injectable()
export class UsersService {
    public findAll(
        GetUsersParamDto: GetUsersParamDto,
        page: number,
        limit: number
    ) {
        return [
            {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com"
            },
            {
                firstName: "raj",
                lastName: "Doe",
                email: "raj.doe@example.com"
            },
            {
                firstName: "rahul",
                lastName: "Doe",
                email: "rahul.doe@example.com"
            }
        ];
    }

    public findOneById(id: number) {
        return [
            {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com"
            },
        ];
    }
}