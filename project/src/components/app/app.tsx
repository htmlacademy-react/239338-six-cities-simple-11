import MainScreen from '../../pages/main-screen/main-screen';
// import PropertyScreen from '../../pages/property-screen/property-screen';
// import LoginScreen from '../../pages/login-screen/login-screen';


type AppProps = {
  isLogged: boolean;
  resultsCount: number;
}


const App = (props: AppProps): JSX.Element => {
  const { isLogged, resultsCount } = props;

  return (
    <>
      <MainScreen
        isLogged= { isLogged }
        resultsCount= { resultsCount }
      />

      {/* <PropertyScreen
        isLogged= { isLogged }
      /> */}

      {/* <LoginScreen /> */}
    </>
  );
};


export default App;
