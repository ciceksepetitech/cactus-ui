import React, { FC } from "react";
import IProps from "./props";


const Component: FC<IProps> = (props: IProps) => {
  console.log(props);

  return (
    <div>
      Button
    </div>
  );
};

export default Component;
