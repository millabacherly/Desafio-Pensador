Documentação do projeto NodeJS - Backend Developer - Desafio O Pensador

[Usuário] Cadastro do usuário

Função assíncrona que traz o username, o email e o password do body da requisição;

Bloco de trycatch que valida se o email já existe;

Caso passe na validação cria-se uma senha encriptada de até 10 caracteres;

Envia para o banco de dados do usuário o username, o email e a senha encriptada;

Retorna mensagem de sucesso do cadastro;


[Login] Login do usuário 

Função assíncrona que traz o username e o password do body da requisição;

Bloco de trycatch que verifica se existe o usuário no banco de dados;

Validação do usuário retornando mensagem caso não encontrado;

Validação de senha correta, comparando a senha com uma senha válida no banco de dados, retornando mensagem de erro caso senha não exista;

Cria-se um token de usuário através do padrão jsonwebtoken;

Retorna a senha encriptada através do token e os dados do usuário;


[Editar] Edição do usuário 

Função assíncrona que traz o usuário direto da requisição, username, email e password do body da requisição; 

Verificação se o username e o email não existem, retornando uma mensagem de campos de preenchimento obrigatório;

Bloco de trycatch
- Usuário e email encontrados, validação retornando uma mensagem caso os campos já existam;
- Dados do usuário através do id único deste usuário;

Senha encriptada: 
- Variável para senha encriptada;
- Valida se não há senha, atribuindo a variável uma senha aos dados do usuário;
- Se houver, atribui o método bcrypt de encriptamento de senha de até 10 caracteres ao usuário;

Envia ao banco de dados os seguintes dados atualizados do usuário, username, email e senha encriptada;

Retorna os dados atualizados;


[Visualizar] Visualização da conta 

Função assíncrona que traz o usuário direto da reqauisição;

Bloco de trycatch que valida se o usuário foi encontrado, retornando uma mensagem de erro caso contrário;

Se localizado, traz a senha e os dados de usuário;


[Deletar] Deleção da conta 

Função assíncrona que traz o usuário direto da requisição;

Bloco de trycatch que localiza o usuário, verifica se não há o usuário retornando mensagem de usuário não encontrado; 

Deleta o usuário encontrado através do seu id retornando mensagem de usuário deletado com sucesso; 


Ao fim se exportam todas as funções para que possam ser correspondidas as suas rotas com seus devidos verbos http.