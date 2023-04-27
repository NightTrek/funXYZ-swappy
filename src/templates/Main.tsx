import type { ReactNode } from 'react';

import HeaderNav from '@/components/HeaderNav';
import WalletControls from '@/components/WalletControls';

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
      <div className="mx-auto h-full px-4">
        <main className="content h-full py-5 text-xl">{props.children}</main>
      </div>
      {props.displayWalletControls && <WalletControls />}

      <footer className="border-t border-gray-300 py-8 text-center text-sm"></footer>
    </div>
  </div>
);

export { Main };
