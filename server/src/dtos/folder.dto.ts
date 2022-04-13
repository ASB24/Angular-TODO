/* eslint-disable prettier/prettier */
import { IsString, IsInt } from 'class-validator';

export class CreateFolderDto {
  @IsInt()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public user_id: string;
}

export class CreateFolderDtoNo{
  @IsString()
  public name: string;

  @IsString()
  public user_id: string;
}
