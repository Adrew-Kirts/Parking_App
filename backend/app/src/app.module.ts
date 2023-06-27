import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Ticket } from './ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../database/database.sqlite',
      entities: [Ticket],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Ticket]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
