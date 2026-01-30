import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// --- TYPES ---

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// --- QUERY KEYS ---

/**
 * Key Factory for Post-related queries.
 * Use these to maintain consistency and enable precise cache invalidation.
 */
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
};

// --- HOOKS ---

/**
 * Fetches all posts from the API.
 * @returns UseQueryResult containing an array of Post objects.
 */
export const useGetPosts = () => {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: async (): Promise<Post[]> => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });
};

/**
 * Fetches a single post by its ID.
 * @param id The numeric ID of the post.
 */
export const useGetPost = (id: number) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: async (): Promise<Post> => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (!res.ok) throw new Error("Post not found");
      return res.json();
    },
    enabled: !!id,
  });
};

/**
 * Creates a new post. Includes an Optimistic Update to the list cache.
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPost: Omit<Post, "id">) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-type": "application/json" },
      });
      return res.json();
    },
    onMutate: async (newPost) => {
      // 1. Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      // 2. Snapshot the previous value (so we can roll back if it fails)
      const previous = queryClient.getQueryData<Post[]>(postKeys.lists());
      // 3. Optimistically update the cache with the new post
      queryClient.setQueryData<Post[]>(postKeys.lists(), (old = []) => [
        { ...newPost, id: Date.now() } as Post,
        ...old,
      ]);
      // 4. Return context with the snapshotted value
      return { previous };
    },
    onError: (_err, _newPost, context) => {
      // If the mutation fails, use the context we returned above to roll back
      queryClient.setQueryData(postKeys.lists(), context?.previous);
    },
    // After error or success
    onSettled: () => {
      // Always refetch after error or success to sync with the "truth"
      // NOTE: In case of mock API, you can comment out this line, to see your changes
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};

/**
 * Updates an existing post and synchronizes the cache.
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedPost: Post) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedPost),
          headers: { "Content-type": "application/json" },
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      // Update the cache with the updated post
      queryClient.setQueryData(postKeys.detail(data.id), data);
      // NOTE: In case of mock API, you can comment out this line, to see your changes
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};

/**
 * Deletes a post. Includes an Optimistic Update to remove it from the list immediately.
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      return id;
    },
    onMutate: async (id) => {
      // 1. Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      // 2. Snapshot the previous value (so we can roll back if it fails)
      const previous = queryClient.getQueryData<Post[]>(postKeys.lists());
      // 3. Optimistically update the cache removing the post
      queryClient.setQueryData<Post[]>(postKeys.lists(), (old = []) =>
        old.filter((post) => post.id !== id)
      );
      // 4. Return context with the snapshotted value
      return { previous };
    },
    onError: (_err, _id, context) => {
      // If the mutation fails, use the context we returned above to roll back
      queryClient.setQueryData(postKeys.lists(), context?.previous);
    },
    // After error or success
    onSettled: () => {
      // Always refetch after error or success to sync with the "truth"
      // NOTE: In case of mock API, you can comment out this line, to see your changes
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};

/* --- DOCUMENTATION & USAGE EXAMPLES ---

  1. TO READ DATA:
     const { data: posts, isLoading } = useGetPosts();

  2. TO READ A SINGLE ITEM:
     const { data: post } = useGetPost(1);

  3. TO CREATE (Optimistic):
     const { mutate: createPost } = useCreatePost();
     createPost({ title: "Hello", body: "World", userId: 1 });

  4. TO UPDATE:
     const { mutate: updatePost } = useUpdatePost();
     updatePost({ id: 1, title: "New Title", body: "...", userId: 1 });

  5. TO DELETE (Optimistic):
     const { mutate: deletePost } = useDeletePost();
     deletePost(1);
*/
