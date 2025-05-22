function getCarts() {
    document.getElementById('cardHeader').innerHTML = '<h4>Lista de carritos de compras</h4>';

    fetch("https://reqres.in/api/users?page=2", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(result => result.json().then(data => ({
        status: result.status,
        body: data
    })))
    .then(response => {
        if (response.status === 200) {
            let cartList = `
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            response.body.data.forEach(user => {
                cartList += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.first_name} ${user.last_name}</td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="viewCartDetail(${user.id})">Ver</button>
                        </td>
                    </tr>
                `;
            });
            cartList += `
                    </tbody>
                </table>
            `;
            document.getElementById('info').innerHTML = cartList;
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontraron carritos</h3>';
        }
    });
}

function viewCartDetail(cartId) {
    fetch("https://fakestoreapi.com/carts", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(result => result.json().then(data => ({
        status: result.status,
        body: data
    })))
    .then(response => {
        if (response.status === 200) {
            const user = response.body.data;
            const modalContent = `
                <div class="modal fade" id="modalCart" tabindex="-1" aria-labelledby="modalCartLabel" aria-hidden="true">
                  <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="modalCartLabel">Detalle del carrito</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                      </div>
                      <div class="modal-body">
                        <div class="card">
                        
                          <div class="card-body">
                            <h6 class="card-title">Cliente</h6
                            <p class="card-text text-muted">Este es un carrito simulado.</p>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>
            `;
            [
                {
                  "id": 1,
                  "userId": 1,
                  "date": "2020-03-02T00:00:00.000Z",
                  "products": [
                    {
                      "productId": 1,
                      "quantity": 4
                    },
                    {
                      "productId": 2,
                      "quantity": 1
                    },
                    {
                      "productId": 3,
                      "quantity": 6
                    }
                  ],
                  "__v": 0
                },
                {
                  "id": 2,
                  "userId": 1,
                  "date": "2020-01-02T00:00:00.000Z",
                  "products": [
                    {
                      "productId": 2,
                      "quantity": 4
                    },
                    {
                      "productId": 1,
                      "quantity": 10
                    },
                    {
                      "productId": 5,
                      "quantity": 2
                    }
                  ],
                  "__v": 0
                },
                {
                  "id": 3,
                  "userId": 2,
                  "date": "2020-03-01T00:00:00.000Z",
                  "products": [
                    {
                      "productId": 1,
                      "quantity": 2
                    },
                    {
                      "productId": 9,
                      "quantity": 1
                    }
                  ],
                  "__v": 0
                },
                {
                  "id": 4,
                  "userId": 3,
                  "date": "2020-01-01T00:00:00.000Z",
                  "products": [
                    {
                      "productId": 1,
                      "quantity": 4
                    }
                  ],
                  "__v": 0
                },
                {
                  "id": 5,
                  "userId": 3,
                  "date": "2020-03-01T00:00:00.000Z",
                  "products": [
                    {
                      "productId": 7,
                      "quantity": 1
                    },
                    {
                      "productId": 8,
                      "quantity": 1
                    }
                  ],
                  "__v": 0
                },
                {
                  "id": 6,
                  "userId": 4,
                  "date": "2020-03-01T00:00:00.000Z",
                  "products": [
                    {
                      "productId": 10,
                      "quantity": 2
                    },
                    {
                      "productId": 12,
                      "quantity": 3
                    }
                  ],
                  "__v": 0
                },
                {
                  "id": 7,
                  "userId": 8,
                  "date": "2020-03-01T00:00:00.000Z",
                  "products": [
                    {
                      "productId": 18,
                      "quantity": 1
                    }
                  ],
                  "__v": 0
                }
              ]
            document.getElementById('showModal').innerHTML = modalContent;
            const modal = new bootstrap.Modal(document.getElementById('modalCart'));
            modal.show();
        } else {
            alert("No se pudo obtener detalle del carrito.");
        }
    });
}
