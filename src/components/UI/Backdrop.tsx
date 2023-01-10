interface IBackDropProps {
  close: () => void;
}

const BackDrop: React.FunctionComponent<IBackDropProps> = ({ close }) => {
  return (
    <div onClick={close} className="fixed top-0 left-0 z-50 h-screen w-full" />
  );
};

export default BackDrop;
