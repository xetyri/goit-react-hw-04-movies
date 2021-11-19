import { lazy, Suspense } from 'react';
import { Routes , Route} from 'react-router-dom';
import AppBar from "./components/AppBar";
import Loader from './components/Loader';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const HomePageView = lazy(() =>
  import("./components/views/HomePageView/HomePageView"),
);
const FilmPageView = lazy(() =>
  import("./components/views/FilmPageView/FilmPageView"),
);
const DetailPageView = lazy(() =>
  import("./components/views/DetailPageView/DetailPageView"),
);
const PageNotFindView = lazy(() =>
  import("./components/views/PageNotFindView/PageNotFindView"),
);


export default function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="https://xetyri.github.io/goit-react-hw-04-movies/" element={<HomePageView />}/>
          <Route path="https://xetyri.github.io/goit-react-hw-04-movies/movies" element={<FilmPageView />}/>
          <Route path="https://xetyri.github.io/goit-react-hw-04-movies/movies/:movieId/*" element={<DetailPageView />}/>
          <Route path="https://xetyri.github.io/goit-react-hw-04-movies/*" element={<PageNotFindView />}/>
        </Routes>
      </Suspense>
    </>
  );
} 