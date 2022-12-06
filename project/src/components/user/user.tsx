import { User as UserType } from '../../types/user';


type UserProps = {
  user: UserType;
  parentClass: string;
  classPrefix?: string;
}


const User = (props: UserProps): JSX.Element => {
  const { user, parentClass, classPrefix } = props;
  const { isPro, avatarUrl, name } = user;


  return (
    <div className={ `${ parentClass }__${ classPrefix ? `${ classPrefix }-` : '' }user user` }>
      <div className={ `${ parentClass }__avatar-wrapper ${ isPro ? `${ parentClass }__avatar-wrapper--pro` : '' } user__avatar-wrapper` }>
        <img className={ `${ parentClass }__avatar user__avatar` } width="74" height="74" src={ avatarUrl } alt={ name }/>
      </div>

      <span className={ `${ parentClass }__user-name` }>
        { name }
      </span>

      { isPro && <span className={ `${ parentClass }__user-status` }>Pro</span> }
    </div>
  );
};


export default User;
