import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExternalProductsModule } from './external-products/external-products.module';

@Module({
  imports: [ExternalProductsModule],  // ✅ Import the module here
  controllers: [AppController],  // ✅ No need to manually add controllers from another module
  providers: [AppService], // ✅ No need to manually add services from another module
})
export class AppModule {}
