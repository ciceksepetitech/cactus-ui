interface IProps {
  variant: 'primary' | 'secondary';
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default IProps;
