import React, {useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {mount} from 'marketing/MarketingApp';

const MarketingApp = () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
      const {onParentNavigate} = mount(ref.current, {
        onNavigate: ({pathname: nextPathName}) => {
          const {pathName} = history.location;

          if(pathName !== nextPathName) {
            history.push(nextPathName);
          }
        },
        initialPathname: history.location.pathname,
      });

      history.listen(onParentNavigate);
    }, [])
    

    return <div ref={ref} />;
}

export default MarketingApp;