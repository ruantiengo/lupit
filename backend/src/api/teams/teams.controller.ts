import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UploadedFileMetadata } from '@nestjs/azure-storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureStorageService } from '@nestjs/azure-storage';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly azureBlobStorage: AzureStorageService,
    private readonly teamsService: TeamsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createTeamDto: CreateTeamDto,
    @UploadedFile() file?: UploadedFileMetadata,
  ) {
    let storageUrl = '';

    if (file) {
      storageUrl = await this.azureBlobStorage.upload(file);
    }

    return this.teamsService.create(createTeamDto, storageUrl);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @UploadedFile() file?: UploadedFileMetadata,
  ) {
    console.log(id);

    let storageUrl = '';

    if (file) {
      storageUrl = await this.azureBlobStorage.upload(file);
    }

    return this.teamsService.update(id, updateTeamDto, storageUrl);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
