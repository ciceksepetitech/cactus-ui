import React, { FC } from 'react';
import IProps from './props';

const Component: FC<IProps> = (props: IProps) => {
  const { variant, onClick } = props;

  return <button onClick={onClick}>Button ({variant})</button>;
};

export default Component;
