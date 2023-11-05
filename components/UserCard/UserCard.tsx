import { useState } from "react";
import { GetUsersData } from "../../lib/schema";
import { UserInfoModal } from "../UserInfoModal";
import cx from "classnames";
import { Avatar } from "../Avatar";

export interface UserCardProps {
  data: Partial<GetUsersData>;
  className?: string;
}

export const UserCard = (props: UserCardProps) => {
  const { data, className } = props;
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        className={cx(
          "rounded-[10px] bg-white hover:bg-white--hover p-6 w-max transition-all duration-300 flex flex-col items-center gap-[17px]",
          className
        )}
      >
        <Avatar size="100" alt={`${data?.name} logo`} />
        {data?.name ? (
          <h2 className="truncate max-w-[100%] text-sm leading-[21px]">
            {data.name}
          </h2>
        ) : null}
        {data?.email ? (
          <a
            href={`mailto:${data.email}`}
            className="text-center truncate max-w-[100%] text-xs leading-[18px]"
          >
            {data.email}
          </a>
        ) : null}
        <button className="text-primary h-6" onClick={openModal}>
          <span className="text-shadowed">See more</span>
        </button>
      </div>

      <UserInfoModal open={open} setOpen={setOpen} data={data} />
    </>
  );
};
