import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const WalletControls = () => {
  const router = useRouter();
  const lastPath = router.pathname;
  return (
    <div className="walletBorder absolute bottom-0 left-0 h-[64px] w-full rounded-b-xl">
      <div className="bgStyles walletBorder absolute bottom-0 flex h-[64px] w-full rounded-b-xl bg-slate-100 blur" />
      <div className="walletBorder absolute bottom-0 z-10 flex h-[64px] w-full flex-nowrap justify-evenly rounded-b-xl">
        <Link
          href={'/'}
          className={
            lastPath === '/'
              ? 'flex h-full w-1/2 flex-col items-center justify-center rounded-l-lg border-b-2  border-fun-200 px-2 py-[22px]'
              : 'flex h-full w-1/2 flex-col items-center justify-center px-2 py-[22px]'
          }
        >
          <Image src={'/Icons/Home.svg'} alt="menu" width={24} height={24} />
        </Link>
        <Link
          href={'/transactions'}
          className={
            lastPath === '/transactions'
              ? 'flex h-full w-1/2 flex-col items-center justify-center rounded-r-lg border-b-2  border-fun-200 px-2 py-[22px]'
              : 'flex h-full w-1/2 flex-col items-center justify-center px-2 py-[22px]'
          }
        >
          <Image src={'/Icons/Clock.svg'} alt="menu" width={24} height={24} />
        </Link>
      </div>
    </div>
  );
};
export default WalletControls;
