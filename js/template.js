$(".searchCertificate").on('click', function(event) {
    event.preventDefault();
    axios.get("http://200.13.254.146/helpers/usuarios/certificado/1039421996", {})
        .then(function(response) {
            console.info(response.data);
        })
        .catch(function(error) {
            console.error(error);
        });
})