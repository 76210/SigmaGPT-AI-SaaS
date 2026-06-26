export const pinMessage = (id) => {
  return fetch(`/api/messages/pin/${id}`, {
    method: "PUT",
  });
};

export const unpinMessage = (id) => {
  return fetch(`/api/messages/unpin/${id}`, {
    method: "PUT",
  });
}; 