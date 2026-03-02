import { UserMenu } from "../features/auth/UserMenu";
import { HomeButton } from '../shared/ui/buttons/HomeButton';

export const Header = () => {
  return (
    <header className="page-header-section">
      <div className="page-header-container">
        <HomeButton />
        <UserMenu />
      </div>
    </header>
  );
};
