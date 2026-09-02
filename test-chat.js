import axios from 'axios';
async function run() {
  const c = axios.create({ baseURL: 'http://localhost:3000', validateStatus: () => true });
  // register u1
  await c.post('/api/v1/user/register', {fullName: "u1", username: "u1", password: "123", confirmPassword: "123", gender: "male"});
  // register u2
  await c.post('/api/v1/user/register', {fullName: "u2", username: "u2", password: "123", confirmPassword: "123", gender: "female"});
  
  const r1 = await c.post('/api/v1/user/login', {username: "u1", password: "123"});
  const cookie1 = r1.headers['set-cookie'][0];
  const u1Id = r1.data._id;
  
  const r2 = await c.post('/api/v1/user/login', {username: "u2", password: "123"});
  const cookie2 = r2.headers['set-cookie'][0];
  const u2Id = r2.data._id;
  
  // u1 sends msg to u2
  const s1 = await c.post(`/api/v1/message/send/${u2Id}`, {message: "hello"}, {headers: {Cookie: cookie1}});
  console.log("Send response:", s1.data);
  
  // u1 fetches msgs with u2
  const m1 = await c.get(`/api/v1/message/${u2Id}`, {headers: {Cookie: cookie1}});
  console.log("Messages fetched:", m1.data);
}
run();
