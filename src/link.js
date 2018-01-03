import Link from 'next/link';
import { resolve, parse } from 'url';
import Router from 'next/router';

export default class DataPrefetchLink extends Link {
  prefetch() {
    if (typeof window === 'undefined') {
      return;
    }

    const { pathname } = window.location;
    const href = resolve(pathname, this.props.href);
    const { query } = parse(this.props.href, true);

    return Router.prefetch(href).then(Component => {
      if (this.props.withData && Component) {
        const ctx = {pathname: href, query, isVirtualCall: true};
        return Component.getInitialProps(ctx);
      }
    });
  }
}
