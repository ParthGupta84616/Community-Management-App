export function SearchUsers(query) {
  return new Promise(async (resolve) => {
    const response = await fetch("/user?search=" + query);
    const data = await response.json();
    resolve({ data });
  });
}