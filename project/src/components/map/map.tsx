type CitiesMapProps = {
  selectedPlaceID: number | undefined;
}


const Map = (props: CitiesMapProps): JSX.Element => {
  const { selectedPlaceID } = props;

  return (
    <section className="cities__map map">
      {/* просто для демонстрации */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          fontSize: '50px',
          color: 'white',
          backgroundColor: selectedPlaceID ? 'rgba(0, 0, 0, 0.5)' : ''
        }}
      >
        { selectedPlaceID && `Hovered place: ${ selectedPlaceID }` }
      </div>
    </section>
  );
};


export default Map;
