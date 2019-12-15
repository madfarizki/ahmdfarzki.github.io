var base_url = "https://api.football-data.org/";
const API_KEY = 'ebb99bb4aab34c66bf670c5bfc79f96d';

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  fetch(base_url + "v2/competitions/2003/matches", {
    method: 'GET',
    headers: {
        'X-Auth-Token': API_KEY
    }
  })

  .then(status)
  .then(json)
  .then(function(data) {
          var articlesHTML = "";

          console.log(data);

          data.matches.forEach(function(article) {
            articlesHTML += `
            
            <div class="card">
                <table class="highlight centered">
                    <thead>
                    <tr>
                        
                        <th>${article.homeTeam.name}</th>
                        <th>Vs</th>
                        <th>${article.awayTeam.name}</th>
                    </tr>
                    </thead>
        
                    <tbody>
                        <tr>
                            <td>${article.score.fullTime.homeTeam}</td>
                            <td>Score Winner</br>${article.score.winner}</td>
                            <td>${article.score.fullTime.awayTeam}</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        })
        .catch(error);
      }

  

    function getTeam() {
      fetch(base_url + "v2/competitions/2003/teams", {
        method: 'GET',  
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
  
    .then(status)
    .then(json)
    .then(function(data){
      var teamHTML = "";
      let teams     = data.teams;
  
      console.log(teams);

      teams.forEach(function(team){
  
        teamHTML += `
        
        <div class="card">
        <table class="highlight centered">
            <thead>
            <tr>
              <div class="center"><img width="100" height="100" src="${team.crestUrl}"></div>
              <th>${team.name}</th>
            </tr>
            </thead>
  
            <tbody>
                <tr>
                  <td><a class="waves-light btn blue" href="./pages/information.html?id=${team.id}">Information</a></td>
                </tr>
            </tbody>
        </table>
    </div>
        `;
      });
      
  
      document.getElementById("team").innerHTML = teamHTML;
  
    })
    .catch(error);
  }
  

      function getInfo() {

        const urlParams = new URLSearchParams(window.location.search);
        const idParam   = urlParams.get("id");

        console.log(idParam);

        fetch(base_url + "v2/teams/" + idParam, {
        method: 'GET',  
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
  
    .then(status)
    .then(json)
    .then(function(data){
      var infoHTML  = "";
      let teams     = data.teams;
      
  
      console.log(data);
      
      infoHTML += `
        
        <div class="card">
        <table class="highlight centered">
            <thead>
            <tr>
              
              <div class="center"><img width="100" height="100" src="${data.crestUrl}"></div>
              <h4 class="center">${name}</h4>
      
            </tr>

            </thead>
  
            <tbody>
                <tr>
                  <h6 class="center">Address : ${data.address}</h6 class="center">
                  <h6 class="center">Phone : ${data.phone}</h6 class="center">
                  <h6 class="center">Email : ${data.email}</h6 class="center">
                  <h6 class="center">Website : ${data.website}</h6 class="center">
                  <td><a class="waves-effect waves-light btn-small blue" onclick="favoritTeam()"><i class="material-icons left">add</i>Favorit</a></td>
                </tr>
            </tbody>
        </table>
    </>
        `;
      
      
  
      document.getElementById("info").innerHTML = infoHTML;
  
    })
    .catch(error);
  }


  function getInfoById() {
    // Ambil nilai query parameter (?id=)
  
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
  
    fetch(base_url + "v2/teams/" + idParam, {
      method: 'GET',
      headers: {
          'X-Auth-Token': API_KEY
      }
    })
    
  
    .then(status)
    .then(json)
    .then(function(data) {

      console.log(data);
            var infoHTML = `
  
            <div class="card">
        <table class="highlight centered">
            <thead>
            <tr>
              
              <div class="center"><img width="100" height="100" src="${data.crestUrl}"></div>
              <h4 class="center">${data.name}</h4>
      
            </tr>

            </thead>
  
            <tbody>
                <tr>
                  <h6 class="center">Address : ${data.address}</h6 class="center">
                  <h6 class="center">Phone : ${data.phone}</h6 class="center">
                  <h6 class="center">Email : ${data.email}</h6 class="center">
                  <h6 class="center">Website : ${data.website}</h6 class="center">
                </tr>
            </tbody>
        </table>
        `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = infoHTML;
          })
          .catch(error);
      };
    