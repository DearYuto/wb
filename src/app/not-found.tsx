import Button from '@/common/components/Button';
import InfoCircleIcon from '@/common/components/icons/InfoCircleIcon';
import Link from 'next/link';

const NotFound = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
        <InfoCircleIcon />
      </div>
      <h2 className="mb-2 text-2xl font-extrabold text-gray-900">페이지를 찾을 수 없습니다.</h2>
      <p className="mb-6 max-w-xs text-center text-gray-500">
        요청하신 페이지는 존재하지 않는 페이지입니다.
      </p>
      <Button variant="link" fullWidth={false}>
        <Link href="/">홈으로 이동</Link>
      </Button>
    </section>
  );
};

export default NotFound;
