<script type="text/javascript" src="../_javascript/speak.js"></script>


<?php
	$nome_temporario = $_FILES["upload"]["tmp_name"];
	$nome_real = $_FILES["upload"]["name"];
	copy($nome_temporario,"$nome_real");
	$arquivo = $nome_real;
	$fp = fopen($arquivo, 'r');
	$conteudo = fread($fp, filesize($arquivo));

	$videolink =  $_POST['linkvideo']; 

	if($videolink == null){
		header("location: index.html");
	}else{
		header("location: adv_player_open.html");
	}
	
?>
<script type="text/javascript">

botao.addEventListener('click', function(){
    var link = document.getElementById('link').value;


   $(video).attr('src', link);


});

	

</script>