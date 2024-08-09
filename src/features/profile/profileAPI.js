export function fetchUserProfile(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/profile?id="+ id) 
    const data = await response.json()
    resolve({data})
    }
  );
}
export function updateUser(data) {
  // console.log(data)
  return new Promise(async (resolve) => {
    const response = await fetch(`/updateuser?id=${data.data.id}`, {
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
