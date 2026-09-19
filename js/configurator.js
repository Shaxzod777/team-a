// Database of Options
const configData = {
  models: [
    { id: 'sedan', name: 'CyberSedan', price: 2500000, desc: 'Элегантный городской седан' },
    { id: 'suv', name: 'CyberSUV', price: 3200000, desc: 'Мощный полноприводный кроссовер' },
    { id: 'coupe', name: 'CyberSport', price: 4100000, desc: 'Динамичное спорт-купе' }
  ],
  colors: [
    { id: 'blue', name: 'Неоновый Синий', hex: '#38bdf8', price: 0 },
    { id: 'red', name: 'Красный Металлик', hex: '#ef4444', price: 45000 },
    { id: 'dark', name: 'Тёмный Графит', hex: '#334155', price: 30000 },
    { id: 'gold', name: 'Премиум Голд', hex: '#eab308', price: 60000 },
    { id: 'white', name: 'Белоснежный Перламутр', hex: '#f8fafc', price: 25000 }
  ],
  wheels: [
    { id: '18', name: 'R18 Standard', price: 0 },
    { id: '19', name: 'R19 Sport', price: 50000 },
    { id: '20', name: 'R20 Executive', price: 95000 }
  ],
  interior: [
    { id: 'black', name: 'Тёмный текстиль', price: 0 },
    { id: 'leather', name: 'Кожа Наппа (Эко)', price: 120000 },
    { id: 'alcantara', name: 'Премиум Алькантара', price: 180000 }
  ],
  options: [
    { id: 'autopilot', name: 'Автопилот L2+', price: 150000 },
    { id: 'audio', name: 'Акустика Hi-Fi 12 динамиков', price: 80000 },
    { id: 'panoramic', name: 'Панорамная крыша', price: 95000 },
    { id: 'winter', name: 'Зимний пакет (обогрев всех сидений)', price: 45000 }
  ]
};

// Current State
let state = {
  theme: 'dark',
  model: configData.models[0],
  color: configData.colors[0],
  wheel: configData.wheels[0],
  interior: configData.interior[0],
  selectedOptions: []
};

// UI Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const carBodyPath = document.getElementById('car-body');
const modelOptionsContainer = document.getElementById('model-options');
const colorOptionsContainer = document.getElementById('color-options');
const wheelOptionsContainer = document.getElementById('wheel-options');
const interiorOptionsContainer = document.getElementById('interior-options');
const featureOptionsContainer = document.getElementById('feature-options');

// Summary UI Elements
const summaryModelName = document.getElementById('summary-model-name');
const summaryModelPrice = document.getElementById('summary-model-price');
const summaryColorName = document.getElementById('summary-color-name');
const summaryColorPrice = document.getElementById('summary-color-price');
const summaryWheelName = document.getElementById('summary-wheel-name');
const summaryWheelPrice = document.getElementById('summary-wheel-price');
const summaryInteriorName = document.getElementById('summary-interior-name');
const summaryInteriorPrice = document.getElementById('summary-interior-price');
const summaryOptionsCount = document.getElementById('summary-options-count');
const summaryOptionsPrice = document.getElementById('summary-options-price');
const totalPriceEl = document.getElementById('total-price');

// Format Price
function formatPrice(price) {
  return price.toLocaleString('ru-RU') + ' ₽';
}

// Init Theme Toggle
themeToggleBtn.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  themeToggleBtn.innerText = state.theme === 'dark' ? '☀️ Светлая' : '🌙 Тёмная';
});

// Render Option Controls
function renderControls() {
  // Models
  modelOptionsContainer.innerHTML = configData.models.map(m => `
    <button class="option-btn ${m.id === state.model.id ? 'active' : ''}" onclick="selectModel('${m.id}')">
      <div class="option-title">${m.name}</div>
      <div class="option-price">${formatPrice(m.price)}</div>
    </button>
  `).join('');

  // Colors
  colorOptionsContainer.innerHTML = configData.colors.map(c => `
    <div class="color-swatch ${c.id === state.color.id ? 'active' : ''}" 
         style="background-color: ${c.hex};" 
         title="${c.name} (+${formatPrice(c.price)})"
         onclick="selectColor('${c.id}')">
    </div>
  `).join('');

  // Wheels
  wheelOptionsContainer.innerHTML = configData.wheels.map(w => `
    <button class="option-btn ${w.id === state.wheel.id ? 'active' : ''}" onclick="selectWheel('${w.id}')">
      <div class="option-title">${w.name}</div>
      <div class="option-price">+${formatPrice(w.price)}</div>
    </button>
  `).join('');

  // Interior
  interiorOptionsContainer.innerHTML = configData.interior.map(i => `
    <button class="option-btn ${i.id === state.interior.id ? 'active' : ''}" onclick="selectInterior('${i.id}')">
      <div class="option-title">${i.name}</div>
      <div class="option-price">+${formatPrice(i.price)}</div>
    </button>
  `).join('');

  // Features
  featureOptionsContainer.innerHTML = configData.options.map(o => {
    const isSelected = state.selectedOptions.some(item => item.id === o.id);
    return `
      <button class="option-btn ${isSelected ? 'active' : ''}" onclick="toggleOption('${o.id}')">
        <div class="option-title">${o.name}</div>
        <div class="option-price">+${formatPrice(o.price)}</div>
      </button>
    `;
  }).join('');
}

// Action Handlers
window.selectModel = function(id) {
  state.model = configData.models.find(m => m.id === id);
  updateApp();
};

window.selectColor = function(id) {
  state.color = configData.colors.find(c => c.id === id);
  carBodyPath.setAttribute('fill', state.color.hex);
  updateApp();
};

window.selectWheel = function(id) {
  state.wheel = configData.wheels.find(w => w.id === id);
  updateApp();
};

window.selectInterior = function(id) {
  state.interior = configData.interior.find(i => i.id === id);
  updateApp();
};

window.toggleOption = function(id) {
  const index = state.selectedOptions.findIndex(o => o.id === id);
  if (index > -1) {
    state.selectedOptions.splice(index, 1);
  } else {
    const option = configData.options.find(o => o.id === id);
    state.selectedOptions.push(option);
  }
  updateApp();
};

// Calculate and Update UI
function updateApp() {
  renderControls();

  // Summary Update
  summaryModelName.innerText = state.model.name;
  summaryModelPrice.innerText = formatPrice(state.model.price);

  summaryColorName.innerText = state.color.name;
  summaryColorPrice.innerText = state.color.price ? `+${formatPrice(state.color.price)}` : 'Бесплатно';

  summaryWheelName.innerText = state.wheel.name;
  summaryWheelPrice.innerText = state.wheel.price ? `+${formatPrice(state.wheel.price)}` : 'Бесплатно';

  summaryInteriorName.innerText = state.interior.name;
  summaryInteriorPrice.innerText = state.interior.price ? `+${formatPrice(state.interior.price)}` : 'Бесплатно';

  const optionsTotalPrice = state.selectedOptions.reduce((sum, item) => sum + item.price, 0);
  summaryOptionsCount.innerText = `${state.selectedOptions.length} шт.`;
  summaryOptionsPrice.innerText = `+${formatPrice(optionsTotalPrice)}`;

  // Calculate Total
  const total = state.model.price + state.color.price + state.wheel.price + state.interior.price + optionsTotalPrice;
  totalPriceEl.innerText = formatPrice(total);
}

// Submit Action
document.getElementById('submit-btn').addEventListener('click', () => {
  alert(`Спасибо! Заявка на конфигурацию ${state.model.name} в цвете "${state.color.name}" отправлена менеджеру.`);
});

// Initial Render
updateApp();