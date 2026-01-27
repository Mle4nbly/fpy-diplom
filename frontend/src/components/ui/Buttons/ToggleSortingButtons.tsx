import { useContext } from 'react';
import { ViewTypeContext } from '../../../contexts/ViewTypeContext/ViewTypeContext';

export const ToggleSortingButtons = () => {
  const { viewType, setViewType } = useContext(ViewTypeContext);

  return (
    <div className="radio-group">
      <button
        className={`btn ${viewType === 'GRID' ? 'btn-dark' : 'btn-light'} radio-left`}
        role="radio"
        onClick={() => setViewType('GRID')}
        title="Карточки"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 -960 960 960">
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133ZM200-413h133v-134H200v134Zm213 0h134v-134H413v134Zm214 0h133v-134H627v134ZM200-627h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133Z" />
        </svg>
      </button>
      <button
        className={`btn ${viewType === 'LIST' ? 'btn-dark' : 'btn-light'} radio-right`}
        role="radio"
        onClick={() => setViewType('LIST')}
        title="Список"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 -960 960 960">
          <path d="M760-200v-120H200v120h560Zm0-200v-160H200v160h560Zm0-240v-120H200v120h560ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
        </svg>
      </button>
    </div>
  );
};
