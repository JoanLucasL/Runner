<?php
    $game = array_keys($_GET)[0];
    header('Content-type: text/css');
    system("sass $game/sass/style.sass style.css");
    echo file_get_contents('style.css');
?>