export function fetchEntries() {
  return new Promise(async (resolve) =>{
    // console.log("here")
    const response = await fetch("https://socialgeathering-deploy.onrender.com/personalinfo") 
    const data = await response.json()
    // console.log(data)
    resolve({data})
    }
  );
}

export function fetchContactEntries() {
  return new Promise(async (resolve) =>{
    // console.log("here")
    const response = await fetch("https://socialgeathering-deploy.onrender.com/contactinfo") 
    const data = await response.json()
    // console.log(data)
    resolve({data})
    }
  );
}

export function createAccount(data) {
  return new Promise(async (resolve) =>{
    await fetch("https://socialgeathering-deploy.onrender.com/user",{
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