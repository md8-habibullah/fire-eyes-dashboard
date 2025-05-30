# 🔥 Fire Eyes Dashboard (Frontend)

A modern, real-time dashboard for monitoring fire and gas leak alerts, built with **React**, **Vite**, **Tailwind CSS**, and **Socket.IO**.  
This is the frontend for the [Fire Eyes](https://github.com/md8-habibullah/fire-eyes-backend) safety system.

---

## 🚀 Features

- **Live Fire & Gas Alerts:**  
  Instantly see new fire and gas leak alerts as they happen, with real-time updates via WebSockets.
- **Animated UI:**  
  Beautiful animated fire and gas icons, smooth transitions, and a clean, eye-friendly day theme.
- **Admin Controls:**  
  Admins (with a special localStorage key) can acknowledge, resolve, edit, or delete alerts and users.
- **User Management:**  
  Register new devices, view all registered users, and see alert history per device.
- **Responsive Design:**  
  Works great on desktop and mobile.
- **Theming:**  
  Easily switch between light and dark (and more) themes.

---

## 🖥️ Screenshots

![Dashboard Screenshot](https://cdn-icons-png.flaticon.com/512/16767/16767287.png)  
*(Replace with your own screenshots!)*

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Socket.IO Client](https://socket.io/)
- [Framer Motion](https://www.framer.com/motion/)

---

## ⚡ Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/md8-habibullah/fire-eyes-frontend.git
cd fire-eyes/fire-eyes-dashboard
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Configure API Endpoint**

Edit `src/api.js` if your backend URL is different:

```js
export const API_BASE = "https://example.com/api";
```

### 4. **Run the app**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Admin Access

To unlock admin features (edit, delete, acknowledge, resolve):

- On the **Login** page, enter `md8-in` as the Device ID to enable admin mode.
- Enter `md8-out` to disable admin mode.

---

## 🖼️ Credits

- **Fire animated icon:**  
  [Fire animated icons created by Freepik - Flaticon](https://www.flaticon.com/free-animated-icons/fire)
- **Gas animated icon:**  
  [Gas animated icons created by Freepik - Flaticon](https://www.flaticon.com/free-animated-icons/gas)

---

## 📂 Project Structure

```
src/
  components/    # Reusable UI components (FireIcon, GasIcon, Sidebar, etc)
  pages/         # Main pages (Dashboard, Login, Register, ShowUsers, etc)
  api.js         # API endpoint config
  App.jsx        # Main app router
  index.css      # Tailwind & global styles
```

---

## 🤝 Contributing

Pull requests and suggestions are welcome!  
Please open an issue or PR for improvements.

---

**Made with ❤️ for fire and gas safety.**
