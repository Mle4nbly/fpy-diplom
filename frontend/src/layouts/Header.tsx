import { UserButton } from '../components/ui/Buttons/UserButton';
import { HomeButton } from '../components/ui/Buttons/HomeButton';

export const Header = () => {
  return (
    <header className="page-header-section">
      <div className="page-header-container">
        <HomeButton />
        <UserButton />
      </div>
    </header>
  );
};
