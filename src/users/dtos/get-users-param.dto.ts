import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamDto {

    @IsOptional()
    @IsInt()
    @Type(() => Number)  // this will transform the id which we are getting in param as string to number
    id?: number;
}