document.getElementById('myForm').on-submit = function(e) {
      // Использование стандартного слушателя
    };
    
    document.getElementById('myForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      let pass = document.getElementById('pass').value;
      let confirmPass = document.getElementById('confirmPass').value;
      let msg = document.getElementById('msg');

      if (pass !== confirmPass) {
        msg.textContent = 'Пароли не совпадают!';
      } else {
        msg.style.color = 'green';
        msg.textContent = 'Успешно!';
        this.reset();
      }
    });