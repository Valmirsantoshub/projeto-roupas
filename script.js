document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const cart = [];
    const cartButton = document.querySelector(".whatsapp-button");
    
    // Cria o elemento do contador dinamicamente
    const cartCounter = document.createElement("span");
    cartCounter.classList.add("cart-counter");
    cartCounter.textContent = "0";
    cartButton.appendChild(cartCounter);

    // Atualiza o carrinho e o contador
    const updateCart = () => {
        let total = 0;
        let cartText = "Olá! Gostaria de fazer a seguinte compra:\n";

        cart.forEach(item => {
            cartText += `- ${item.name} (R$ ${item.price.toFixed(2)})\n`;
            total += item.price;
        });

        cartText += `\nTotal: R$ ${total.toFixed(2)}`;
        cartButton.href = `https://api.whatsapp.com/send?phone=5515991608575&text=${encodeURIComponent(cartText)}`;

        // Atualiza o contador de itens
        cartCounter.textContent = cart.length;

        // Mostra ou oculta o contador dependendo da quantidade de itens
        cartCounter.style.display = cart.length > 0 ? "flex" : "none";
    };

    // Adiciona o evento de clique para cada item do menu
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            const name = item.querySelector("h3").textContent.trim();
            const price = parseFloat(item.querySelector("p").textContent.replace("R$", "").trim());

            cart.push({ name, price });
            updateCart();
        });
    });

    // Oculta o contador inicialmente
    cartCounter.style.display = "none";
});
