<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Texture extends Model
{
    protected $primaryKey = 'tid';

    const CREATED_AT = 'uploaded_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'type', 'uploader_id', 'likes', 'public'
    ];

    public function uploader()
    {
        return $this->belongsTo('App\Models\User', 'uploader_id', 'uid');
    }
}
