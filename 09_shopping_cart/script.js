document.addEventListener('DOMContentLoaded', () => {
    
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsEl = document.getElementById('total-items');
    const subtotalEl = document.getElementById('summary-subtotal');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');
    const taxRate = 0.08; // 8%

    // Calculate and update totals
    function updateTotals() {
        let subtotal = 0;
        let totalCount = 0;
        const items = document.querySelectorAll('.cart-item');

        items.forEach(item => {
            const qty = parseInt(item.querySelector('.qty-input').value);
            const unitPrice = parseFloat(item.querySelector('.price-val').getAttribute('data-price'));
            
            // Update individual line price
            const linePrice = qty * unitPrice;
            item.querySelector('.price-val').innerText = linePrice.toFixed(2);
            
            subtotal += linePrice;
            totalCount += qty;
        });

        // Calculate Taxes & Grand Total
        const tax = subtotal * taxRate;
        const grandTotal = subtotal + tax;

        // Update DOM elements
        totalItemsEl.innerText = `${totalCount} Item${totalCount !== 1 ? 's' : ''}`;
        subtotalEl.innerText = subtotal.toFixed(2);
        taxEl.innerText = tax.toFixed(2);
        totalEl.innerText = grandTotal.toFixed(2);
        
        if (items.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 2rem;">Your cart is empty.</p>';
        }
    }

    // Event Delegation for Plus, Minus, and Remove buttons
    cartItemsContainer.addEventListener('click', (e) => {
        
        // Remove Item
        if (e.target.closest('.remove-btn')) {
            const cartItem = e.target.closest('.cart-item');
            cartItem.style.opacity = '0';
            setTimeout(() => {
                cartItem.remove();
                updateTotals();
            }, 300); // Wait for transition
        }

        // Increase Quantity
        if (e.target.classList.contains('plus')) {
            const input = e.target.previousElementSibling;
            let val = parseInt(input.value);
            if (val < 10) {
                input.value = val + 1;
                updateTotals();
            }
        }

        // Decrease Quantity
        if (e.target.classList.contains('minus')) {
            const input = e.target.nextElementSibling;
            let val = parseInt(input.value);
            if (val > 1) {
                input.value = val - 1;
                updateTotals();
            }
        }
    });

    // Initial calculation on load
    updateTotals();
});
