$(".searchCertificate").on('click', function(event) {
    event.preventDefault();
    axios.get("http://campusdigital.arrobamedellin.edu.co/campus/helpers/endpoint.php?opc=1&documento=" + $("input[name=documento]").val(), {})
        .then(function(response) {
            console.info(response.data);
            for (let index = 0; index < response.data.length; index++) {
                console.log(response.data[index]);
            }
        })
        .catch(function(error) {
            console.error(error);
        });

});

$(".openCerticate").on('click', function(event) {
    event.preventDefault();
    var _this = $(this);
    axios({
            method: "get",
            url: "http://200.13.254.146/generadorCertificados/index.php",
            responseType: 'arraybuffer'
        })
        .then(function(response) {
            let blob = new Blob([response.data], { type: 'application/pdf' });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Certificado.pdf';
            link.click();
        });
})