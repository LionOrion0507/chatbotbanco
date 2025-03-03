export type Messages = {
  message: string,
  author: 'Agent' | 'User',
  fileLink?: string,
  loading?: boolean;
};
