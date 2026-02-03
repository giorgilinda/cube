import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// --- GENERIC CRUD SERVICE ---

/** Entity shape required by the CRUD service. Must have a numeric `id`. */
export interface CrudEntity {
  id: number;
}

/** Configuration for creating a CRUD service. */
export interface CrudServiceConfig<T extends CrudEntity> {
  /** Query key segment (e.g. "posts", "users"). Used for cache keys. */
  entityKey: string;
  /** Base API URL (e.g. "https://api.example.com/posts" or "/api/posts"). */
  baseUrl: string;
  /** Optional: custom error message when fetch fails. */
  notFoundMessage?: string;
}

/** Query key factory returned by createCrudService. */
export interface CrudQueryKeys {
  all: readonly [string];
  lists: () => readonly [string, string];
  details: () => readonly [string, string];
  detail: (id: number) => readonly [string, string, number];
}

/** Return type of createCrudService. */
export interface CrudServiceResult<T extends CrudEntity> {
  queryKeys: CrudQueryKeys;
  useGetList: () => ReturnType<typeof useQuery<T[]>>;
  useGetItem: (id: number) => ReturnType<typeof useQuery<T>>;
  useCreate: () => ReturnType<typeof useMutation<T, Error, Omit<T, "id">>>;
  useUpdate: () => ReturnType<typeof useMutation<T, Error, T>>;
  useDelete: () => ReturnType<typeof useMutation<number, Error, number>>;
}

/**
 * Creates a generic CRUD service for TanStack Query.
 * Supports list, detail, create (optimistic), update, and delete (optimistic).
 *
 * @param config - Entity key and base API URL
 * @returns Query keys and hooks for the entity
 *
 * @example
 * ```ts
 * const postService = createCrudService<Post>({
 *   entityKey: "posts",
 *   baseUrl: "https://api.example.com/posts",
 * });
 * const { useGetList, useCreate } = postService;
 * ```
 */
export function createCrudService<T extends CrudEntity>(
  config: CrudServiceConfig<T>
): CrudServiceResult<T> {
  const { entityKey, baseUrl, notFoundMessage = "Not found" } = config;

  const queryKeys: CrudQueryKeys = {
    all: [entityKey] as const,
    lists: () => [...queryKeys.all, "list"] as const,
    details: () => [...queryKeys.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.details(), id] as const,
  };

  const useGetList = () =>
    useQuery({
      queryKey: queryKeys.lists(),
      queryFn: async (): Promise<T[]> => {
        const res = await fetch(baseUrl);
        if (!res.ok) throw new Error(`Failed to fetch ${entityKey}`);
        return res.json();
      },
    });

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
        const previous = queryClient.getQueryData<T[]>(queryKeys.lists());
        queryClient.setQueryData<T[]>(queryKeys.lists(), (old = []) => [
          { ...newItem, id: Date.now() } as T,
          ...old,
        ]);
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
        const previous = queryClient.getQueryData<T[]>(queryKeys.lists());
        queryClient.setQueryData<T[]>(queryKeys.lists(), (old = []) =>
          old.filter((item) => item.id !== id)
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

// --- EXAMPLE: Post service (JSONPlaceholder) ---
/*
export interface Post extends CrudEntity {
  title: string;
  body: string;
  userId: number;
}

const postService = createCrudService<Post>({
  entityKey: "posts",
  baseUrl: "https://jsonplaceholder.typicode.com/posts",
  notFoundMessage: "Post not found",
});

// Query key factory for Post-related queries.
export const postKeys = postService.queryKeys;

// Fetches all posts.
export const useGetPosts = postService.useGetList;

// Fetches a single post by ID.
export const useGetPost = postService.useGetItem;

// Creates a new post with optimistic update.
export const useCreatePost = postService.useCreate;

// Updates an existing post.
export const useUpdatePost = postService.useUpdate;

// Deletes a post with optimistic update.
export const useDeletePost = postService.useDelete;
*/

/* --- USAGE EXAMPLES ---

NEW SERVICE:   const userService = createCrudService<User>({
                   entityKey: "users",
                   baseUrl: "/api/users",
                 });

                 1. READ LIST:   const { data: posts, isLoading } = useGetPosts();
  2. READ ITEM:   const { data: post } = useGetPost(1);
  3. CREATE:      const { mutate: createPost } = useCreatePost();
                  createPost({ title: "Hello", body: "World", userId: 1 });
  4. UPDATE:      const { mutate: updatePost } = useUpdatePost();
                  updatePost({ id: 1, title: "New Title", body: "...", userId: 1 });
  5. DELETE:      const { mutate: deletePost } = useDeletePost();
                  deletePost(1);
*/
