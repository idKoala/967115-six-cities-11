import { Link } from 'react-router-dom';
import PlaceCards from '../../components/place-cards/place-cards';
import {Offer} from '../../types/offer';
import Map from '../../components/map/map';
import {cities} from '../../mocks/cities';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {loadOffers} from '../../store/actions';
import {offersInCity} from '../../utils';

type MainScreenProps = {
    offers: Offer[];
}

function MainScreen ({offers}: MainScreenProps):JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(loadOffers());
  const offers1 = useAppSelector((state) => state.offers);
  const city1 = useAppSelector((state) => state.city);
  const cityOffers1 = offers1 ? offersInCity(offers1, city1.name).length : '';

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to='/'>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers1} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                    Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                        Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                        Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                        Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                        Top rated first
                  </li>
                </ul>
              </form>
              <PlaceCards offers={offers}/>
            </section>
            <div className="cities__right-section">
              <Map city={cities[0]} offers={offers}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
