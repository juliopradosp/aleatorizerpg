$(document).ready(function() {
       
    // ======================================================
    // 1. LÓGICA DE CARREGAMENTO DE CONTEÚDO (AJAX/JQuery)
    // ======================================================

    $('.personagem-item').on('click', function(e) {
        
        // Remove classe ativa visual de todos e adiciona no clicado
        $('.personagem-item').removeClass('active');
        $(this).addClass('active');

        let urlArquivo = $(this).data('url');

        // Mostra um indicador de carregamento (Loading spinner)
        $('#conteudo-personagem').html(`
            <div class="text-center py-5">
                <div class="spinner-border text-warning" role="status"></div>
                <p class="mt-2 text-muted">Invocando pergaminhos...</p>
            </div>
        `);

        // caminho relativo é baseado no index.html
        $('#conteudo-personagem').load(urlArquivo, function(response, status, xhr) {
            if (status == "error") {
                $('#conteudo-personagem').html(`
                    <div class="text-center py-5 text-danger">
                        <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                        <h4>Erro ao carregar personagem</h4>
                        <p>O arquivo <strong>${urlArquivo}</strong> não foi encontrado ou houve um erro de conexão.</p>
                        <small>Código: ${xhr.status} ${xhr.statusText}</small>
                    </div>
                `);
            } else {
                $(this).hide().fadeIn();
            }
        });
    });

});