/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';

type ISwapProps = {
  handleSwapButton: () => void;
};
const SwapButton = (props: ISwapProps) => {
  return (
    <div className="my-4 flex w-full flex-nowrap items-center justify-between">
      <div className="h-[1px] w-1/3 bg-funGrey-200 opacity-20" />
      <div
        className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white shadow"
        onClick={props.handleSwapButton}
      >
        <Image src="/Icons/Swap.svg" alt="swap" width={18.75} height={13.75} />
      </div>
      <div className="h-[1px] w-1/3 bg-funGrey-200 opacity-20" />
    </div>
  );
};

export default SwapButton;
