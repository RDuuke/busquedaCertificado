const tbody = $("#tableCertificate tbody");
let dataSend = null;
$(".searchCertificate").on('click', function(event) {
    event.preventDefault();
    tbody.html("")
    axios.get("http://campusdigital.arrobamedellin.edu.co/campus/helpers/endpoint.php?opc=1&documento=" + $("input[name=documento]").val(), {})
        .then(function(response) {
            dataSend = response.data;
            $("#name").html(response.data[0].nombre);
            console.info(response.data);
            for (let index = 0; index < response.data.length; index++) {
                tbody.append("<tr>" +
                    "<td>" + (index + 1) + "</td><td>" + response.data[index].titulo + "</td><td><a class='openCerticate pointer' href='' data-tipo='" + response.data[index].tipo + "' data-index='" + index + "' data-iduc='" + response.data[index].idcu + "'><img src='img/download.png'</a></td>" +
                    "</tr>");
            }
            $("#content_result").fadeIn();
        })
        .catch(function(error) {
            console.error(error);
        });

});

$("#tableCertificate tbody").on('click', '.openCerticate', function(event) {
    event.preventDefault();
    var _this = $(this);

    params = {
        'tipo': _this.attr('data-tipo'),
        'data_certificate': dataSend[_this.attr('data-index')]
    }
    console.log(params);
    axios.post("http://200.13.254.146/generadorCertificados/index.php", params, {
            method: "post",
            responseType: 'arraybuffer',
            headers: {
                "Access-Control-Allow-Methods": 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Credentials": "true"
            }
        })
        .then(function(response) {
            axios.get("http://campusdigital.arrobamedellin.edu.co/campus/helpers/endpoint.php?opc=2&idUserCertificate=" + _this.attr('data-iduc'), {})
                .then(function(r) {
                    return true;
                });
            let blob = new Blob([response.data], { type: 'application/pdf' });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Certificado.pdf';
            link.click();
        });
})