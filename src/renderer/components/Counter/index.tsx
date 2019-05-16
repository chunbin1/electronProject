import * as React from 'react';

export interface Props {
  name: string;
  initValue: number;
}

export default function Counter(props: Props) {
  const {name,initValue} = props
  return <div>{name}</div>;
}
