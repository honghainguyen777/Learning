import { useEffect, useState } from 'react';

// every components inside a component are called as children
//exp: <Father <child1 /> <child2 /> /> --> child1 and child2 as props are children of father

const Route = ({ path, children }) => {
  // get our route to update
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    // to stop showing the Route component on the Screen
    // we return a cleanup function to remove the addEventListener
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };

  }, []);

  return currentPath === path
    ? children
    : null;
};

export default Route;
