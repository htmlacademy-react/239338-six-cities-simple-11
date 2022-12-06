import { SyntheticEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useState, useRef } from 'react';

import { KeyCode, offersSortingOptions } from '../../const';

import { getSortingOptionByType } from '../../utils';
import { useAppSelector } from '../../hooks';

import { store } from '../../store';
import { setSortingType } from '../../store/offers-process/offers-process';
import { getSortingType } from '../../store/offers-process/selectors';


const PlacesSorting = (): JSX.Element => {
  const [ isOpened, setIsOpened ] = useState(false);

  const currentSortingType = useAppSelector(getSortingType);
  const currentSortingOption = getSortingOptionByType(currentSortingType);

  const documentRef = useRef<Document>(document);
  const documentRefCurrent = documentRef.current;


  const handleToggleButtonClick = (evt: SyntheticEvent) => {
    evt.preventDefault();

    setIsOpened((prevState) => !prevState);
  };

  const handleToggleButtonKeyDown = (evt: ReactKeyboardEvent) => {
    if (evt.key === KeyCode.Enter) {
      evt.preventDefault();

      setIsOpened((prevState) => !prevState);
    }
  };

  const handleOptionClick = (evt: SyntheticEvent) => {
    const target = evt.target as Element;

    evt.preventDefault();

    store.dispatch(setSortingType({
      sortingType: target.id
    }));

    setIsOpened(false);
  };


  useEffect(() => {
    const handleDocumentClick = (evt: MouseEvent) => {
      const target = evt.target as Element;

      if (isOpened && (!target.closest('.places__sorting-type') && !target.closest('.places__options'))) {
        evt.preventDefault();

        setIsOpened(false);
      }
    };

    const handleDocumentKeyDown = (evt: KeyboardEvent) => {
      if (isOpened && evt.key === KeyCode.Escape) {
        evt.preventDefault();

        setIsOpened(false);
      }
    };

    documentRefCurrent.addEventListener('click', handleDocumentClick);
    documentRefCurrent.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      documentRefCurrent.removeEventListener('click', handleDocumentClick);
      documentRefCurrent.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [isOpened, documentRefCurrent]);


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>

      <span
        className="places__sorting-type"
        tabIndex={ 0 }
        onClick={ handleToggleButtonClick }
        onKeyDown={ handleToggleButtonKeyDown }
      >
        { currentSortingOption?.text }

        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>

      <ul className={ `places__options places__options--custom ${ isOpened ? 'places__options--opened' : '' }` }>
        {
          offersSortingOptions.map((option) => {
            const isActive = option.type === currentSortingOption?.type;

            return (
              <li
                id={ option.type }
                key={ option.type }
                className={ `places__option ${ isActive ? 'places__option--active' : ''}` }
                tabIndex={ 0 }
                style={{
                  'pointerEvents': isActive ? 'none' : undefined
                }}
                onClick={ handleOptionClick }
              >
                { option.text }
              </li>
            );
          })
        }
      </ul>
    </form>
  );
};


export default PlacesSorting;
