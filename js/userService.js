function users(page) {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de usuarios</h5>'
    const REQRES_ENDPOINT = "https://fakestoreapi.com/users";
    fetch(REQRES_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    })
      .then((response) => {
        return response.json().then(
          data => {
          return {
            status: response.status,
            info: data,
          };
        });
      })
      .then((result) => {
        console.log("resultado ", result);
        if (result.status === 200) {
          let listusers = `
              <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Contraseña</th>
        <th scope="col">Username</th>
        <th scope="col">Acción</th>

      </tr>
    </thead>
    <tbody>`;
          result.info.forEach(element => {
             listusers =  listusers + `   
            <tr>
                  <td>${element.id}</td>
                  <td>${element.name.firstname}</td>
                  <td>${element.password}</td>
                  <td>${element.username}</td>
                  <td><button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button></td>
            </tr>
            `
          });
          listusers= listusers + `
              </tbody>
          </table>    
          <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#" onclick="users('1')">1</a></li>
                <li class="page-item"><a class="page-link" href="#" onclick="users('2')">2</a></li>
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
          `
          document.getElementById("info").innerHTML =  listusers;
        } 
        else {
          document.getElementById("info").innerHTML =
            "No existe usuarios en la Base de Datos";
        }
      });
  }
  function getUser(idUser){
    const REQRES_ENDPOINT = "https://fakestoreapi.com/users/"+idUser;
    fetch(REQRES_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    })
    .then((result) =>{
        return result.json().then(
            data =>{
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response) =>{
        if(response.status === 200){
            const user = response.body
            const modalUser = `
            
            <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="card">
                        
                        <div class="card-body">
                            <h5 class="card-title">Informacion del Usuario:</h5>
                            <p class="card-text">ID: ${user.id}</p>
                            <p class="card-text">Usuario: ${user.username}</p>
                            <p class="card-text">Contraseña: ${user.password}</p>
                            
                        </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            `
            document.getElementById('viewModal').innerHTML = modalUser
            const modal = new bootstrap.Modal(
                document.getElementById('modalUser')
            )
            modal.show()
        }
        else{
            document.getElementById('info').innerHTML = 
            '<h3>No se encontro el usuario en la Api</h3>'
        }
    })
  }