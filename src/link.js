import exact from 'prop-types-exact';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { resolve, parse, format } from 'url';

// Copied from 'prop-types-exact'
const zeroWidthSpace = '\u200b';
const specialProperty = `prop-types-exact: ${zeroWidthSpace}`;

export default class DataPrefetchLink extends Link {
  static getLinkPropTypesNoExact() {
    const linkPropTypes = { ...Link.propTypes };
    delete linkPropTypes[specialProperty];
    return linkPropTypes;
  }

  static propTypes = exact({
    ...DataPrefetchLink.getLinkPropTypesNoExact(),
    withData: PropTypes.bool,
  });

  prefetch() {
    if (typeof window === 'undefined' || !this.props.prefetch) {
      return;
    }

    const { pathname } = window.location;
    const hrefString =
      this.props.href !== 'string' ? format(this.props.href) : this.props.href;
    const href = resolve(pathname, hrefString);
    const { query } = parse(href, true);

    return Router.prefetch(href).then(Component => {
      if (
        this.props.withData &&
        Component &&
        Component.getInitialProps &&
        typeof Component.getInitialProps === 'function'
      ) {
        const ctx = { pathname: href, query, isVirtualCall: true };
        return Component.getInitialProps(ctx).then(() => Component);
      }
    });
  }
}
