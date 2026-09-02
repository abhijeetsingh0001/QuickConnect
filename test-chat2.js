async function run() {
  const reg1 = await fetch('http://localhost:3000/api/v1/user/register', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({fullName: "u3", username: "u3", password: "123", confirmPassword: "123", gender: "male"})
  });
  
  const reg2 = await fetch('http://localhost:3000/api/v1/user/register', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({fullName: "u4", username: "u4", password: "123", confirmPassword: "123", gender: "female"})
  });
  
  const login1 = await fetch('http://localhost:3000/api/v1/user/login', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: "u3", password: "123"})
  });
  const cookie1 = login1.headers.get('set-cookie');
  const d1 = await login1.json();
  const u1Id = d1._id;
  
  const login2 = await fetch('http://localhost:3000/api/v1/user/login', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: "u4", password: "123"})
  });
  const cookie2 = login2.headers.get('set-cookie');
  const d2 = await login2.json();
  const u2Id = d2._id;
  
  const sendRes = await fetch(`http://localhost:3000/api/v1/message/send/${u2Id}`, {
    method: 'POST', headers: {'Content-Type': 'application/json', 'Cookie': cookie1},
    body: JSON.stringify({message: "hello there"})
  });
  console.log("Send:", await sendRes.json());
  
  const fetchMsgs = await fetch(`http://localhost:3000/api/v1/message/${u2Id}`, {
    method: 'GET', headers: {'Cookie': cookie1}
  });
  console.log("Messages:", await fetchMsgs.json());
}
run();
