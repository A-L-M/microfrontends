import React, {useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {mount} from 'auth/AuthApp';

const AuthApp = ({onSignIn}) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
      const {onParentNavigate} = mount(
        ref.current, {
        onNavigate: ({pathname: nextPathName}) => {
          const {pathName} = history.location;

          if(pathName !== nextPathName) {
            history.push(nextPathName);
          }
        },
        initialPathname: history.location.pathname,
        onSignIn,
      });

      history.listen(onParentNavigate);
    }, [])
    

    return <div ref={ref} />;
}

export default AuthApp;