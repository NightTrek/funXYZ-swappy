/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';

type ISwapProps = {
  handleSwapButton: () => void;
};
const SwapButton = (props: ISwapProps) => {
  return (
    <div className="flex flex-nowrap justify-between items-center my-4 w-full">
      <div className="w-1/3 bg-funGrey-200 opacity-20 h-[1px]" />
      <div
        className="flex justify-center items-center bg-white rounded-full shadow h-[36px] w-[36px]"
        onClick={props.handleSwapButton}
      >
        <Image src="/Icons/Swap.svg" alt="swap" width={24} height={24} />
      </div>
      <div className="w-1/3 bg-funGrey-200 opacity-20 h-[1px]" />
    </div>
  );
};

export default SwapButton;
