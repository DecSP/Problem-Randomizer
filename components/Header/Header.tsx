import { Avatar } from "../Avatar/Avatar";
import { IconHelp, IconNotification } from "../icons";
import { Icon } from "@iconify/react";

export const Header = () => {
  return (
    <header className="w-screen bg-transparent px-7 py-5 fixed top-0 z-40">
      <div className="section-container text-black flex justify-end items-center">
        <div className="flex items-center">
          <button data-testid="help-button" className="text-2xl">
            <Icon icon="codicon:github-inverted" />
          </button>
        </div>
      </div>
    </header>
  );
};
