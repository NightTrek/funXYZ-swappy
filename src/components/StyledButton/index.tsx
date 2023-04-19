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
      className={`flex h-14 w-full min-w-[128px] items-center justify-center rounded-md ${props.buttonColor}`}
    >
      {props.buttonIcon && (
        <Image
          src={props.buttonIcon}
          alt="button icon"
          width={32}
          height={32}
        />
      )}
      <span
        className={`px-2 py-1 text-lg font-bold ${ButtonTextColor(
          props.buttonColor
        )}`}
      >
        {props.buttonText}
      </span>
    </Link>
  );
};

const StyledActionButton = (props: IStyledButtonProps) => (
  <div
    className="flex h-14 w-full content-center justify-center"
    onClick={props.buttonAction}
  ></div>
);

const StyledButton = (props: IStyledButtonProps) => {
  if (!props.buttonLink && !props.buttonAction)
    throw new Error('No button link or action provided');
  if (props.buttonLink) return <StyledLinkButton {...props} />;
  return <StyledActionButton {...props} />;
};

export default StyledButton;
