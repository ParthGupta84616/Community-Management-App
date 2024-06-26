export function updateUser(data) {
  return new Promise(async (resolve) =>{
    const response = await fetch("localhost:8080/updateUser?id=",data.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const update = await response.json()
    resolve({update})
    }
  );
}