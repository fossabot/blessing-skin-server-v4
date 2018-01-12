<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $primaryKey = 'pid';

    public $timestamps = false;

    protected $fillable = [
        'uid',
        'player_name',
        'preference',
        'tid_steve',
        'tid_alex',
        'tid_cape'
    ];

    public function owner()
    {
        return $this->belongsTo('App\Models\User', 'uid', 'uid');
    }

    public function steve()
    {
        return $this->hasOne('App\Models\Texture', 'tid', 'tid_steve');
    }

    public function alex()
    {
        return $this->hasOne('App\Models\Texture', 'tid', 'tid_alex');
    }

    public function cape()
    {
        return $this->hasOne('App\Models\Texture', 'tid', 'tid_cape');
    }
}
