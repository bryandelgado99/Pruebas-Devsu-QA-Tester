describe('PetStore API Testing', () => {
  
  let petId;

  // ================== HELPERS ==================

  /**
   * Crea una nueva mascota en la tienda
   */
  function crearMascota(nombre, estatus = 'available') {
    const nuevaMascota = {
      id: Math.floor(Math.random() * 100000),
      category: { id: 1, name: "Dogs" },
      name: nombre,
      photoUrls: [`https://example.com/${nombre}.jpg`],
      tags: [{ id: 1, name: "friendly" }],
      status: estatus
    };

    return cy.request({
      method: 'POST',
      url: '/v2/pet',
      body: nuevaMascota,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /**
   * Consulta una mascota por ID con retry automático para evitar 404
   */
  function consultarMascotaPorId(id, retryCount = 5) {
    return cy.request({
      method: 'GET',
      url: `/v2/pet/${id}`,
      failOnStatusCode: false
    }).then((res) => {
      if (res.status === 404 && retryCount > 0) {
        cy.wait(500);
        return consultarMascotaPorId(id, retryCount - 1);
      }
      expect(res.status).to.eq(200); // aseguramos que no siga con 404
      return res;
    });
  }

  /**
   * Actualiza una mascota existente
   */
  function actualizarMascota(mascotaData) {
    return cy.request({
      method: 'PUT',
      url: '/v2/pet',
      body: mascotaData,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /**
   * Consulta mascotas por estatus
   */
  function consultarMascotasPorEstatus(estatus) {
    return cy.request({
      method: 'GET',
      url: '/v2/pet/findByStatus',
      qs: { status: estatus }
    });
  }
  
  // Agregamos una función de espera para retardar la consulta
  function esperarMascotaPorEstatus(id, estatus, retries = 5) {
    return consultarMascotasPorEstatus(estatus).then((res) => {
      const mascota = res.body.find(pet => pet.id === id);
      if (!mascota && retries > 0) {
        cy.wait(500);
        return esperarMascotaPorEstatus(id, estatus, retries - 1);
      }
      expect(mascota).to.not.be.undefined;
      expect(mascota.status).to.eq(estatus);
      return mascota;
    });
  }

  // ================== TESTS ==================

  // TEST 1: Añadir una mascota a la tienda
  it('1. Debería añadir una nueva mascota a la tienda', () => {
    crearMascota('Firulais', 'available').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq('Firulais');
      expect(response.body.status).to.eq('available');

      petId = response.body.id;
      cy.log(`✅ Mascota creada con ID: ${petId}`);
    });
  });

  // TEST 2: Consultar la mascota por ID
  it('2. Debería consultar la mascota ingresada por ID', () => {
    crearMascota('Rex', 'available').then((createResponse) => {
      const createdPetId = createResponse.body.id;
      cy.log(`Mascota creada con ID: ${createdPetId}`);

      // Consultar con retry
      consultarMascotaPorId(createdPetId).then((response) => {
        expect(response.body).to.have.property('id', createdPetId);
        expect(response.body.name).to.eq('Rex');
        expect(response.body.status).to.eq('available');

        cy.log(`✅ Mascota consultada: ${response.body.name}, Status: ${response.body.status}`);
      });
    });
  });

  // TEST 3: Actualizar el nombre y estatus de la mascota a "sold"
  it('3. Debería actualizar el nombre y estatus de la mascota a "sold"', () => {
    crearMascota('Michi', 'available').then((createResponse) => {
      const createdPetId = createResponse.body.id;
      cy.log(`Mascota creada: ${createResponse.body.name} (ID: ${createdPetId})`);

      const mascotaActualizada = {
        ...createResponse.body,
        name: 'Michi Actualizado',
        status: 'sold'
      };

      actualizarMascota(mascotaActualizada).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body.name).to.eq('Michi Actualizado');
        expect(updateResponse.body.status).to.eq('sold');

        cy.log(`✅ Mascota actualizada: ${updateResponse.body.name}, Nuevo Status: ${updateResponse.body.status}`);
      });
    });
  });

  // TEST 4: Consultar mascotas por estatus "sold"
  it('4. Debería consultar mascotas por estatus "sold"', () => {
    crearMascota('Piolín', 'sold').then((createResponse) => {
      const createdPetId = createResponse.body.id;
      cy.log(`Mascota "sold" creada con ID: ${createdPetId}`);
  
      esperarMascotaPorEstatus(createdPetId, 'sold').then((mascota) => {
        cy.log(`✅ Mascota encontrada: ${mascota.name} con estatus ${mascota.status}`);
      });
    });
  });

});