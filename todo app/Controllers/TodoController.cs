using Microsoft.AspNetCore.Mvc;
using TodoApp.Models;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private static List<TodoItem> _todoItems = new List<TodoItem>();
        private static int _nextId = 1;

        // GET: api/todo - Get all tasks
        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetTodoItems()
        {
            return Ok(_todoItems);
        }

        // GET: api/todo/{id} - Get a specific task
        [HttpGet("{id}")]
        public ActionResult<TodoItem> GetTodoItem(int id)
        {
            var todoItem = _todoItems.FirstOrDefault(t => t.Id == id);
            if (todoItem == null)
            {
                return NotFound();
            }
            return Ok(todoItem);
        }

        // POST: api/todo - Create a new task
        [HttpPost]
        public ActionResult<TodoItem> CreateTodoItem(TodoItem todoItem)
        {
            if (string.IsNullOrWhiteSpace(todoItem.Title))
            {
                return BadRequest("Title is required");
            }

            todoItem.Id = _nextId++;
            todoItem.CreatedAt = DateTime.Now;
            todoItem.IsCompleted = false;
            todoItem.CompletedAt = null;

            _todoItems.Add(todoItem);
            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }

        // PUT: api/todo/{id} - Update a task
        [HttpPut("{id}")]
        public IActionResult UpdateTodoItem(int id, TodoItem todoItem)
        {
            var existingItem = _todoItems.FirstOrDefault(t => t.Id == id);
            if (existingItem == null)
            {
                return NotFound();
            }

            if (string.IsNullOrWhiteSpace(todoItem.Title))
            {
                return BadRequest("Title is required");
            }

            existingItem.Title = todoItem.Title;
            existingItem.Description = todoItem.Description;
            existingItem.IsCompleted = todoItem.IsCompleted;
            
            if (todoItem.IsCompleted && !existingItem.IsCompleted)
            {
                existingItem.CompletedAt = DateTime.Now;
            }
            else if (!todoItem.IsCompleted)
            {
                existingItem.CompletedAt = null;
            }

            return NoContent();
        }

        // DELETE: api/todo/{id} - Delete a task
        [HttpDelete("{id}")]
        public IActionResult DeleteTodoItem(int id)
        {
            var todoItem = _todoItems.FirstOrDefault(t => t.Id == id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _todoItems.Remove(todoItem);
            return NoContent();
        }
    }
}
