import type { ReactNode } from 'react';

import HeaderNav from '@/components/HeaderNav';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  backButtonNav?: string;
};

const Main = (props: IMainProps) => (
  <div className=" w-full text-gray-700 antialiased">
    {props.meta}

    <div className="w-full">
      <header className="w-full border-2  border-black">
        <HeaderNav back={props.backButtonNav} />
      </header>
      <div className="mx-auto px-4">
        <main className="content py-5 text-xl">{props.children}</main>
      </div>

      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        Footer
      </footer>
    </div>
  </div>
);

export { Main };
