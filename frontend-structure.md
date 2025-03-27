# Cấu trúc Frontend React

```
cv-analyzer-frontend/
├── public/                       # Tài nguyên tĩnh
│   ├── index.html                
│   ├── favicon.ico               
│   └── assets/                   # Hình ảnh, fonts, etc.
│
├── src/                          # Mã nguồn chính
│   ├── api/                      # Kết nối API
│   │   ├── index.js              # Cấu hình axios và interceptors
│   │   ├── auth.js               # API xác thực
│   │   ├── candidates.js         # API quản lý CV ứng viên
│   │   ├── chat.js               # API chat
│   │   ├── files.js              # API quản lý files
│   │   └── knowledge.js          # API quản lý knowledge base
│   │
│   ├── assets/                   # Tài nguyên tĩnh (CSS, images, etc.)
│   │
│   ├── components/               # Các component tái sử dụng
│   │   ├── common/               # Component dùng chung
│   │   │   ├── Header.jsx        
│   │   │   ├── Footer.jsx        
│   │   │   ├── Sidebar.jsx       
│   │   │   ├── Modal.jsx         
│   │   │   ├── Button.jsx        
│   │   │   ├── Alert.jsx         
│   │   │   └── Loading.jsx       
│   │   │
│   │   ├── auth/                 # Component xác thực
│   │   │   ├── LoginForm.jsx     
│   │   │   └── RegisterForm.jsx  
│   │   │
│   │   ├── candidates/           # Component quản lý ứng viên
│   │   │   ├── CandidateList.jsx 
│   │   │   ├── CandidateDetail.jsx
│   │   │   ├── CandidateUpload.jsx
│   │   │   └── CandidateEvaluation.jsx
│   │   │
│   │   ├── chat/                 # Component chat
│   │   │   ├── ChatBox.jsx       
│   │   │   ├── ChatMessage.jsx   
│   │   │   ├── ChatHistory.jsx   
│   │   │   └── ChatInput.jsx     
│   │   │
│   │   └── knowledge/            # Component knowledge base
│   │       ├── KnowledgeList.jsx 
│   │       └── KnowledgeUpload.jsx
│   │
│   ├── context/                  # React Context API
│   │   ├── AuthContext.jsx       # Quản lý xác thực
│   │   ├── ChatContext.jsx       # Quản lý chat
│   │   └── ThemeContext.jsx      # Quản lý theme
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.js            # Hook xác thực
│   │   ├── useChat.js            # Hook chat
│   │   └── useApi.js             # Hook gọi API
│   │
│   ├── layouts/                  # Layouts
│   │   ├── MainLayout.jsx        # Layout chính
│   │   ├── AuthLayout.jsx        # Layout cho trang xác thực
│   │   └── DashboardLayout.jsx   # Layout cho dashboard
│   │
│   ├── pages/                    # Các trang
│   │   ├── Home.jsx              # Trang chủ
│   │   ├── Login.jsx             # Trang đăng nhập
│   │   ├── Register.jsx          # Trang đăng ký
│   │   ├── Dashboard.jsx         # Trang dashboard
│   │   ├── candidates/           # Trang quản lý ứng viên
│   │   │   ├── CandidateList.jsx 
│   │   │   ├── CandidateDetail.jsx
│   │   │   └── CandidateUpload.jsx
│   │   │
│   │   ├── chat/                 # Trang chat
│   │   │   ├── ChatHome.jsx      
│   │   │   └── ChatDetail.jsx    
│   │   │
│   │   └── knowledge/            # Trang knowledge base
│   │       ├── KnowledgeList.jsx 
│   │       └── KnowledgeDetail.jsx
│   │
│   ├── utils/                    # Các hàm tiện ích
│   │   ├── auth.js               # Xử lý token, đăng nhập/đăng xuất
│   │   ├── formatters.js         # Định dạng dữ liệu
│   │   └── validators.js         # Validation
│   │
│   ├── App.jsx                   # Component gốc
│   ├── index.jsx                 # Entry point
│   └── routes.jsx                # Cấu hình routes
│
├── .env                          # Biến môi trường
├── .env.development              # Biến môi trường cho development
├── .env.production               # Biến môi trường cho production
├── package.json                  # Cấu hình npm
├── vite.config.js                # Cấu hình Vite
└── README.md                     # Tài liệu
```
