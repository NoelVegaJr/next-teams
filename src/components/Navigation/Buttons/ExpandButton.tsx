import { ChartBarIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "react-use-measure";

export default function ExpandButton({
  className,
  onClick,
  title,
  children,
  button,
}: {
  className?: string;
  onClick: () => void;
  title: string;
  children: JSX.Element | JSX.Element[];
  button: JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, bounds] = useMeasure();

  const panelHeightAnimatedStyle = useSpring({
    height: isOpen ? bounds.height : 0,
  });

  return (
    <>
      <button
        onClick={() => {
          onClick();
          setIsOpen(!isOpen);
        }}
        className={`${className} w-full`}
      >
        {button}
      </button>
      <animated.div
        style={panelHeightAnimatedStyle}
        className="overflow-hidden "
      >
        <div ref={ref} className=" flex flex-col  text-gray-400 ">
          {children}
        </div>
      </animated.div>
    </>
  );
}
