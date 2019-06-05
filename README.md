# data-prefetch-link
Extends `<Link>` to allow invoking `getInitialProps` when prefetching a page. That way, if you use a caching layer in  `getInitialProps`, the page data will be already cached when you click the link, thus producing the same instantaneous navigation that is possible with prefetched static pages.

This approach is explained in more detail in our blog post: [Increasing the Performance of Dynamic Next.js Websites](https://scale.ai/blog/performance-on-next-js-websites).

## Installation
```sh
npm i --save data-prefetch-link
```

## Usage
This component extends Next.js `<Link>`, so you can use the same parameters and expect the same behavior. Additionally, you can pass the prop `withData`, which will make it run `getInitialProps` when prefetching (this only works when `prefetch` is also used). So a usage with data prefetching would look like this:

```jsx
import Link from 'data-prefetch-link'

<Link prefetch withData href="…"><a>Some dynamic page</a></Link>
```

When `getInitialProps` is invoked by this component, the context will receive an `isVirtualCall` flag set to `true`, which can be used to skip fetching resources that will not be cached, so these calls are not made unnecessarily.

## Note
Prefetching data should be used strategically, rather than habitually.

A good use case might be high-level pages in the header navigation, in which there are typically only a handful. Or when you'd expect a link to get clicked on.

You probably wouldn't want to use it on large lists of links (e.g. grid with infinite scroll) as this would negatively affect performance — for both your users and the web server that's handling the requests.

## Licence 
MIT

