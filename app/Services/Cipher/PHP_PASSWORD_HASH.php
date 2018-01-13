<?php

namespace App\Services\Cipher;

class PHP_PASSWORD_HASH extends BaseCipher
{
    /**
     * Use password_hash() to create hash.
     * @param string $value
     * @param string $salt
     * @return bool|string
     */
    public function hash($value, $salt = "")
    {
        return password_hash($value, PASSWORD_DEFAULT);
    }

    public function verify($password, $hash, $salt = "")
    {
        return password_verify($password, $hash);
    }
}
