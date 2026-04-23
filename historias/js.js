$(document).ready(function() {
    
    // ======================================================
    // 1. LÓGICA DO SLIDER (Arrastar com o mouse - Drag to Scroll)
    // ======================================================
    const slider = document.getElementById('characterSlider');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Quando clica no slider
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        // Pega a posição inicial do clique
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    // Quando o mouse sai da área do slider
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    // Quando solta o botão do mouse
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    // Quando move o mouse (enquanto segura o clique)
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; // Se não estiver clicando, não faz nada
        e.preventDefault(); // Evita selecionar texto ou arrastar imagens nativamente
        
        const x = e.pageX - slider.offsetLeft;
        // O "walk" define a velocidade. Multiplique por 2 ou 3 para scrollar mais rápido
        const walk = (x - startX) * 2; 
        slider.scrollLeft = scrollLeft - walk;
    });


    // ======================================================
    // 2. LÓGICA DE CARREGAMENTO DE CONTEÚDO (AJAX/JQuery)
    // ======================================================

    $('.story-item').on('click', function(e) {
        // Previne que o clique dispare se o usuário estava apenas arrastando o slider
        if (isDown) return; 
        
        // Remove classe ativa visual de todos e adiciona no clicado
        $('.story-item').removeClass('active');
        $(this).addClass('active');

        // Pega o nome do arquivo HTML definido no atributo 'data-url' do HTML
        // Exemplo: data-url="livia-parker.html"
        let urlArquivo = $(this).data('url');

        // Mostra um indicador de carregamento (Loading spinner)
        $('#conteudo-historia').html(`
            <div class="text-center py-5">
                <div class="spinner-border text-warning" role="status"></div>
                <p class="mt-2 text-muted">Invocando pergaminhos...</p>
            </div>
        `);

        // Carrega o arquivo HTML externo dentro da div #conteudo-historia
        // Como o js.js é chamado pelo index.html, o caminho relativo é baseado no index.html
        $('#conteudo-historia').load(urlArquivo, function(response, status, xhr) {
            if (status == "error") {
                // Mensagem de erro caso o arquivo não exista ou dê erro de servidor
                $('#conteudo-historia').html(`
                    <div class="text-center py-5 text-danger">
                        <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                        <h4>Erro ao carregar história</h4>
                        <p>O arquivo <strong>${urlArquivo}</strong> não foi encontrado ou houve um erro de conexão.</p>
                        <small>Código: ${xhr.status} ${xhr.statusText}</small>
                    </div>
                `);
            } else {
                // Opcional: Efeito suave de aparecimento quando termina de carregar
                $(this).hide().fadeIn();
            }
        });
    });

});