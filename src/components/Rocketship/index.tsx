import React from 'react';

type IRocketshipSize = {
  outter: string;
  inner: string;
};

export const RocketshipSize = {
  SMALL: { outter: 'w-7 h-7', inner: 'h-3/4 w-3/4' },
  MEDIUM: { outter: 'w-24 h-24', inner: 'w-[42px] h-[43px]' },
  LARGE: { outter: 'w-24 h-24', inner: 'w-16 h-16' },
};

type IRocketshipProps = {
  size: IRocketshipSize;
};

const Rocketship = (props: IRocketshipProps) => (
  <div
    className={`flex items-center justify-center rounded-full bg-orange-300 p-1 ${props.size.outter}`}
  >
    <div className={`bg-rocket-icon bg-contain ${props.size.inner}`} />
  </div>
);

export default Rocketship;
