export const paths = {
  allBoardsPath: `${import.meta.env.VITE_ALL_BOARDS_BASE_URL}/?key=${
    import.meta.env.VITE_TRELLO_API_KEY
  }&token=${import.meta.env.VITE_TRELLO_TOKEN}`,
};
