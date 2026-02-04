import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// --- GENERIC CRUD SERVICE ---

/** Entity shape required by the CRUD service. Must have a numeric `id`. */
export interface CrudEntity {
  id: number;
}

/**
 * Generic list response: list plus any extra fields from the API.
 * Use with parseListResponse when the API returns list + metadata (pagination, links, etc.).
 * Mutations only update the `list` property and preserve all other fields.
 */
export type ListResponse<T, M = Record<string, never>> = { list: T[] } & M;

/**
 * Convenience type for APIs that return { list, info }.
 * Same as ListResponse<T, { info: I }>.
 */
export type ListWithInfo<T, I> = ListResponse<T, { info: I }>;

/** Configuration for creating a CRUD service. */
export interface CrudServiceConfig<T extends CrudEntity, ListMeta = undefined> {
  /** Query key segment (e.g. "posts", "users"). Used for cache keys. */
  entityKey: string;
  /** Base API URL (e.g. "https://api.example.com/posts" or "/api/posts"). */
  baseUrl: string;
  /** Optional: custom error message when fetch fails. */
  notFoundMessage?: string;
  /**
   * Optional: return only the list when the API wraps it (e.g. { results: T[] }).
   * Hook returns T[]; simplest when you don't need other response fields.
   */
  listFromResponse?: (body: unknown) => T[];
  /**
   * Optional: return list + any metadata. Your parser returns { list: T[], ...meta }.
   * Hook returns that object; mutations preserve meta and only update list.
   * Use createCrudService<T, ListMeta> to type the extra fields.
   */
  parseListResponse?: (body: unknown) => ListResponse<T, ListMeta>;
}

/** Query key factory returned by createCrudService. */
export interface CrudQueryKeys {
  all: readonly [string];
  lists: () => readonly [string, string];
  details: () => readonly [string, string];
  detail: (id: number) => readonly [string, string, number];
}

/** List data: T[] when no parser or listFromResponse, or { list, ...meta } when parseListResponse. */
export type ListData<T, M> = M extends undefined ? T[] : ListResponse<T, M>;

/** Return type of createCrudService. */
export interface CrudServiceResult<T extends CrudEntity, ListMeta = undefined> {
  queryKeys: CrudQueryKeys;
  useGetList: () => ReturnType<typeof useQuery<ListData<T, ListMeta>>>;
  useGetItem: (id: number) => ReturnType<typeof useQuery<T>>;
  useCreate: () => ReturnType<typeof useMutation<T, Error, Omit<T, "id">>>;
  useUpdate: () => ReturnType<typeof useMutation<T, Error, T>>;
  useDelete: () => ReturnType<typeof useMutation<number, Error, number>>;
}

/**
 * Creates a generic CRUD service for TanStack Query.
 * Supports list, detail, create (optimistic), update, and delete (optimistic).
 *
 * List responses:
 * - No config: API returns T[] → hook returns T[].
 * - listFromResponse: unwrap to T[] (e.g. body.results) → hook returns T[].
 * - parseListResponse: return { list: T[], ...meta } → hook returns full object; mutations preserve meta.
 *
 * @param config - Entity key, base URL, and optional list parsers
 * @returns Query keys and hooks for the entity
 *
 * @example List only (simple)
 * createCrudService<Post>({ entityKey: "posts", baseUrl: "/api/posts" })
 *
 * @example List + metadata (any shape)
 * createCrudService<Item, { info: Info; next?: string }>({
 *   entityKey: "items", baseUrl: "/api/items",
 *   parseListResponse: (body) => ({ list: body.data, info: body.info, next: body.links?.next }),
 * })
 */
export function createCrudService<T extends CrudEntity, ListMeta = undefined>(
  config: CrudServiceConfig<T, ListMeta>
): CrudServiceResult<T, ListMeta> {
  const {
    entityKey,
    baseUrl,
    notFoundMessage = "Not found",
    listFromResponse,
    parseListResponse,
  } = config;

  const hasListMeta = !!parseListResponse;

  const queryKeys: CrudQueryKeys = {
    all: [entityKey] as const,
    lists: () => [...queryKeys.all, "list"] as const,
    details: () => [...queryKeys.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.details(), id] as const,
  };

  const useGetList = (): ReturnType<
    CrudServiceResult<T, ListMeta>["useGetList"]
  > =>
    useQuery({
      queryKey: queryKeys.lists(),
      queryFn: async (): Promise<ListData<T, ListMeta>> => {
        const res = await fetch(baseUrl);
        if (!res.ok) throw new Error(`Failed to fetch ${entityKey}`);
        const body = await res.json();
        if (parseListResponse)
          return parseListResponse(body) as ListData<T, ListMeta>;
        if (listFromResponse)
          return listFromResponse(body) as ListData<T, ListMeta>;
        return body as T[] as ListData<T, ListMeta>;
      },
    }) as ReturnType<CrudServiceResult<T, ListMeta>["useGetList"]>;

  const useGetItem = (id: number) =>
    useQuery({
      queryKey: queryKeys.detail(id),
      queryFn: async (): Promise<T> => {
        const res = await fetch(`${baseUrl}/${id}`);
        if (!res.ok) throw new Error(notFoundMessage);
        return res.json();
      },
      enabled: !!id,
    });

  const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (newItem: Omit<T, "id">) => {
        const res = await fetch(baseUrl, {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: { "Content-type": "application/json" },
        });
        return res.json();
      },
      onMutate: async (newItem) => {
        await queryClient.cancelQueries({ queryKey: queryKeys.lists() });
        const previous = queryClient.getQueryData<
          T[] | ListResponse<T, ListMeta>
        >(queryKeys.lists());
        queryClient.setQueryData<T[] | ListResponse<T, ListMeta>>(
          queryKeys.lists(),
          (old) => {
            const isListResponse =
              hasListMeta &&
              old != null &&
              typeof old === "object" &&
              "list" in old;
            const arr = isListResponse
              ? (old as ListResponse<T, ListMeta>).list
              : ((old ?? []) as T[]);
            const nextList = [{ ...newItem, id: Date.now() } as T, ...arr];
            return isListResponse
              ? { ...(old as ListResponse<T, ListMeta>), list: nextList }
              : nextList;
          }
        );
        return { previous };
      },
      onError: (_err, _newItem, context) => {
        queryClient.setQueryData(queryKeys.lists(), context?.previous);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      },
    });
  };

  const useUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (updatedItem: T) => {
        const res = await fetch(`${baseUrl}/${updatedItem.id}`, {
          method: "PATCH",
          body: JSON.stringify(updatedItem),
          headers: { "Content-type": "application/json" },
        });
        return res.json();
      },
      onSuccess: (data: T) => {
        queryClient.setQueryData(queryKeys.detail(data.id), data);
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      },
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id: number) => {
        await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
        return id;
      },
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: queryKeys.lists() });
        const previous = queryClient.getQueryData<
          T[] | ListResponse<T, ListMeta>
        >(queryKeys.lists());
        queryClient.setQueryData<T[] | ListResponse<T, ListMeta>>(
          queryKeys.lists(),
          (old) => {
            const isListResponse =
              hasListMeta &&
              old != null &&
              typeof old === "object" &&
              "list" in old;
            const arr = isListResponse
              ? (old as ListResponse<T, ListMeta>).list
              : ((old ?? []) as T[]);
            const nextList = arr.filter((item) => item.id !== id);
            return isListResponse
              ? { ...(old as ListResponse<T, ListMeta>), list: nextList }
              : nextList;
          }
        );
        return { previous };
      },
      onError: (_err, _id, context) => {
        queryClient.setQueryData(queryKeys.lists(), context?.previous);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      },
    });
  };

  return {
    queryKeys,
    useGetList,
    useGetItem,
    useCreate,
    useUpdate,
    useDelete,
  };
}

/* --- USAGE EXAMPLES ---
 *
 * List response options:
 * - No list config: API returns T[] → hook returns T[].
 * - listFromResponse: unwrap to T[] (e.g. body.results) → hook returns T[].
 * - parseListResponse: return { list: T[], ...meta } → hook returns full object; mutations preserve meta.
 *
 * --- Example 1: API returns array directly (e.g. JSONPlaceholder) ---
 *
 * const postService = createCrudService<Post>({
 *   entityKey: "posts",
 *   baseUrl: "https://jsonplaceholder.typicode.com/posts",
 *   notFoundMessage: "Post not found",
 * });
 * export const useGetPosts = postService.useGetList;  // data: Post[] | undefined
 *
 * --- Example 2: API wraps list (e.g. { results: T[] }) — return only the list ---
 *
 * const postService = createCrudService<Post>({
 *   entityKey: "posts",
 *   baseUrl: "https://api.example.com/posts",
 *   listFromResponse: (body) => (body as { results: Post[] }).results,
 * });
 * export const useGetPosts = postService.useGetList;  // data: Post[] | undefined
 *
 * --- Example 3: API returns list + metadata (e.g. { results, info, next }) — access everything ---
 *
 * interface PostListMeta {
 *   info: { count: number; pages: number; next: string | null };
 *   nextPage?: string;
 * }
 * const postService = createCrudService<Post, PostListMeta>({
 *   entityKey: "posts",
 *   baseUrl: "https://api.example.com/posts",
 *   parseListResponse: (body) => {
 *     const { results, info, links } = body as { results: Post[]; info: PostListMeta["info"]; links?: { next: string } };
 *     return { list: results, info, nextPage: links?.next };
 *   },
 * });
 * export const useGetPosts = postService.useGetList;  // data: { list: Post[]; info: ...; nextPage?: string } | undefined
 *
 * --- Hook usage (same for all list shapes) ---
 *
 * 1. READ LIST:   const { data, isLoading } = useGetPosts();
 *                 // data is T[] (examples 1–2) or { list, ...meta } (example 3); use data?.list ?? data for items
 * 2. READ ITEM:   const { data: item } = useGetPost(1);
 * 3. CREATE:      const { mutate: create } = useCreatePost();
 *                 create({ title: "Hello", body: "World", userId: 1 });
 * 4. UPDATE:      const { mutate: update } = useUpdatePost();
 *                 update({ id: 1, title: "New Title", body: "...", userId: 1 });
 * 5. DELETE:      const { mutate: deleteItem } = useDeletePost();
 *                 deleteItem(1);
 */
