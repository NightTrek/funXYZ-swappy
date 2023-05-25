import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import PrettyAccount from '../PrettyAccount';

type IBackButtonProps = {
  back: string;
};
const BackButton = (props: IBackButtonProps) => (
  <Link href={props.back} className="flex items-center justify-between">
    <Image src="/BackArrow.svg" alt="back" width={15} height={13.5} />
    <span className="pl-[12.5px] text-lg text-funGrey-200">Back</span>
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
    <nav className=" h-[68px] w-full border-b border-slate-300 p-4 px-6">
      <ul className="flex h-full w-full flex-wrap items-center justify-between text-xl">
        <li className="flex items-center">
          {typeof props.back === 'string' ? (
            <BackButton back={props.back} />
          ) : (
            <SettingsButton />
          )}
        </li>
        <li className="flex items-center ">
          <PrettyAccount />
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
