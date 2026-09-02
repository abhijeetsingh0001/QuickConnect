import axios from 'axios';
async function test() {
  try {
    const res = await axios.post('http://localhost:3000/api/v1/user/register', {
      fullName: "Test User",
      username: "testuser_" + Date.now(),
      password: "password123",
      confirmPassword: "password123",
      gender: "male"
    });
    console.log("Register:", res.data);
  } catch (e) {
    console.log("Register err:", e.response?.data || e.message);
  }
}
test();
