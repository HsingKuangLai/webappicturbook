$(document).ready(function() {
    const newTaskInput = $('#newTask');
    const addTaskButton = $('#addTaskbutton');
    const taskList = $('#taskList');

    
    addTaskButton.click(addTask);
    

    function addTask() {
      const taskText = newTaskInput.val().trim();

      if (taskText !== '') {
        const li = $('<li>');
        li.html(`
          <span>${taskText}</span>
          <button class="ui-btn ui-btn-inline" id = "edit">Edit</button>
          <button class="ui-btn ui-btn-inline" id = "delete">Delete</button>
          
        `);

        
        taskList.append(li);
        newTaskInput.val('');
        
        $("li").addClass("important")

        li.find('#edit').on('tap', function() {
          editTask(li);
        });

        li.find('#delete').on('tap', function() {
          deleteTask(li);
          return false;
        });
      }

      else{
          alert('Empty text! Please enter something.')
      }
    }

    function editTask(li) {
      const taskText = li.find('span').text();
      const updatedTask = prompt('Edit Task:', taskText);

      if (updatedTask !== null) {
        li.find('span').text(updatedTask);
      } 

    }

    function deleteTask(li) {
      const confirmDelete = window.confirm('Are you sure you want to delete this task?');

      if (confirmDelete) {
        li.remove();
      }
    }
    
  });