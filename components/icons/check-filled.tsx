import { IconProps } from "../../lib/schema";

export const IconCheckFilled = (props: IconProps) => {
  const { height, width, className, ...rest } = props;
  return (
    <span className={className} {...rest}>
      <svg
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2.46533C6.486 2.46533 2 6.95133 2 12.4653C2 17.9793 6.486 22.4653 12 22.4653C17.514 22.4653 22 17.9793 22 12.4653C22 6.95133 17.514 2.46533 12 2.46533ZM16.2805 10.7458L11.2805 15.7458C11.134 15.8923 10.942 15.9653 10.75 15.9653C10.558 15.9653 10.366 15.8923 10.2195 15.7458L7.7195 13.2458C7.4265 12.9528 7.4265 12.4783 7.7195 12.1853C8.0125 11.8923 8.487 11.8923 8.78 12.1853L10.7495 14.1548L15.219 9.68533C15.512 9.39233 15.9865 9.39233 16.2795 9.68533C16.5725 9.97833 16.573 10.4528 16.2805 10.7458Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
};
