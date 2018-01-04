import Link from 'next/link';
import { resolve, parse } from 'url';
import Router from 'next/router';

export default class DataPrefetchLink extends Link {
  prefetch() {
    if (typeof window === 'undefined' || !this.props.prefetch) {
      return;
    }

    const { pathname } = window.location;
    const href = resolve(pathname, this.props.href);
    const { query } =
      typeof this.props.href !== 'string' ? this.props.href : parse(url, true);

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
