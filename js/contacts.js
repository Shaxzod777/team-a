
document.addEventListener('DOMContentLoaded', function () {

  const form = document.querySelector('form');

  if (!form) {
    console.error('Форма не найдена на странице. Проверьте, что <form> есть в HTML.');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = new FormData(form);

    console.log('Заявка на тест-драйв:');
    for (const [key, value] of data.entries()) {
      console.log(key + ':', value);
    }

    const note = document.querySelector('.form-note') || document.getElementById('formNote');
    if (note) note.style.display = 'block';

    form.reset();
  });

});