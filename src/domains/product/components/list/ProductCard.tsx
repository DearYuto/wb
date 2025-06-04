import Image from 'next/image';

import { ProductListResponseType } from '@/domains/product/types/product';

interface ProductCardProps {
  product: ProductListResponseType['products'][number];
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article
      data-testid="product-card"
      key={product.id}
      className="group relative flex h-full min-h-[358px] cursor-pointer flex-col justify-between rounded-md border p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md"
    >
      <figure className="overflow-hidden rounded">
        <Image
          data-testid="product-thumbnail"
          width={200}
          height={200}
          src={product.thumbnail}
          alt={product.title}
          className="h-40 w-full object-cover transition-all duration-300 group-hover:scale-110"
        />
      </figure>

      <header>
        <h2 data-testid="product-title" className="mt-2 text-lg font-bold text-gray-700">
          {product.title}
        </h2>
      </header>
      <p data-testid="product-description" className="mt-1 line-clamp-3 text-sm text-gray-600">
        {product.description}
      </p>
      <footer className="mt-2 py-1 text-sm text-gray-400">
        <span data-testid="product-rating" className="font-semibold text-yellow-500">
          ⭐ {product.rating}
        </span>
        <span data-testid="product-reviews" className="ml-1 text-gray-400">
          (리뷰 {product.reviews.length})
        </span>
      </footer>
    </article>
  );
};

export default ProductCard;
