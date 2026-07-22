$(document).ready(function() {
    // Quando qualquer imagem com a classe .img-quadrada for clicada
    $('.img-quadrada').on('click', function() {
        // Pega o caminho (src) da imagem clicada
        var caminhoDaImagem = $(this).attr('src');
        
        // Coloca esse caminho na imagem dentro do Modal
        $('#imgModalAmpliada').attr('src', caminhoDaImagem);
    });
});