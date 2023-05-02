import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import PrettyAccount from '../PrettyAccount';

type IBackButtonProps = {
  back: string;
};
const BackButton = (props: IBackButtonProps) => (
  <Link href={props.back} className="flex items-center justify-between">
    <Image src="/BackArrow.svg" alt="back" width={24} height={24} />
    <span className="pl-2 text-funGrey-200">Back</span>
  </Link>
);
const SettingsButton = () => (
  <Image src="/SettingsGear.svg" alt="settings" width={18} height={18} />
);

type IHeaderNavProps = {
  back?: string;
};

const HeaderNav = (props: IHeaderNavProps) => {
  return (
    <nav className="border-b border-slate-300 h-[64px] p-4">
      <ul className="flex flex-wrap items-center justify-between text-xl">
        <li className="pl-2">
          {typeof props.back === 'string' ? (
            <BackButton back={props.back} />
          ) : (
            <SettingsButton />
          )}
        </li>
        <li className="">
          <PrettyAccount />
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
