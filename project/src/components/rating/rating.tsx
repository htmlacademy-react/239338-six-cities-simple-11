import { RatingValue } from '../../const';


type RatingProps = {
  parentClass: string;
  value: number;
  hasValueOutput?: true;
}


const Rating = (props: RatingProps): JSX.Element => {
  const { parentClass, value, hasValueOutput = false } = props;


  return (
    <div
      data-testid="rating"
      className={ `${ parentClass }__rating rating` }
    >
      <div className={ `${ parentClass }__stars rating__stars` }>
        <span
          data-testid="rating-stars"
          style={{
            width: `${ Math.round(value) / RatingValue.MAX * 100 }%`
          }}
        >
        </span>

        <span className="visually-hidden">Rating</span>
      </div>

      {
        hasValueOutput && (
          <span
            data-testid="rating-value-output"
            className={ `${ parentClass }__rating-value rating__value` }
          >
            { value }
          </span>
        )
      }
    </div>
  );
};


export default Rating;
