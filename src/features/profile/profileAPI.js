export function fetchUserProfile(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://127.0.0.1:8080/profile?id="+ id) 
    const data = await response.json()
    resolve({data})
    }
  );
}
export function updateUser(data) {
  // console.log()
  return new Promise(async (resolve) => {
    const response = await fetch(`http://127.0.0.1:8080/updateuser?id=${data.data.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.processedData),
    })
    const update = await response.json()
    resolve({update})
  });
}
