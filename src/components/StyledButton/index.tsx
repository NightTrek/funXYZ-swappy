import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export enum ButtonColor {
  LIGHT = 'bg-funButton-100',
  MEDIUM = 'bg-funButton-200',
  DARK = 'bg-funButton-400',
}

type IStyledButtonProps = {
  buttonLink?: string;
  buttonAction?: () => void;
  buttonText: string;
  buttonColor: string;
  buttonIcon?: string;
  className?: string;
  innerStyles?: string;
};

const ButtonTextColor = (buttonColor: string) => {
  if (buttonColor === ButtonColor.LIGHT) return 'text-funButton-300';
  return 'text-slate-100';
};

const StyledLinkButton = (props: IStyledButtonProps) => {
  if (!props.buttonLink || typeof props.buttonLink !== 'string')
    throw new Error('Button Link wrong type of undefined');
  return (
    <Link
      href={props.buttonLink}
      className={`flex h-14 w-full min-w-[152px] content-center items-center justify-center rounded-2xl px-4 tracking-[0.01rem] ${props.buttonColor} ${props.className}`}
    >
      {props.buttonIcon && (
        <Image
          src={props.buttonIcon}
          alt="button icon"
          width={16}
          height={16}
          className={`mt-[1px] ${props.innerStyles}`}
        />
      )}
      <span
        className={`p-1 text-lg font-semibold ${ButtonTextColor(
          props.buttonColor
        )} ${props.innerStyles}`}
      >
        {props.buttonText}
      </span>
    </Link>
  );
};

const StyledActionButton = (props: IStyledButtonProps) => (
  <div
    className={` flex h-14 w-full min-w-[136px] items-center justify-center rounded-2xl px-4 tracking-[0.01rem] ${props.buttonColor}`}
    onClick={props.buttonAction}
  >
    {props.buttonIcon && (
      <Image src={props.buttonIcon} alt="button icon" width={24} height={24} />
    )}
    <span
      className={`p-1 text-lg font-semibold ${ButtonTextColor(
        props.buttonColor
      )}`}
    >
      {props.buttonText}
    </span>
  </div>
);

const StyledButton = (props: IStyledButtonProps) => {
  if (!props.buttonLink && !props.buttonAction)
    throw new Error('No button link or action provided');
  if (props.buttonLink) return <StyledLinkButton {...props} />;
  return <StyledActionButton {...props} />;
};

export default StyledButton;
