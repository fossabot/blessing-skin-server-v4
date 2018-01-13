<?php

namespace App\Services\Cipher;

use Hash;

class BCRYPT extends BaseCipher
{
    public function hash($value, $salt = "")
    {
        return Hash::make($value);
    }

    public function verify($password, $hash, $salt = "")
    {
        return Hash::check($password, $hash);
    }

}
