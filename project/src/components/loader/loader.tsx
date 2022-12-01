import { useAppSelector } from '../../hooks/use-app-selector';


const Loader = (): JSX.Element => {
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '2000',
        top: '0',
        left: '0',
        display: isDataLoaded ? 'none' : 'grid',
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
