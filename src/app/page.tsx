import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/product/new">상품 생성</Link>
    </div>
  );
}
