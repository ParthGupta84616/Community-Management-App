export function fetchEntries() {
  return new Promise(async (resolve) =>{
    // console.log("here")
    const response = await fetch("/personalinfo") 
    const data = await response.json()
    // console.log(data)
    resolve({data})
    }
  );
}

export function fetchContactEntries() {
  return new Promise(async (resolve) =>{
    // console.log("here")
    const response = await fetch("/contactinfo") 
    const data = await response.json()
    // console.log(data)
    resolve({data})
    }
  );
}

export function createAccount(data) {
  return new Promise(async (resolve) =>{
    await fetch("/user",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }) 
    resolve({data})
    }
  );
}