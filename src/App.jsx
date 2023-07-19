import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";

// import {
//   setCollectionCreated,
//   setItemCreated,
// } from './redux/slices/successNotificationSlice';

// import { useAppDispatch, useAppSelector } from './hooks/useRedux';


function App() {

  return (
    <div className="bg-backgroundPrimaryColor transition-all duration-300 ease-out min-h-screen">
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
