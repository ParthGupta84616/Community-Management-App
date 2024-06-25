export function fetchUserProfile(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch("https://socialgeathering-deploy.onrender.com/profile?id="+ id) 
    const data = await response.json()
    resolve({data})
    }
  );
}