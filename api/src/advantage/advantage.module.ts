import { Module } from '@nestjs/common';
import { AdvantageService } from './advantage.service';

@Module({
  providers: [AdvantageService]
})
export class AdvantageModule {}
