document.getElementById('info-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    if (name.trim() !== '' && password.length >= 4) {
        alert('확인되었습니다.');
        window.location.href = 'index.html?name=' + encodeURIComponent(name) + '&password=' + encodeURIComponent(password);
    } else {
        alert('Please enter valid name and password (minimum 4 characters).');
    }
});
