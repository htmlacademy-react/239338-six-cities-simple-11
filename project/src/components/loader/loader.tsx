import './loader.css';

import { useAppSelector } from '../../hooks';

import { getIsOffersDataLoading } from '../../store/offers-process/selectors';


const Loader = (): JSX.Element => {
  const isDataLoading = useAppSelector(getIsOffersDataLoading);


  return (
    <div
      data-testid='loader'
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
