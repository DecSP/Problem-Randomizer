import { useState, useEffect } from "react";
import cx from "classnames";

interface CounterProps {
  interval: number;
  className?: string;
}

export const Counter = (props: CounterProps) => {
  const { interval, className } = props;

  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, interval * 1000);
  }, [interval, count]);

  return (
    <div
      className={cx(
        "rounded-[10px] bg-white hover:bg-white--hover p-6 min-w-[96px] w-max transition-all duration-300 text-center max-w-xl break-all",
        className
      )}
    >
      <span className="text-primary text-5xl">{count}</span>
    </div>
  );
};
