import { SyntheticEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { KeyCode, sortingOptions } from '../../const';
import { getSortingOptionByType } from '../../utils';

import { useAppSelector } from '../../hooks/use-app-selector';
import { setSortingType } from '../../store/action';


const PlacesSorting = (): JSX.Element => {
  const [ isOpened, setIsOpened ] = useState(false);
  const dispatch = useDispatch();

  const currentSortingType = useAppSelector((state) => state.sortingType);
  const currentSortingOption = getSortingOptionByType(currentSortingType);

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

    dispatch(setSortingType({
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

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [isOpened]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>

      <span
        className="places__sorting-type"
        tabIndex={ 0 }
        onClick={ handleToggleButtonClick }
        onKeyDown={ handleToggleButtonKeyDown }
      >
        { currentSortingOption.text }

        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>

      <ul className={ `places__options places__options--custom ${ isOpened ? 'places__options--opened' : '' }` }>
        {
          sortingOptions.map((option) => {
            const isActive = option.type === currentSortingOption.type;

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
