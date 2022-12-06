import { useAppSelector } from '../../hooks/use-app-selector';

import { getIsOffersDataLoading } from '../../store/offers-process/selectors';


const Loader = (): JSX.Element => {
  const isDataLoading = useAppSelector(getIsOffersDataLoading);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '2000',
        top: '0',
        left: '0',
        display: isDataLoading ? 'grid' : 'none',
        placeItems: 'center',
        height: '100%',
        width: '100%',
        fontSize: '40px',
        backgroundColor: '#f5f5f5'
      }}
    >
      <p>Loading...</p>
    </div>
  );
};


export default Loader;
