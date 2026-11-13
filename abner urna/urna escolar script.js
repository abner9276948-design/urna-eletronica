   const estilo = document.createElement("style");

estilo.textContent = `
.botao:focus-visible {
    outline: 3px solid var(--cor-destaque);
    outline-offset: 3px;
}

.mensagem {
    min-height: 24px;
    margin-top: 14px;
    color: var(--cor-primaria);
    font-weight: 600;
}

.chapas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 18px;
}

.cartao-chapa {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 20px;
    background: #f8faff;
    border: 1px solid var(--cor-borda);
    border-radius: 14px;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.cartao-chapa:hover {
    transform: translateY(-3px);
    border-color: #9bb5e8;
    box-shadow: 0 8px 20px rgba(20, 42, 80, 0.08);
}

.cartao-chapa h3 {
    color: var(--cor-primaria);
    font-size: 1.2rem;
}

.cartao-chapa p {
    flex: 1;
    color: var(--cor-texto-suave);
    font-size: 0.92rem;
}

.cartao-chapa .botao {
    width: 100%;
    margin-top: 4px;
}

[hidden] {
    display: none !important;
}

@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 520px) {
    body {
        padding: 18px 12px;
    }

    .cabecalho {
        padding: 23px 20px;
        border-radius: 16px;
    }

    .painel {
        padding: 21px 18px;
        border-radius: 15px;
    }

    .painel-topo {
        align-items: flex-start;
        flex-direction: column;
    }

    .status {
        align-self: flex-start;
    }

    .chapas {
        grid-template-columns: 1fr;
    }
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
`;

document.head.appendChild(estilo);