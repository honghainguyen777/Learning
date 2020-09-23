import React from 'react';

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    // allow to do ctrl+click to open a new tab
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();
    // here: Change the URL only
    window.history.pushState({}, '', href);
    // tell react that url has changed
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return <a onClick={onClick} className={className} href={href}>{children}</a>;
};

export default Link;
