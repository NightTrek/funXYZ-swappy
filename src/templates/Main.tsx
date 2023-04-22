import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import HeaderNav from '@/components/HeaderNav';

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

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  backButtonNav?: string;
  displayWalletControls?: boolean;
};

const Main = (props: IMainProps) => (
  <div className="bgBody w-full text-gray-700 antialiased ">
    {props.meta}

    <div className="w-full">
      <header className="w-full border-2  border-black">
        <HeaderNav back={props.backButtonNav} />
      </header>
      <div className="mx-auto px-4">
        <main className="content py-5 text-xl">{props.children}</main>
      </div>
      {props.displayWalletControls && <WalletControls />}

      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        Footer
      </footer>
    </div>
  </div>
);

export { Main };
