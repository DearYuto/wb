'use client';

import Button from '@/common/components/Button';
import Link from 'next/link';

const CreateButton = () => {
  return (
    <Button variant="link" fullWidth={false}>
      <Link href="/products/new">상품 등록</Link>
    </Button>
  );
};

export default CreateButton;
