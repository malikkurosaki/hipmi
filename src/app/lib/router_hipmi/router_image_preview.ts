export const routerImagePreview = {
  main: ({ id }: { id: string }) => `/dev/image-preview/${id}`,
  not_user_image: ({ id }: { id: string }) => `/preview-image/${id}`,
};
