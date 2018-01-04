import Link from 'next/link';
import { resolve, parse, format } from 'url';
import Router from 'next/router';

export default class DataPrefetchLink extends Link {
  prefetch() {
    if (typeof window === 'undefined' || !this.props.prefetch) {
      return;
    }

    const { pathname } = window.location;
    const hrefString = this.props.href !== 'string' ? format(this.props.href) : this.props.href;
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
