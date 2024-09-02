const headerButtons = document.querySelectorAll(".header-btn");
const sobreMim = document.querySelector(".sobre-mim");
const formacao = document.querySelector(".formacao");
const meusProjetos = document.querySelector(".meus-projetos");
const contato = document.querySelector(".contato");


headerButtons.forEach(item => {   
    item.addEventListener("click", e => {
        sobreMim.style.display = "none";    
        formacao.style.display = "none";
        meusProjetos.style.display = "none";
        contato.style.display = "none"; 
        const tabEscolhida = item.innerHTML.replace(" ", "-").replace("ç", "c").replace("ã", "a").toLowerCase();
        document.querySelector(`.${tabEscolhida}`).style.display = "block";
    })
})
