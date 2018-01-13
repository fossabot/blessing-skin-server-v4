<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
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
        return $this
            ->belongsToMany('App\Models\Texture', 'closets', 'uid', 'tid')
            ->withPivot('item_name');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }


}
