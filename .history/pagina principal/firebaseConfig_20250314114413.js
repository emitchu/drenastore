<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <title>Loja Online</title>
  <!-- Firebase -->
  <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js"></script>

  <!-- Carregar o script como módulo -->
  <script type="module" src="firebaseConfig.js"></script>
  <script type="module" src="cadastro.js"></script>
</head>
<body>
  <h1>Loja Online</h1>

  <div id="produtos">
    <!-- Produtos serão listados aqui -->
  </div>

  <button onclick="loginUsuario('email@exemplo.com', 'senha123')">Login</button>
  <button onclick="cadastrarUsuario('email@exemplo.com', 'senha123')">Cadastrar</button>

  <script type="module">
    exibirProdutos(); // Exibe os produtos na página
  </script>
</body>
</html>
