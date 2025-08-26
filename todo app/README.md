# 📝 Todo App - Learning REST APIs

A complete Todo application built with ASP.NET Core Web API and vanilla HTML/CSS/JavaScript to help you learn the fundamentals of REST APIs, CRUD operations, and frontend-backend integration.

## 🎯 Learning Objectives

By building this application, you'll understand:
- How to create a REST API in ASP.NET Core
- How to implement CRUD operations (Create, Read, Update, Delete)
- How to connect a frontend to a backend API using JavaScript fetch()
- How data flows from user input to API processing and back

## 🚀 Features

- **Full CRUD Operations**: Create, read, update, and delete tasks
- **Modern UI**: Clean, responsive interface with gradient backgrounds
- **Task Filtering**: View all, pending, or completed tasks
- **Real-time Updates**: Changes reflect immediately in the interface
- **In-Memory Storage**: Simple storage for learning purposes (no database required)

## 🛠️ Technology Stack

### Backend
- **ASP.NET Core 8.0** - Web API framework
- **C#** - Programming language
- **In-Memory Storage** - List<TodoItem> for data persistence

### Frontend
- **HTML5** - Structure and semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - ES6+ features and fetch API

## 📁 Project Structure

```
todo-app/
├── Controllers/
│   └── TodoController.cs          # REST API endpoints
├── Models/
│   └── TodoItem.cs               # Task data model
├── wwwroot/
│   ├── index.html                # Main application interface
│   ├── styles.css                # Application styling
│   └── script.js                 # Frontend logic and API calls
├── Program.cs                    # Application configuration
├── TodoApp.csproj               # Project file
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- **.NET 8.0 SDK** installed on your machine
- **Visual Studio Code** or **Visual Studio** (recommended)
- **Web browser** for testing

### Installation & Running

1. **Clone or download** this project to your local machine

2. **Open terminal/command prompt** in the project directory

3. **Restore dependencies** (if needed):
   ```bash
   dotnet restore
   ```

4. **Run the application**:
   ```bash
   dotnet run
   ```

5. **Open your browser** and navigate to:
   - **Frontend**: `http://localhost:5000` or `https://localhost:5001`
   - **API Documentation**: `https://localhost:5001/swagger`

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todo` | Retrieve all tasks |
| `GET` | `/api/todo/{id}` | Retrieve a specific task |
| `POST` | `/api/todo` | Create a new task |
| `PUT` | `/api/todo/{id}` | Update an existing task |
| `DELETE` | `/api/todo/{id}` | Delete a task |

### API Request/Response Examples

#### Create Task (POST /api/todo)
```json
{
  "title": "Learn REST APIs",
  "description": "Study HTTP methods and CRUD operations"
}
```

#### Update Task (PUT /api/todo/{id})
```json
{
  "title": "Learn REST APIs",
  "description": "Study HTTP methods and CRUD operations",
  "isCompleted": true
}
```

## 🎨 Frontend Features

- **Add New Tasks**: Form with title and description fields
- **Task List**: Display all tasks with status indicators
- **Task Filtering**: Filter by all, pending, or completed tasks
- **Edit Tasks**: Modal for updating task details and completion status
- **Delete Tasks**: Remove tasks with confirmation
- **Responsive Design**: Works on desktop and mobile devices

## 🔧 Customization Ideas

Once you're comfortable with the basics, try these modifications:

1. **Add Task Categories**: Implement priority levels or tags
2. **Due Dates**: Add deadline functionality
3. **Search**: Implement task search by title or description
4. **Pagination**: Handle large numbers of tasks
5. **Database**: Replace in-memory storage with SQL Server or SQLite
6. **User Authentication**: Add login/logout functionality
7. **Task Sharing**: Allow multiple users to collaborate

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**: If you get a port conflict, the application will automatically try the next available port
2. **CORS Errors**: The API is configured to allow all origins for development
3. **Tasks Not Persisting**: This app uses in-memory storage, so tasks will reset when you restart the application

### Debug Tips

- Use **Swagger UI** (`/swagger`) to test API endpoints directly
- Check **browser console** for JavaScript errors
- Use **Postman** or similar tools to test API independently
- Check **application logs** in the terminal for backend errors

## 📖 Learning Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [REST API Best Practices](https://restfulapi.net/)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

## 🤝 Contributing

This is a learning project, but feel free to:
- Report bugs or issues
- Suggest improvements
- Share your modifications and learnings

## 📄 License

This project is created for educational purposes. Feel free to use, modify, and learn from it!

---

**Happy Coding! 🎉**

Start by running the application and exploring how the frontend communicates with the backend API. Try creating, editing, and deleting tasks to see the full CRUD workflow in action!
