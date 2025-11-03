# 🎓 Academia Suite

Academia Suite is a *full-stack academic management system* built using *Spring Boot* for the backend and *React (Vite)* for the frontend.  
It provides a modern platform for managing instructors, students, and assignments with authentication and RESTful APIs.

---

## 🏗 Project Structure
```
academia_suite/
│
├── backend/ # Spring Boot backend
│ ├── src/main/java/com/excelR/backend/
│ │ ├── controller/ # REST controllers
│ │ ├── dao/ # Data Access Objects
│ │ ├── dto/ # Data Transfer Objects
│ │ ├── model/ # Entity models
│ │ ├── repo/ # JPA repositories
│ │ ├── service/ # Business logic
│ │ ├── security/ # JWT + Spring Security config
│ │ └── BackendApplication.java
│ ├── pom.xml # Maven dependencies
│ └── application.properties / .yml
│
├── front_end/
│ └── front_end/ # React + Vite app
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page-level views
│ │ ├── services/ # Axios API calls
│ │ └── App.jsx
│ ├── package.json
│ └── vite.config.js
│
├── Flowchart.png # System flow diagram
├── uml.png # UML diagram
└── README.md # Documentation (this file)
```

---

## ⚙ Backend Setup (Spring Boot)

### Prerequisites
- Java 17 or higher  
- Maven 3.8+  
- MySQL Server  

### Steps
```
bash
cd backend
Configure src/main/resources/application.properties:

properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/academia_suite
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
server.port=8080
Build and run:
```
```
bash

mvn clean install
mvn spring-boot:run
API will run at:
👉 http://localhost:8080
```

💻 Frontend Setup (React + Vite)
Prerequisites
Node.js 18+

npm or yarn

Steps
bash
Copy code
```
cd front_end/front_end
npm install
npm run dev
React app will start at:
👉 http://localhost:5173
```

🔗 API Integration
The frontend connects to backend APIs via Axios.
Update API base URL in src/services/api.js if needed:

js
Copy code
```
const BASE_URL = "http://localhost:8080";
```
🔒 Authentication
Uses JWT (JSON Web Token) for securing endpoints.

Spring Security manages role-based access (STUDENT, INSTRUCTOR, ADMIN).

React stores the JWT in localStorage and sends it with API requests.

📊 Features
✅ Instructor and student registration/login
✅ Course and assignment management
✅ Role-based authorization
✅ RESTful API with JSON responses
✅ Responsive React UI
✅ Database integration with MySQL

🧩 Tech Stack
Layer	Technology
Frontend	React (Vite), Axios, React-Bootstrap
Backend	Spring Boot, Spring Security, JPA, Hibernate
Database	MySQL
Build Tool	Maven
Auth	JWT

🖼 Documentation
Flowchart.png – high-level system flow

uml.png – component/class diagram

🚀 Run Full Application
1️⃣ Start MySQL server
2️⃣ Run the backend (8080)
3️⃣ Run the frontend (5173)
4️⃣ Open your browser → http://localhost:5173
