// Handles image upload to each cell
function uploadImage(cellId) {
  const cell = document.getElementById(cellId);
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.click();

  input.addEventListener('change', function () {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        cell.innerHTML = '';
        const text = document.createElement('div');
        text.className = 'text';
        text.textContent = cellId;
        cell.appendChild(text);
        cell.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
}

// Clear all images
document.getElementById('clear-images').addEventListener('click', () => {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.innerHTML = `<div class="text">${cell.id}</div>`;
  });
});

// Uncheck checkboxes
document.getElementById('uncheck-all').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
  });
});

// Check checkboxes
document.getElementById('check-all').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
  });
});

// Update opacity based on checkbox selection
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', updateOpacity);
});

function updateOpacity() {
  const checkboxes = {
    I: document.getElementById('show-I').checked,
    E: document.getElementById('show-E').checked,
    S: document.getElementById('show-S').checked,
    N: document.getElementById('show-N').checked,
    T: document.getElementById('show-T').checked,
    F: document.getElementById('show-F').checked,
    J: document.getElementById('show-J').checked,
    P: document.getElementById('show-P').checked,
  };

  document.querySelectorAll('.cell').forEach(cell => {
    const types = cell.dataset.type.split(' ');
    let opacity = 1;

    types.forEach(type => {
      if (!checkboxes[type]) {
        opacity = 0.3;
      }
    });

    cell.style.opacity = opacity;
  });
}

updateOpacity(); // Initial opacity setup
