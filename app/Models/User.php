<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    const CREATED_AT = 'registered_at';
    const UPDATED_AT = null;

    protected $primaryKey = 'uid';

    protected $fillable = [
        'nickname', 'email', 'score', 'avatar', 'permission'
    ];

    protected $hidden = [
        'password', 'remember_token'
    ];

    public function players()
    {
        return $this->hasMany('App\Models\Player', 'uid');
    }

    public function closet()
    {
        return $this->belongsToMany('App\Models\Texture', 'closets', 'uid', 'tid');
    }
}
