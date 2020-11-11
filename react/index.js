const { useState, useEffect } = require('react');
const { useTheme } = require('styled-components');

exports.useBreakpoint = (breakpoint) => {
  const query = breakpoint({
    theme: useTheme(),
  }).replace(/^@media/, '');

  const mq = window.matchMedia(query);
  const [isBreak, setIsBreak] = useState(mq.matches);

  useEffect(() => {
    const handleResize = () => {
      setIsBreak(window.matchMedia(query).matches);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isBreak;
};