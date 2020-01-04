$(document).ready(function () {
    
    $("#fileimagem").on('change', function () {
        
        var data = new FormData();
        data.append('files', $('#fileimagem')[0].files[0]);
        var resident = "Carlos";
        var idResident = "1";
        $.ajax({
            url: "/formigas/fotos/save/"+resident+"/"+idResident,
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                alert(data);
            }
        });

    });
});
