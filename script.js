// Lógica de JavaScript
const identificationInput = document.getElementById('identification');
const namesInput = document.getElementById('names');
const surnamesInput = document.getElementById('surnames');
const emailInput = document.getElementById('email');
const saveBtn = document.getElementById('save-btn');
const showBtn = document.getElementById('show-btn');
const updateBtn = document.getElementById('update-btn');
const deleteBtn = document.getElementById('delete-btn');
const searchInput = document.getElementById('search-input');
const dataTable = document.getElementById('data-table');
const tableBody = dataTable.getElementsByTagName('tbody')[0];
const alertModal = document.getElementById('alert-modal');
const alertMessage = document.getElementById('alert-message');
const closeBtn = document.getElementById('close-btn');




    const successModal = document.getElementById('success-modal');
    const errorModal = document.getElementById('error-modal');
    const successCloseBtn = document.getElementById('success-close-btn');
    const errorCloseBtn = document.getElementById('error-close-btn');
    const userNameInput = document.getElementById('user-name');

let data = [];
let currentIndex = -1;

// Función para mostrar la ventana emergente de alerta
function showAlert(message) {
  alertMessage.textContent = message;
  alertModal.style.display = 'block';
}

// Función para cerrar la ventana emergente de alerta
function closeAlert() {
  alertModal.style.display = 'none';
}

// Función para agregar un nuevo elemento a la tabla
function addItem() {
  const identification = identificationInput.value.trim();
  const names = namesInput.value.trim();
  const surnames = surnamesInput.value.trim();
  const email = emailInput.value.trim();

  if (identification === '' || names === '' || surnames === '' || email === '') {
    showAlert('Por favor, completa todos los campos.');
    return;
  }

  const item = { identification, names, surnames, email };
  data.push(item);
  renderTable();
  clearForm();
}

// Función para mostrar los elementos de la tabla
function showItems() {
  renderTable();
}

// Función para actualizar un elemento de la tabla
function updateItem() {
  if (currentIndex !== -1) {
    const identification = identificationInput.value.trim();
    const names = namesInput.value.trim();
    const surnames = surnamesInput.value.trim();
    const email = emailInput.value.trim();

    if (identification === '' || names === '' || surnames === '' || email === '') {
      showAlert('Por favor, completa todos los campos.');
      return;
    }

    data[currentIndex] = { identification, names, surnames, email };
    renderTable();
    clearForm();
    currentIndex = -1;
  }
}

// Función para eliminar un elemento de la tabla
function deleteItem() {
  if (currentIndex !== -1) {
    data.splice(currentIndex, 1);
    renderTable();
    clearForm();
    currentIndex = -1;
  }
}

// Función para buscar elementos por nombre
function searchItems() {
  const searchText = searchInput.value.toLowerCase();
  const filteredData = data.filter(item =>
    item.names.toLowerCase().includes(searchText) ||
    item.surnames.toLowerCase().includes(searchText)
  );
  renderTable(filteredData);
}

// Función para renderizar la tabla
function renderTable(dataToRender = data) {
  tableBody.innerHTML = '';
  dataToRender.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.identification}</td>
      <td>${item.names}</td>
      <td>${item.surnames}</td>
      <td>${item.email}</td>
      <td>
        <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  setupEventListeners();
}

// Función para limpiar el formulario
function clearForm() {
  identificationInput.value = '';
  namesInput.value = '';
  surnamesInput.value = '';
  emailInput.value = '';
}

// Configurar los event listeners para los botones de edición y eliminación
function setupEventListeners() {
  const editButtons = document.querySelectorAll('.edit-btn');
  const deleteButtons = document.querySelectorAll('.delete-btn');

  editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      currentIndex = parseInt(event.target.closest('button').dataset.index);
      const item = data[currentIndex];
      identificationInput.value = item.identification;
      namesInput.value = item.names;
      surnamesInput.value = item.surnames;
      emailInput.value = item.email;
    });
  });

  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      currentIndex = parseInt(event.target.closest('button').dataset.index);
      deleteItem();
    });
  });
}

// Event listeners para los botones principales
saveBtn.addEventListener('click', addItem);
showBtn.addEventListener('click', showItems);
updateBtn.addEventListener('click', updateItem);
deleteBtn.addEventListener('click', deleteItem);
searchInput.addEventListener('input', searchItems);

// Event listener para el botón de cierre de la ventana emergente
closeBtn.addEventListener('click', closeAlert);

// Cerrar la ventana emergente al hacer clic fuera de la ventana modal
window.addEventListener('click', (event) => {
  if (event.target == alertModal) {
    closeAlert();
  }
});






