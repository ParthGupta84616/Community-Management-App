export function fetchItemByUserId(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://127.0.0.1:8080/cart?userId='+userId) 
    const data = await response.json()
  //   console.log(data);
    resolve({data})
  }
  );
}