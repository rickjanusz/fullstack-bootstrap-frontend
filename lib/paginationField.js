import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will take care of cache
    read(existing = [], { args, cache }) {
      // console.log({ existing, args, cache });
      const { skip, first } = args;

      // 1. read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // 2. check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we do not have any existing items
        // we must go to the network and fetch them
        return false;
      }
      // if there are items-
      // return them from the cache
      // we DO NOT need to go to the network
      if (items.length) {
        // console.log(`there are ${items.length} items in the cache`);
        return items;
      }
      // fallback\-
      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the apollo client comes back
      // from the network with our products
      // console.log({ existing, incoming, args });
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // console.log({ merged });
      return merged;
    },
  };
}
