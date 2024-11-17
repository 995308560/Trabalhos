// URL do Mocky para buscar a lista de cachorros
const mockyUrl = 'https://run.mocky.io/v3/abcd1234-5678-90ab-cdef-ghijklmno';

function showAddForm() {
    document.getElementById('modal').style.display = 'flex';
}

function closeForm() {
    document.getElementById('modal').style.display = 'none';
}

// Função para buscar a lista de cachorros da API (Mocky)
function fetchDogs() {
    fetch(mockyUrl)
        .then(response => response.json())
        .then(data => {
            const dogList = document.getElementById('dogList');
            dogList.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados

            // Adiciona os cachorros à tabela
            data.forEach(dog => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${dog.photo}" alt="Foto do Cachorro"></td>
                    <td>${dog.name}</td>
                    <td>${dog.owner}</td>
                    <td>${dog.phone}</td>
                    <td>${dog.email}</td>
                    <td><button onclick="deleteDog(this)">Deletar</button></td>
                `;
                dogList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar cachorros:', error);
        });
}

// Função para adicionar um cachorro à tabela e ao Mocky
function addDog() {
    const dogName = document.getElementById('dogName').value;
    const ownerName = document.getElementById('ownerName').value;
    const ownerPhone = document.getElementById('ownerPhone').value;
    const ownerEmail = document.getElementById('ownerEmail').value;
    const dogPhoto = document.getElementById('dogPhoto').value;

    // Verificar se todos os campos foram preenchidos
    if (!dogName || !ownerName || !ownerPhone || !ownerEmail || !dogPhoto) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    // Simulando o envio de dados para a API Mocky
    const newDog = {
        name: dogName,
        owner: ownerName,
        phone: ownerPhone,
        email: ownerEmail,
        photo: dogPhoto
    };

    // Enviar dados para o Mocky
    fetch(mockyUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDog) // Enviar os dados do novo cachorro
    })
    .then(response => response.json())
    .then(data => {
        alert("Cachorro adicionado com sucesso!");

        // Atualiza a lista de cachorros depois de adicionar o novo
        fetchDogs();

        // Limpar os campos do formulário após adicionar
        document.getElementById('dogName').value = '';
        document.getElementById('ownerName').value = '';
        document.getElementById('ownerPhone').value = '';
        document.getElementById('ownerEmail').value = '';
        document.getElementById('dogPhoto').value = '';

        // Fecha o modal
        closeForm();
    })
    .catch(error => {
        console.error('Erro ao adicionar cachorro:', error);
    });
}

// Função para deletar um cachorro da tabela
function deleteDog(button) {
    const row = button.closest('tr');
    row.remove();
}

// Adiciona o evento de click no botão "Adicionar Cachorro" para abrir o modal
document.getElementById('addDogBtn').addEventListener('click', showAddForm);

// Adiciona o evento de click no botão de fechar o modal
document.querySelector('.close').addEventListener('click', closeForm);

// Quando a página for carregada, buscar a lista de cachorros
document.addEventListener('DOMContentLoaded', fetchDogs);
