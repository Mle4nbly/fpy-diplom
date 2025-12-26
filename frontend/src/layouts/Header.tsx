import { UserButton } from "../components/UI/Buttons/UserButton";
import { UploadButton } from "../components/UI/Buttons/UploadButton";
import { useContext } from "react";
import { FilesContext } from "../contexts/FilesContext/FilesContext";
import { HomeButton } from "../components/UI/Buttons/HomeButton";

export const Header = () => {

  return (
    <header className="page-header-section">
      <div className="page-header-container">
        <HomeButton/>
        <UserButton/>
      </div>
    </header>
  );
}