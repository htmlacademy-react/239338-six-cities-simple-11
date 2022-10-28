type RatingProps = {
  parentClass: string;
  value: number;
  hasValueOutput?: true;
}


const Rating = (props: RatingProps): JSX.Element => {
  const { parentClass, value, hasValueOutput = false } = props;
  const MAX_VALUE = 5;

  return (
    <div className={ `${ parentClass }__rating rating` }>
      <div className={ `${ parentClass }__stars rating__stars` }>
        <span style=
          {{
            width: `${ value / MAX_VALUE * 100 }%`
          }}
        >
        </span>

        <span className="visually-hidden">Rating</span>
      </div>

      {
        hasValueOutput ? (
          <span className={ `${ parentClass }__rating-value rating__value` }>{ value }</span>
        ) : ''
      }
    </div>
  );
};


export default Rating;
