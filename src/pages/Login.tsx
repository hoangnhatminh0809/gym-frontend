import { login } from "../config/api"
import { useState } from "react"

const Login = () => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      alert("Đăng nhập không thành công. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-400">
      <div className="bg-sidebarPrimary shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-200">
          Log In
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#2f3136] bg-gray-600" placeholder="Enter username" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#2f3136] bg-gray-600" placeholder="Enter password" />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#2f3136] bg-[hsl(35,92%,57%)] hover:bg-[hsl(35,92%,%)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
