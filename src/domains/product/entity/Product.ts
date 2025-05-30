import { ProductType } from '../types/product';

class Product {
  constructor(public props: ProductType) {}

  getPriceWithDiscount() {
    const { discountPercentage, price } = this.props;

    if (!discountPercentage || discountPercentage <= 0) {
      return price;
    }

    return price * (1 - discountPercentage / 100);
  }
}

export default Product;
