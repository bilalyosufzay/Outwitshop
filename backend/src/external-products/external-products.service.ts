import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExternalProductService {
  constructor(private readonly httpService: HttpService) {}

  async fetchAliExpressProducts(query: string) {
    try {
      const url = `https://api.aliexpress.com/products?search=${query}&affiliate_id=YOUR_AFFILIATE_ID`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data || { error: 'No data received from AliExpress' };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch AliExpress products',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async fetchSheinProducts(query: string) {
    try {
      const url = `https://api.shein.com/products?search=${query}&affiliate_id=YOUR_AFFILIATE_ID`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data || { error: 'No data received from Shein' };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch Shein products',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async fetchOttoProducts(query: string) {
    try {
      const url = `https://api.otto.de/products?search=${query}&affiliate_id=YOUR_AFFILIATE_ID`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data || { error: 'No data received from Otto' };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch Otto products',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}  // ✅ Make sure this last bracket exists!
