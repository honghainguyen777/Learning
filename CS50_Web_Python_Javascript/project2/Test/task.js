document.addEventListener('DOMContentLoaded', function() {
  // Enable button only if there is text in the input field
  document.querySelector('#task').onkeyup = function() {
    if (document.querySelector('#task').value.length > 0)
      document.querySelector('#submit').disabled = false;
    else
      document.querySelector('#submit').disabled = true;
  };

  document.querySelector('#new-task').onsubmit = function() {

    // Create new item for list
    const li = document.createElement('li');
    li.innerHTML = document.querySelector('#task').value;

    // Add new item to task list
    document.querySelector('#tasks').append(li);

    // Clear input field
    document.querySelector('#task').value = '';

    // Stop form from submitting
    return false;
  };
});
