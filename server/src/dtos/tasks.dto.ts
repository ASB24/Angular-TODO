/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  public id: number;

  @IsString()
  public description: string;

  @IsBoolean()
  public completed: boolean;

  @IsInt()
  public folder_id: number;

}

export class CreateTaskDtoNo{
  @IsString()
  public description: string;

  @IsBoolean()
  public completed: boolean;

  @IsInt()
  public folder_id: number;
}
