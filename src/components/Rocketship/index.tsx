import React from 'react';

type IRocketshipSize = {
  outter: string;
  inner: string;
};

export const RocketshipSize = {
  SMALL: { outter: 'w-6 h-6', inner: 'h-[14px] w-[14px]' },
  MEDIUM: { outter: 'w-[80px] h-[80px]', inner: 'w-[42px] h-[43px]' },
  LARGE: { outter: 'w-[80px] h-[80px]', inner: 'w-16 h-16' },
};

type IRocketshipProps = {
  size: IRocketshipSize;
};

const Rocketship = (props: IRocketshipProps) => (
  <div
    className={`flex items-center justify-center  rounded-full bg-orange-300 p-1 ${props.size.outter}`}
  >
    <div className={`bg-rocket-icon bg-contain ${props.size.inner}`} />
  </div>
);

export default Rocketship;
