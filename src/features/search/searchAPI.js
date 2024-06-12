export function SearchUsers(query) {
  return new Promise(async (resolve) => {
    if(query == null){
      resolve({ "data": null });
    }
    else{
      const response = await fetch("/user?search=" + query);
      const data = await response.json();
      resolve({ data });
    }
  });
}