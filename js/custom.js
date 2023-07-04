let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-time');
    navbar.classList.toggle('active')
}

window.onscroll = () =>{
    menu.classList.remove('fa-time');
    navbar.classList.remove('active')
}

  /*Rolagem até o Topo*/
  const rolagem = ()=> {
    const html = document.documentElement
    const seta = document.getElementById('go-top')
  
    /* Se a rolagem for maior que 550, a seta aparece 
    abaixo de 550 esconde */
    if (html.scrollTop > 350 ) {
      seta.style.display = 'block'
    } else {
      seta.style.display = 'none'
    }
  }

  //window.addEventListener('scroll', rolagem)
window.onscroll = ()=> rolagem()//evento somente para elem q existem no html