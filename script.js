document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('requirement-form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const requirementList = document.getElementById('requirement-list');
    const responseMessage = document.getElementById('response-message');

    let requirements = [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        requirements.push({ title, description });
        showResponseMessage('Requirement hunted successfully');

        titleInput.value = '';
        descriptionInput.value = '';

        renderRequirements();
    });

    function showResponseMessage(message) {
        responseMessage.textContent = message;
        responseMessage.style.display = 'block';
        setTimeout(() => {
            responseMessage.style.display = 'none';
        }, 3000);
    }

    function renderRequirements() {
        requirementList.innerHTML = '';
        requirements.forEach((req, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${req.title} - ${req.description}</span>
                <div class="btn-group">
                    <button class="btn btn-warning btn-sm edit" data-index="${index}">Edit</button>
                    <button class="btn btn-danger btn-sm delete" data-index="${index}">Delete</button>
                    <button type="button" class="btn btn-info btn-sm reply" data-toggle="modal" data-target="#replyModal" data-index="${index}">Reply</button>
                </div>
            `;
            requirementList.appendChild(li);
        });
    }
});
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

