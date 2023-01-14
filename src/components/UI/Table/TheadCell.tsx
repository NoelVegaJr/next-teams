interface ITheadProps {
  name: string;
  className?: string;
}

const TheadCell = ({ name, className }: ITheadProps) => {
  return (
    <th scope="col" className={className}>
      {name}
    </th>
  );
};

export default TheadCell;
