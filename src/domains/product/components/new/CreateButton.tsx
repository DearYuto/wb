'use client';

import Button from '@/common/components/Button';
import Link from 'next/link';

const CreateButton = () => {
  return (
    <Link href="/products/new">
      <Button variant="link" fullWidth={false}>
        상품 등록
      </Button>
    </Link>
  );
};

export default CreateButton;
