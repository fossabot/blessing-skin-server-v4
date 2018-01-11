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
}
