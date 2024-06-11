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