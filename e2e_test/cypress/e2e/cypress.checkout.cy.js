describe('OpenCart E2E - Flujo de Compra Completo', () => {
  
  beforeEach(() => {
    // Visitar la página principal antes de cada prueba
    cy.visit('/');
  });

  it('Debe completar el flujo de compra como invitado exitosamente', () => {
    
    // PASO 1: Agregar el primer producto al carrito
    cy.log('Agregando primer producto al carrito');
    
    // Navegar a una categoría de productos
    cy.contains('Components').click();
    cy.wait(1000);
    
    // Agregar el primer producto disponible
    cy.get('.product-layout').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    
    // Verificar mensaje de éxito
    cy.get('.alert-success', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Success');
    
    cy.wait(1000);

    // PASO 2: Agregar el segundo producto al carrito
    cy.log('Agregando segundo producto al carrito');
    
    // Seleccionar otro producto
    cy.get('.product-layout').eq(1).within(() => {
      cy.contains('Add to Cart').click();
    });
    
    // Verificar mensaje de éxito
    cy.get('.alert-success', { timeout: 10000 })
      .should('be.visible');
    
    cy.wait(1000);

    // PASO 3: Visualizar el carrito
    cy.log('Visualizando el carrito');
    
    // Click en el botón de carrito en el header
    cy.get('#cart').click();
    cy.wait(500);
    
    // Click en "View Cart"
    cy.contains('View Cart').click();
    
    // Verificar que estamos en la página del carrito
    cy.url().should('include', '/checkout/cart');
    
    // Verificar que hay 2 productos en el carrito
    cy.get('.table-responsive tbody tr').should('have.length.at.least', 2);
    
    cy.wait(1000);

    // PASO 4: Proceder al Checkout
    cy.log('Procediendo al Checkout');
    
    cy.contains('Checkout').click();
    
    // Verificar que estamos en la página de checkout
    cy.url().should('include', '/checkout/checkout');
    
    cy.wait(1500);

    // PASO 5: Seleccionar "Guest Checkout"
    cy.log('Seleccionando Guest Checkout');
    
    // Seleccionar la opción de Guest Checkout
    cy.get('input[value="guest"]').check();
    
    // Click en Continue
    cy.get('#button-account').click();
    
    cy.wait(2000);

    // PASO 6: Completar datos del formulario de Billing Details
    cy.log('Completando información de facturación');
    
    cy.get('#input-payment-firstname').clear().type('Juan');
    cy.get('#input-payment-lastname').clear().type('Pérez');
    cy.get('#input-payment-email').clear().type('juan.perez@test.com');
    cy.get('#input-payment-telephone').clear().type('0987654321');
    cy.get('#input-payment-address-1').clear().type('Av. Principal 123');
    cy.get('#input-payment-city').clear().type('Quito');
    cy.get('#input-payment-postcode').clear().type('170101');
    
    // Seleccionar país
    cy.get('#input-payment-country').select('Ecuador');
    cy.wait(1000);
    
    // Seleccionar región/estado
    cy.get('#input-payment-zone').select('Pichincha');
    
    cy.wait(1000);

    // Click en Continue para Billing Details
    cy.get('#button-guest').click();
    
    cy.wait(2000);

    // PASO 7: Continuar con Delivery Method
    cy.log('Seleccionando método de envío');
    
    cy.get('#button-shipping-method').click();
    
    cy.wait(2000);

    // PASO 8: Seleccionar Payment Method
    cy.log('Seleccionando método de pago');
    
    // Aceptar términos y condiciones
    cy.get('input[name="agree"]').check();
    
    cy.wait(500);
    
    cy.get('#button-payment-method').click();
    
    cy.wait(2000);

    // PASO 9: Confirmar la orden
    cy.log('Confirmando la orden');
    
    cy.get('#button-confirm').click();
    
    // PASO 10: Verificar confirmación
    cy.log('Verificando confirmación de orden');
    
    // Esperar a que la página de confirmación cargue
    cy.url().should('include', '/checkout/success', { timeout: 15000 });
    
    // Verificar el mensaje de éxito
    cy.get('#content h1').should('contain', 'Your order has been placed!');
    
    cy.log('✅ Flujo de compra completado exitosamente');
  });

});