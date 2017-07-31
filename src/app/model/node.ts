import { NodeType } from './node-type.enum';

/**
 * This class represents a node of the item tree. It has one parent and can have many children.
 */
export class Node {
  parent: Node;
  children: Map<number, Node>;

  private id: number;
  private name: string;
  private description: string;
  private image: string;
  private type: NodeType;

  // Contains all the JSON data that was retrieved from the API.
  private data: any;

  constructor(data: any) {
    this.setData(data);
    this.children = new Map<number, Node>();
  }

  /**
   * Sets the data retrieved from the API.
   */
  public setData(data: any) {
    this.data = data;
    this.id = data.numericalId;
    this.name = data.name;
    this.description = data.shortDescription;
    this.setTypeFromStr(data.type);
    this.setImgFromData(this.type);
  }

  /**
   * Get the data retrieved from the API.
   */
  public getData(): any {
    return this.data;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getImage(): string {
    return this.image;
  }

  public setType(type: NodeType) {
    this.type = type;
  }

  public setTypeFromStr(type: string) {

    switch (type) {
      case 'menu-item':
        this.type = NodeType.menuItem;
        break;

      case 'category':
        this.type = NodeType.category;
        break;

      case 'choosable':
        this.type = NodeType.choosable;
        break;

      case 'simple':
        this.type = NodeType.simple;
        break;

      default:
        this.type = NodeType.category;
        break;
    }
  }

  private setImgFromData(type: NodeType) {

    this.image = '';

    if (type === NodeType.category) {
      for (const image of this.data.image) {
        if (image.context === 'category-background') {
          this.image = image.url;
        }
      }
    }
    else {
      for (const image of this.data.image) {
        if (image.context === 'product-thumbnail-small') {
          this.image = image.url;
        }
      }
    }
  }

}
