import { IconProps } from '@/lib/schema';

export const IconLoading = (props: IconProps) => {
  const { height, width, className, ...rest } = props;
  return (
    <span className={className} {...rest}>
      <svg
        width={width || '64'}
        height={height || '64'}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.60008 31.4C4.55008 31.4 4.50008 31.4 4.50008 31.4C3.65008 31.35 3.05008 30.6 3.10008 29.8C3.35008 26.65 4.10008 23.6 5.30008 20.75C5.60008 20 6.50008 19.65 7.25008 19.95C8.00008 20.25 8.35008 21.15 8.05008 21.9C6.95008 24.5 6.30008 27.2 6.10008 30C6.00008 30.8 5.35008 31.4 4.60008 31.4ZM12.6001 12.6C13.1501 13.15 14.0501 13.2 14.6501 12.65C19.4501 8.35 25.5501 6 32.0001 6C37.6001 6 42.9501 7.75 47.4001 11.05H45.0001C44.2001 11.05 43.4501 11.65 43.4001 12.45C43.3501 13.3 44.0501 14.05 44.9001 14.05H51.4001C52.2501 14.05 52.9001 13.4 52.9001 12.55V6.15C52.9001 5.35 52.3001 4.6 51.5001 4.55C50.6501 4.5 49.9001 5.2 49.9001 6.05V9.2C39.0001 0.549997 23.1501 0.949996 12.6501 10.4C12.0001 11 12.0001 12 12.6001 12.6ZM5.75008 38.85C5.36551 38.85 4.9967 39.0028 4.72477 39.2747C4.45284 39.5466 4.30008 39.9154 4.30008 40.3C4.30008 40.6846 4.45284 41.0534 4.72477 41.3253C4.9967 41.5972 5.36551 41.75 5.75008 41.75C6.13464 41.75 6.50345 41.5972 6.77538 41.3253C7.04731 41.0534 7.20008 40.6846 7.20008 40.3C7.20008 39.9154 7.04731 39.5466 6.77538 39.2747C6.50345 39.0028 6.13464 38.85 5.75008 38.85Z"
          fill="#A7D5FF"
        />
        <path
          d="M56.55 19.55C57.35 19.2 58.2 19.55 58.55 20.3C63.4 31.35 61.05 44 52.5 52.5C46.85 58.15 39.45 61 32 61C25.65 61 19.3 58.9 14.05 54.8V57.95C14.05 58.8 13.4 59.45 12.55 59.45C11.7 59.45 11.05 58.8 11.05 57.95V51.45C11.05 50.6 11.7 49.95 12.55 49.95H19.05C19.9 49.95 20.55 50.6 20.55 51.45C20.55 52.3 19.9 52.95 19.05 52.95H16.6C21.05 56.25 26.4 58 32 58C38.95 58 45.45 55.3 50.4 50.45C58.05 42.8 60.15 31.45 55.8 21.55C55.45 20.75 55.8 19.9 56.55 19.55Z"
          fill="#17183B"
        />
      </svg>
    </span>
  );
};
