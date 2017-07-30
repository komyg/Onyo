import { ProductUrlHelper } from './product-url.helper';

describe('Product Url Helper', () => {

  it('should retrieve the product ID from a URL', () => {
    const result = ProductUrlHelper.getIdFromUrl('http://api.onyo.com/v1/mobile/product/427');
    expect(result).toBe(427);
  });

});
