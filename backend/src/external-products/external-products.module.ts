import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalProductService } from './external-products.service';
import { ExternalProductsController } from './external-products.controller';  // ✅ Fixed import

@Module({
  imports: [HttpModule],  // ✅ Ensures HttpService works properly
  controllers: [ExternalProductsController],  // ✅ Matches the actual class name
  providers: [ExternalProductService],
})
export class ExternalProductsModule {}
