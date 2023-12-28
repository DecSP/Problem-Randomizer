import cx from 'classnames';
import { useEffect, useState } from 'react';

interface CounterProps {
  interval: number;
  minutes: number;
  className?: string;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
}

export const Counter = (props: CounterProps) => {
  const { interval, minutes, className, onStart, onPause, onStop } = props;

  const [count, setCount] = useState(minutes * 60);
  const [isPaused, setIsPaused] = useState(true);
  const [isStopped, setIsStopped] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isPaused && !isStopped) {
        if (count > 0) {
          setCount(count - 1);
        }
      }
    }, interval * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [interval, count, isPaused, isStopped]);

  const hourText = Math.floor(count / 3600).toFixed(0);
  const minText = Math.floor((count / 60) % 60).toFixed(0);
  const secText = Math.floor(count % 60).toFixed(0);

  const internalOnStart = () => {
    setIsPaused(false);
    setIsStopped(false);
    onStart?.();
  };

  const internalOnPause = () => {
    setIsPaused(true);
    onPause?.();
  };

  const internalOnStopped = () => {
    setIsPaused(true);
    setIsStopped(true);
    setCount(minutes * 60);
    onStop?.();
  };

  useEffect(() => {
    if (count <= 0) {
      onStop?.();
    }
  }, [count]);

  return (
    <div
      className={cx(
        'flex flex-col items-end gap-4 bg-white border border-neutral-100 p-4 min-w-[96px] w-max opacity-75 hover:opacity-100 transition-opacity duration-[250] text-center max-w-xl break-all',
        className,
      )}
    >
      <div className="flex gap-2 items-center">
        {(isPaused && isStopped) || count <= 0 ? (
          <>
            {count <= 0 ? (
              <button
                className="bg-black text-white h-auto px-2 py-1 text-sm md:text-base"
                onClick={() => {
                  internalOnStart();
                  setCount(minutes * 60);
                }}
              >
                Restart
              </button>
            ) : null}

            <button
              className={cx(
                'bg-black text-white h-auto px-2 py-1 text-sm md:text-base',
                {
                  'cursor-not-allowed !opacity-40': count <= 0,
                },
              )}
              disabled={count <= 0}
              onClick={internalOnStart}
            >
              Start
            </button>
          </>
        ) : (
          <button
            className="bg-black text-white h-auto px-2 py-1 text-sm md:text-base"
            onClick={isPaused ? internalOnStart : internalOnPause}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
        {isStopped || count <= 0 ? null : (
          <button
            className="bg-black text-white h-auto px-2 py-1 text-sm md:text-base"
            onClick={internalOnStopped}
          >
            Stop
          </button>
        )}
      </div>

      <span
        className="text-3xl md:text-5xl"
        style={{
          fontFamily: 'monospace',
        }}
      >
        {hourText && hourText !== '0' ? `${hourText}:` : ''}
        {minText.length <= 1 ? `0${minText}` : minText}:
        {secText.length <= 1 ? `0${secText}` : secText}
      </span>
    </div>
  );
};
