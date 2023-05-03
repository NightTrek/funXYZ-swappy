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
    <div className=" flex h-full w-full items-start justify-center">
      <div className="outerShadow relative my-12 max-w-2xl rounded-xl">
        <header className="w-full border-2  border-black">
          <HeaderNav back={props.backButtonNav} />
        </header>
        <div className="mx-auto px-4">
          <main className="content my-5 text-xl">{props.children}</main>
        </div>
        {props.displayWalletControls && <WalletControls />}
      </div>
    </div>
  </div>
);

export { Main };
