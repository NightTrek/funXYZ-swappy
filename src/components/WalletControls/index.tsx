import Image from 'next/image';
import Link from 'next/link';

const WalletControls = () => (
  <div className="fixed bottom-0 left-0 h-[64px] w-full">
    <div className="bgStyles fixed bottom-0 flex h-[64px] w-full bg-slate-100 blur" />
    <div className="fixed bottom-0 z-10 flex h-[64px] w-full flex-nowrap justify-evenly ">
      <Link
        href={'/'}
        className="flex h-full w-1/2 flex-col items-center justify-center px-2"
      >
        <Image src={'/Icons/Home.svg'} alt="menu" width={32} height={32} />
      </Link>
      <Link
        href={'/transactions'}
        className="flex h-full w-1/2 flex-col items-center justify-center px-2"
      >
        <Image src={'/Icons/Clock.svg'} alt="menu" width={32} height={32} />
      </Link>
    </div>
  </div>
);

export default WalletControls;
