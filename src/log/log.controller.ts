import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { QueryLogDto } from './dto/filter-log.dto';

@Controller('logs')
@UseGuards(JwtAuthGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async findAll(@Query() queryParams: QueryLogDto) {
    return await this.logService.findAll(queryParams);
  }
}
