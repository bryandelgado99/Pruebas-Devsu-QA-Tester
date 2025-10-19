═══════════════════════════════════════════════════════════════
  PRUEBA E2E - OPENCART CHECKOUT FLOW
  Framework: Cypress.io con JavaScript
═══════════════════════════════════════════════════════════════

📋 DESCRIPCIÓN
═══════════════════════════════════════════════════════════════
Esta prueba automatizada realiza un flujo completo de compra E2E 
en el sitio http://opencart.abstracta.us/ que incluye:

1. Agregar dos productos al carrito
2. Visualizar el carrito
3. Completar el checkout como invitado (Guest Checkout)
4. Finalizar la compra hasta la confirmación "Your order has been placed!"

📦 PREREQUISITOS
═══════════════════════════════════════════════════════════════
- Node.js (versión 20 o superior)
- npm (viene con Node.js)
- Sistema Operativo: Windows, macOS, o Linux

Para Linux/Ubuntu, instalar dependencias del sistema:
  sudo apt-get update
  sudo apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb


⚙️ INSTALACIÓN
═══════════════════════════════════════════════════════════════
1. Descomprimir el archivo .zip/.rar en una carpeta

2. Abrir terminal/consola en la carpeta del proyecto

3. Instalar las dependencias:
   npm install


🚀 EJECUCIÓN DE LAS PRUEBAS
═══════════════════════════════════════════════════════════════

OPCIÓN 1 - Modo Headless (Sin interfaz gráfica - Recomendado):
───────────────────────────────────────────────────────────────
  npm run test
  
  O directamente:
  npx cypress run


OPCIÓN 2 - Modo Interactivo (Con interfaz gráfica):
───────────────────────────────────────────────────────────────
  npx cypress open
  
  Luego en la interfaz:
  - Seleccionar "E2E Testing"
  - Elegir un navegador (Chrome recomendado)
  - Click en el archivo: opencart-checkout.cy.js


📊 RESULTADOS
═══════════════════════════════════════════════════════════════
Después de ejecutar las pruebas:

- Videos: Se guardan en /cypress/videos/
- Screenshots (si hay fallos): Se guardan en /cypress/screenshots/
- Reporte en consola: Muestra el resumen de pasos ejecutados


📁 ESTRUCTURA DEL PROYECTO
═══════════════════════════════════════════════════════════════
e2e-opencart-test/
├── cypress/
│   ├── e2e/
│   │   └── opencart-checkout.cy.js    ← Prueba principal
│   ├── fixtures/
│   ├── screenshots/                   ← Screenshots de errores
│   ├── support/
│   └── videos/                        ← Videos de ejecución
├── node_modules/
├── cypress.config.js                  ← Configuración de Cypress
├── package.json
├── readme.txt                         ← Este archivo
└── conclusiones.txt                   ← Hallazgos y conclusiones


🔍 DETALLES DE LA PRUEBA
═══════════════════════════════════════════════════════════════
Archivo: cypress/e2e/opencart-checkout.cy.js

Pasos automatizados:
  1. Navega a la categoría "Components"
  2. Agrega el primer producto al carrito
  3. Agrega el segundo producto al carrito
  4. Visualiza el carrito
  5. Verifica que hay 2 productos
  6. Procede al Checkout
  7. Selecciona "Guest Checkout"
  8. Completa datos de facturación:
     - Nombre: Juan
     - Apellido: Pérez
     - Email: juan.perez@test.com
     - Teléfono: 0987654321
     - Dirección: Av. Principal 123
     - Ciudad: Quito
     - Código Postal: 170101
     - País: Ecuador
     - Región: Pichincha
  9. Confirma método de envío
  10. Acepta términos y condiciones
  11. Confirma método de pago
  12. Confirma la orden
  13. Verifica mensaje: "Your order has been placed!"


⚠️ NOTAS IMPORTANTES
═══════════════════════════════════════════════════════════════
- La prueba usa esperas (waits) para asegurar que los elementos 
  carguen correctamente
- Si el sitio web está caído o lento, la prueba puede fallar
- Los videos se generan automáticamente en cada ejecución
- Tiempo aproximado de ejecución: 30-45 segundos


🐛 TROUBLESHOOTING
═══════════════════════════════════════════════════════════════
Problema: "Cypress failed to verify that this binary is executable"
Solución: 
  npx cypress verify
  npx cypress cache clear
  npm install cypress --force

Problema: Error de timeout
Solución: Verificar conexión a internet y que el sitio esté accesible

Problema: Dependencias faltantes en Linux
Solución: Ejecutar el comando de instalación de dependencias del 
          sistema mencionado en PREREQUISITOS


📞 SOPORTE
═══════════════════════════════════════════════════════════════
Documentación oficial de Cypress: https://docs.cypress.io
Documentación de dependencias: https://on.cypress.io/required-dependencies

════════════════════════════════════════════════════════════════
Versión: 1.0
Fecha: Octubre 2025
Framework: Cypress v15.5.0
════════════════════════════════════════════════════════════════