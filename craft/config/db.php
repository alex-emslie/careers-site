<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

$url = parse_url(getenv("CLEARDB_DATABASE_URL"));
$db = substr($url["path"],1);

return array(
  '*' => array(
    'tablePrefix' => 'craft',
  ),
  '.com' => array(
    'server' => $url["host"],
    'user' => $url["user"],
    'password' => $url["pass"],
    'database' => $db,
  ),
  '.dev' => array(
    'server' => 'localhost',
    'user' => root,
    'password' => "kIMexpMHgp3UNfVezIn0S9dGys",
    'database' => "careers_local",
  )
);
