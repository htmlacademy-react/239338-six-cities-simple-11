import './loader.css';

import { useAppSelector } from '../../hooks/use-app-selector';

import { getIsOffersDataLoading } from '../../store/offers-process/selectors';


const Loader = (): JSX.Element => {
  const isDataLoading = useAppSelector(getIsOffersDataLoading);

  return (
    <div
      className='loader'
      style={{
        display: !isDataLoading ? 'none' : ''
      }}
    >
      <p>Loading...</p>
    </div>
  );
};


export default Loader;
