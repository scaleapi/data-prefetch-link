import Link from 'next/link';
import { resolve, parse } from 'url';
import Router from 'next/router';

export default class DataPrefetchLink extends Link {
  async prefetch() {
    if (typeof window === 'undefined') {
      return;
    }

    const { pathname } = window.location;
    const href = resolve(pathname, this.props.href);
    const { query } = parse(this.props.href, true);
    const Component = await Router.prefetch(href);

    if (this.props.withData && Component) {
      const ctx = {pathname: href, query, isVirtualCall: true};
      await Component.getInitialProps(ctx);
    }
  }
}
