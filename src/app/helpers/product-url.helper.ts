/**
 * Helper class for URLs.
 */
export class ProductUrlHelper {

  /**
   * Retrieves the ID of a product using its url.
   * For example if the url is "http://api.onyo.com/v1/mobile/product/427", then 427 is returned.
   */
  static getIdFromUrl(url: string): number {

    // Split the string
    const str: string[] = url.split('/');

    // Get the last value, which corresponds to the ID.
    return Number.parseInt(str[str.length - 1])
  }

}
