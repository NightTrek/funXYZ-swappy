import type { ReactNode } from 'react';

import HeaderNav from '@/components/HeaderNav';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  backButtonNav?: string;
};

const Main = (props: IMainProps) => (
  <div className=" w-full text-gray-700 antialiased">
    {props.meta}

    <div className="w-full">
      <header className="w-full border-b border-gray-300">
        <HeaderNav back={props.backButtonNav} />
      </header>
      <div className="mx-auto px-4">
        <main className="content py-5 text-xl">{props.children}</main>
      </div>

      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Made with{' '}
        <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>.
        {/*
         * PLEASE READ THIS SECTION
         * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
         */}
      </footer>
    </div>
  </div>
);

export { Main };
