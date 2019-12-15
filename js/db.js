function favoritTeam() {

var dbPromise = idb.open("Football News", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("team", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("team", "team", { unique: false });
});

    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    fetch(base_url + "v2/teams/" + idParam, {
      method: 'GET',
      headers: {
          'X-Auth-Token': 'ebb99bb4aab34c66bf670c5bfc79f96d'
      }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            dbPromise.then(function (db) {
                if ('PushManager' in window) {
                    navigator.serviceWorker.getRegistration()
                        .then(function (reg) {
                            reg.showNotification(`Team ${data.name} Telah disimpan ke Favorit`);
                        });
                }

                var tx = db.transaction('team', 'readwrite');
                var store = tx.objectStore('team');
                var team = {
                    name: `${data.name}`
                };
                store.put(data);
                return tx.complete;
            }).then(function () {
                M.toast({html: 'Disimpan ke favorit'})
                console.log('Team sukses disimpan');
            }).catch(function (error) {
                alert('Fail to add team :(');
                console.log('Team gagal disimpan');
                console.log(error);
            });
        });
}