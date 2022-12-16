import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { KeyCode, NameSpace, OFFERS_SORTING_OPTIONS } from '../../const';

import PlacesSorting from './places-sorting';


enum ElementID {
  TypeOutput = 'places-sorting-type',
  List = 'places-sorting-list'
}

enum ActiveClass {
  Option = 'places__option--active',
  List = 'places__options--opened'
}


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Offers]: {
    sortingType: OFFERS_SORTING_OPTIONS[0].type
  }
});


describe('Component: PlacesSorting', () => {
  it('should render correctly', () => {
    render(
      <Provider store={ store }>
        <PlacesSorting/>
      </Provider>
    );


    const captionElement = screen.getByText(/Sort by/i);
    const typeOutputElement = screen.getByTestId(ElementID.TypeOutput);

    const optionElements = OFFERS_SORTING_OPTIONS.map((option) => screen.getByTestId(option.type));


    expect(captionElement).toBeInTheDocument();

    expect(typeOutputElement).toBeInTheDocument();
    expect(typeOutputElement).toHaveTextContent(OFFERS_SORTING_OPTIONS[0].text);

    optionElements.forEach((optionElement, index) => {
      expect(optionElement).toBeInTheDocument();
      expect(optionElement).toHaveAttribute('id', OFFERS_SORTING_OPTIONS[index].type);
      expect(optionElement).toHaveTextContent(OFFERS_SORTING_OPTIONS[index].text);
    });

    expect(optionElements[0]).toHaveClass(ActiveClass.Option);
    expect(optionElements[0]).toHaveStyle('pointer-events: none');
  });


  it('should open and close options list correctly', () => {
    render(
      <Provider store={ store }>
        <PlacesSorting/>
      </Provider>
    );


    const typeOutputElement = screen.getByTestId(ElementID.TypeOutput);
    const listElement = screen.getByTestId(ElementID.List);


    fireEvent.click(typeOutputElement);
    expect(listElement).toHaveClass(ActiveClass.List);

    fireEvent.click(typeOutputElement);
    expect(listElement).not.toHaveClass(ActiveClass.List);


    fireEvent.keyDown(typeOutputElement, {key: KeyCode.Enter});
    expect(listElement).toHaveClass(ActiveClass.List);

    fireEvent.keyDown(typeOutputElement, {key: KeyCode.Enter});
    expect(listElement).not.toHaveClass(ActiveClass.List);
  });


  it('should close options list by option click', () => {
    render(
      <Provider store={ store }>
        <PlacesSorting/>
      </Provider>
    );


    const newCurrentOptionElement = screen.getByTestId(OFFERS_SORTING_OPTIONS[2].type);
    const listElement = screen.getByTestId(ElementID.List);


    fireEvent.click(newCurrentOptionElement);

    expect(listElement).not.toHaveClass(ActiveClass.List);
  });
});

