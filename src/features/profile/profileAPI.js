export function fetchUserProfile(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/profile?id="+ id) 
    const data = await response.json()
    resolve({data})
    }
  );
}