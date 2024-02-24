import { Module } from '@nestjs/common';
import { VechileController } from './vechile.controller';
import { VechileService } from './vechile.service';

@Module({
  controllers: [VechileController],
  providers: [VechileService],
})
export class VechileModule {}
