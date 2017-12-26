# data-prefetch-link
Extends `<Link>` to allow invoking `getInitialProps` when prefetching a page. That way, if there is a caching layer in  `getInitialProps`, the data will be already cached when you click the link, thus producing the same instantaneous navigation that is possible with prefetched static pages.

This approach is explained in more detail in our blog post: [Increasing the Performance of Dynamic Next.JS Websites](https://www.scaleapi.com/blog/increasing-the-performance-of-dynamic-next-js-websites).

## Usage
This component extends next.js `<Link>`, so you can use the same parameters and expect the same behavior. Additionally, you can pass the prop `withData`, which will make it run `getInitialProps` when prefetching (this only works when `prefetch` is also used). So a usage with data prefetching would look like this:

```html
<Link prefetch withData href="…"><a>Some dynamic page</a></Link>
```

When `getInitialProps` is invoked by this component, the context will receive an `isVirtualCall` flag set to `true`, which can be used to skip fetching resources that will not be cached, so these calls are not made unnecessarily.
