# AssetOrbit

![AssetOrbit Banner](https://i.ibb.co.com/xKBR6hPY/assetor.png)

## 🚀 Live Website  
[AssetOrbit Live](https://assetorbit.netlify.app/)

## 📌 Overview  
AssetOrbit is a **comprehensive asset management system** designed to streamline asset tracking and employee requests. It features **role-based navigation, authentication, dashboards, notifications, and payment integration**, making it an all-in-one solution for HR managers and employees.

---

## 🛠️ Technologies Used  

### **Frontend:**  
- React  
- Tailwind CSS  
- React Router  
- TanStack Query  
- React-PDF  
- React-Helmet  

### **Backend:**  
- Node.js  
- Express.js  
- MongoDB  

### **Authentication:**  
- Firebase  
- JWT  

### **Hosting:**  
- Frontend: Netlify  
- Backend: Vercel  

---

## ✨ Core Features  

✅ Fully responsive design for mobile, tablet, and desktop devices.  
✅ Role-based navigation for **HR Managers** and **Employees**.  
✅ Secure authentication with **email/password** & **social login**.  
✅ Dynamic navbar updates based on user role & login status.  
✅ Real-time **notifications** for CRUD operations (asset requests & approvals).  
✅ Efficient data fetching using **TanStack Query**.  
✅ **HR Dashboard:** Pending requests, stock alerts, most requested assets & pie charts.  
✅ **Employee Dashboard:** Pending & monthly requests.  
✅ Advanced **asset management** (Add, Update, Delete).  
✅ **Employee management** (Add, Remove, Bulk Add).  
✅ Integrated **payment system** for HR Managers to buy member limit packages.  
✅ **Profile management** with secure user updates.  

---

## 📦 Dependencies  

```json
"dependencies": {
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "@lottiefiles/dotlottie-react": "^0.12.1",
  "@mui/material": "^6.4.1",
  "@mui/x-charts": "^7.24.0",
  "@react-pdf/renderer": "^4.1.6",
  "@tanstack/react-query": "^5.65.1",
  "axios": "^1.7.9",
  "core-js": "^3.40.0",
  "firebase": "^11.2.0",
  "flowbite": "^2.5.2",
  "flowbite-react": "^0.10.2",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "preline": "^2.7.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-helmet": "^6.1.0",
  "react-icons": "^5.4.0",
  "react-lottie": "^1.2.10",
  "react-router-dom": "^7.1.3",
  "rsuite": "^5.77.0",
  "sort-by": "^1.2.0",
  "sweetalert2": "^11.15.10",
  "swiper": "^11.2.1",
  "use-debounce": "^10.0.4"
}

## 🛠️ Development Setup
Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/AssetOrbit.git
cd AssetOrbit


## Step 2: Install Dependencies
```bash
npm install


## Step 3: Create an .env.local File
Copy and paste the following variables into a .env.local file:

```env
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
VITE_imgHosting=your_img_hosting_key
Step 4: Run the Development Server
```bash
npm run dev

Your project should now be running on http://localhost:5173/

## 🌐 HR Credentials (For Testing)
HR Email: hr@gmail.com
HR Password: Pass@12345

