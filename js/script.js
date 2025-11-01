// ====================================
//   CONTROLE DE NAVEGAÇÃO E MENU MOBILE
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');
    const header = document.querySelector('.header');
    
    // Menu Mobile Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // ====================================
    //   SCROLL SUAVE E NAVEGAÇÃO ATIVA
    // ====================================
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Destacar link ativo na navegação
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    // ====================================
    //   CONTROLE DE SCROLL
    // ====================================
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header com fundo sólido ao rolar
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Mostrar/esconder botão voltar ao topo
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Atualizar link ativo
        updateActiveLink();
        
        lastScrollTop = scrollTop;
    });
    
    // Botão voltar ao topo
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ====================================
    //   GALERIA DE FOTOS - SISTEMA DE ABAS
    // ====================================
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remover classe ativa de todos os botões e abas
            tabButtons.forEach(btn => btn.classList.remove('active'));
            galleryTabs.forEach(tab => tab.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado e aba correspondente
            this.classList.add('active');
            const targetTab = document.getElementById(tabName);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
    
    // ====================================
    //   ANIMAÇÕES DE ENTRADA
    // ====================================
    
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const animatedElements = document.querySelectorAll(`
        .benefit-item,
        .service-card,
        .why-item,
        .gallery-item,
        .testimonial-item,
        .contact-method
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // ====================================
    //   FORMULÁRIO DE CONTATO
    // ====================================
    
    const contactForm = document.getElementById('orcamento-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulário
            if (validateForm()) {
                // Simular envio (aqui você conectaria com seu backend)
                showFormSuccess();
            }
        });
    }
    
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            const value = field.value.trim();
            const fieldGroup = field.closest('.form-group');
            
            // Remover classes de erro anteriores
            fieldGroup.classList.remove('error');
            
            // Validar campo obrigatório
            if (!value) {
                fieldGroup.classList.add('error');
                isValid = false;
            }
            
            // Validação específica para telefone
            if (field.type === 'tel' && value) {
                const phoneRegex = /^\\(?\\d{2}\\)?\\s?9?\\d{4,5}-?\\d{4}$/;
                if (!phoneRegex.test(value.replace(/\\s/g, ''))) {
                    fieldGroup.classList.add('error');
                    isValid = false;
                }
            }
            
            // Validação específica para email
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                if (!emailRegex.test(value)) {
                    fieldGroup.classList.add('error');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    function showFormSuccess() {
        // Criar modal de sucesso
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Orçamento Enviado com Sucesso!</h3>
                <p>Recebemos sua solicitação e entraremos em contato em até 2 horas.</p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="closeSuccessModal()">
                        Fechar
                    </button>
                    <a href="https://wa.me/5527999009076" class="btn btn-whatsapp" target="_blank">
                        <i class="fab fa-whatsapp"></i>
                        WhatsApp Direto
                    </a>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Limpar formulário
        contactForm.reset();
        
        // Fechar modal automaticamente após 5 segundos
        setTimeout(() => {
            closeSuccessModal();
        }, 5000);
    }
    
    // ====================================
    //   MÁSCARAS DE ENTRADA
    // ====================================
    
    // Máscara para telefone
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 10) {
                    value = value.replace(/(\\d{2})(\\d{4})(\\d{4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\\d{2})(\\d{5})(\\d{4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
    
    // ====================================
    //   CARROSSEL DE DEPOIMENTOS (se necessário)
    // ====================================
    
    function initTestimonialsCarousel() {
        const testimonials = document.querySelector('.testimonials-grid');
        if (!testimonials) return;
        
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonials.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonials.offsetLeft;
            scrollLeft = testimonials.scrollLeft;
        });
        
        testimonials.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonials.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonials.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonials.offsetLeft;
            const walk = (x - startX) * 2;
            testimonials.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Inicializar carrossel em mobile
    if (window.innerWidth <= 768) {
        initTestimonialsCarousel();
    }
    
    // ====================================
    //   LAZY LOADING DE IMAGENS
    // ====================================
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ====================================
    //   CONTADOR DE TELEFONE (analytics)
    // ====================================
    
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Aqui você pode adicionar tracking de cliques em telefones
            // gtag('event', 'phone_click', { 'phone_number': this.href });
            console.log('Clique no telefone:', this.href);
        });
    });
    
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Tracking de cliques no WhatsApp
            console.log('Clique no WhatsApp:', this.href);
        });
    });
    
    // ====================================
    //   LOADING STATE DO FORMULÁRIO
    // ====================================
    
    function setFormLoading(isLoading) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.innerHTML;
        
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                Enviando...
            `;
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = btnText;
        }
    }
    
    // ====================================
    //   PERFORMANCE E OTIMIZAÇÕES
    // ====================================
    
    // Debounce para scroll
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplicar debounce ao scroll
    const debouncedScroll = debounce(() => {
        updateActiveLink();
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Preload de imagens importantes
    function preloadImages() {
        const importantImages = [
            'images/hero-bg.jpg',
            'images/logo-gjm.png'
        ];
        
        importantImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Executar preload após carregamento inicial
    setTimeout(preloadImages, 1000);
});

// ====================================
//   FUNÇÕES GLOBAIS
// ====================================

// Fechar modal de sucesso
function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.remove();
    }
}

// Abrir WhatsApp com mensagem personalizada
function openWhatsApp(message = '') {
    const phone = '5527999009076';
    const defaultMessage = 'Olá! Gostaria de solicitar um orçamento para limpeza de coifas.';
    const finalMessage = message || defaultMessage;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
}

// Função para tracking de eventos (Google Analytics)
function trackEvent(action, category = 'engagement') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': window.location.pathname
        });
    }
}

// ====================================
//   CSS ADICIONAL PARA ANIMAÇÕES
// ====================================

// Adicionar estilos CSS dinamicamente
const animationStyles = `
<style>
/* Animações de entrada */
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}

.animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Modal de sucesso */
.success-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease-out;
}

.modal-content {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    max-width: 400px;
    width: 90%;
    text-align: center;
    animation: slideIn 0.3s ease-out;
}

.success-icon {
    font-size: 3rem;
    color: var(--success);
    margin-bottom: 1rem;
}

.modal-content h3 {
    color: var(--gray-900);
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.modal-content p {
    color: var(--gray-600);
    margin-bottom: 2rem;
    line-height: 1.6;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.modal-actions .btn {
    flex: 1;
    min-width: 120px;
}

/* Estados de erro no formulário */
.form-group.error input,
.form-group.error select,
.form-group.error textarea {
    border-color: var(--error);
    background-color: rgba(239, 68, 68, 0.05);
}

.form-group.error::after {
    content: 'Campo obrigatório';
    color: var(--error);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
}

/* Header scrolled */
.header.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
}

/* Lazy loading */
.lazy {
    filter: blur(5px);
    transition: filter 0.3s;
}

/* Animações keyframes */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Menu mobile aberto */
body.menu-open {
    overflow: hidden;
}

/* Responsive para modal */
@media (max-width: 480px) {
    .modal-content {
        padding: 2rem 1.5rem;
    }
    
    .modal-actions {
        flex-direction: column;
    }
    
    .modal-actions .btn {
        width: 100%;
    }
}
</style>
`;

// Inserir estilos no head
document.head.insertAdjacentHTML('beforeend', animationStyles);