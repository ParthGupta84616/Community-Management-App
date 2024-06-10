export function fetchEntries() {
  return new Promise(async (resolve) =>{
    // console.log("here")
    const response = await fetch("http://localhost:8080/PersonalInfo") 
    const data = await response.json()
    // console.log(data)
    resolve({data})
    }
  );
}

export function fetchContactEntries() {
  return new Promise(async (resolve) =>{
    // console.log("here")
    const response = await fetch("http://localhost:8080/ContactInfo") 
    const data = await response.json()
    // console.log(data)
    resolve({data})
    }
  );
}

