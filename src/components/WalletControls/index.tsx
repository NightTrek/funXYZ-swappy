import Image from 'next/image';
import Link from 'next/link';

const WalletControls = () => (
  <div className="walletBorder absolute bottom-0 left-0 h-[64px] w-full rounded-b-xl">
    <div className="bgStyles walletBorder absolute bottom-0 flex h-[64px] w-full rounded-b-xl bg-slate-100 blur" />
    <div className="walletBorder absolute bottom-0 z-10 flex h-[64px] w-full flex-nowrap justify-evenly rounded-b-xl">
      <Link
        href={'/'}
        className="flex h-full w-1/2 flex-col items-center justify-center px-2 py-[22px]"
      >
        <Image src={'/Icons/Home.svg'} alt="menu" width={21} height={19.63} />
      </Link>
      <Link
        href={'/transactions'}
        className="flex h-full w-1/2 flex-col items-center justify-center px-2 py-[22px]"
      >
        <Image src={'/Icons/Clock.svg'} alt="menu" width={19.5} height={19.5} />
      </Link>
    </div>
  </div>
);

export default WalletControls;
