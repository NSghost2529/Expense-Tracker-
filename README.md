📌 Description
Expense Tracker Pro is a full‑stack personal finance tracker for Indian Rupees (₹).
It allows users to sign up, log in, and manage expenses and savings with separate account histories.
It features a category‑wise breakdown, AI‑based spending‑reduction tips, a responsive React frontend, and a secure Flask + MongoDB backend.

🛠 Detailed Steps to Run the App
You need to run the backend (Flask + MongoDB) and frontend (React) separately.

1️⃣ Backend Setup (Flask + MongoDB)
Open your terminal / VS Code integrated terminal
Navigate to your backend folder:

bash
cd "N:\Projects\mine\expense tracking\backend"
Create a Python virtual environment (only the first time):

bash
python -m venv venv
Activate the virtual environment:

If you use PowerShell:

powershell
.\venv\Scripts\Activate.ps1
(If you get a permission error, run Set-ExecutionPolicy RemoteSigned -Scope CurrentUser once.)

If you use CMD:

text
venv\Scripts\activate.bat
Install backend dependencies:

bash
pip install -r requirements.txt
Ensure MongoDB is running

Either run MongoDB locally

Or update config.py with your MongoDB Atlas URI

Start the backend server:

bash
python app.py
The Flask backend will be available at:

text
http://127.0.0.1:5000
2️⃣ Frontend Setup (React)
Open a new terminal tab/window
Navigate to your frontend folder:

bash
cd "N:\Projects\mine\expense tracking\frontend"
Install frontend dependencies (only the first time):

bash
npm install
Start the frontend server:

bash
npm start
The React app will be available at:

text
http://localhost:3000
3️⃣ Using the App
Visit http://localhost:3000 in your browser.

Sign up for a new account.

Log in with your email and password.

Add expenses and savings in ₹, select categories and payment modes.

View your expense history and the AI‑generated savings suggestions.

📂 Project Structure Recap
text
expense-tracker/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   └── venv/
│
└── frontend/
    ├── package.json
    ├── public/
    │    └── index.html
    └── src/
         ├── index.js
         ├── App.js
         ├── Dashboard.js
         ├── Login.js
         ├── Signup.js
         ├── AddExpense.js
         ├── AddSavings.js
         └── api.js
If you want, I can also give you a "Run Both Servers Together" shortcut script, so that you only run


<img width="1878" height="856" alt="image" src="https://github.com/user-attachments/assets/9dd38986-26a5-4ae3-8416-e3442767b346" />
<img width="1896" height="858" alt="image" src="https://github.com/user-attachments/assets/22f375fb-5ffa-444c-9a4e-134ece7405dd" />
<img width="1919" height="881" alt="image" src="https://github.com/user-attachments/assets/81eff197-234c-4fff-b51d-c6cbf3abd09e" />
<img width="1890" height="860" alt="image" src="https://github.com/user-attachments/assets/ec55d2f7-ec29-42e6-aa9e-f0a1d3a4996c" />
<img width="1886" height="863" alt="image" src="https://github.com/user-attachments/assets/9b2c5792-6ef0-4c8b-9712-d7c5113abfd9" />


