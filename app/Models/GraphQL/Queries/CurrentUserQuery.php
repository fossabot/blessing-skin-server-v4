<?php

namespace App\Models\GraphQL\Queries;

use Auth;
use GraphQL;
use Rebing\GraphQL\Support\Query;

class CurrentUserQuery extends Query
{
    protected $attributes = [
        'name' => 'currentUser'
    ];

    public function type()
    {
        return GraphQL::type('User');
    }

    public function resolve()
    {
        return Auth::user();
    }
}
