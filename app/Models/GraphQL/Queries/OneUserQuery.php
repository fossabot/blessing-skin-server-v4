<?php

namespace App\Models\GraphQL\Queries;

use GraphQL;
use App\Models\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;

class OneUserQuery extends Query
{
    protected $attributes = [
        'name' => 'user'
    ];

    public function type()
    {
        return GraphQL::type('User');
    }

    public function args()
    {
        return [
            'uid' => ['name' => 'uid', 'type' => Type::id()],
            'email' => ['name' => 'email', 'type' => Type::string()],
        ];
    }

    public function resolve($root, array $args)
    {
        if (isset($args['uid'])) {
            return User::where('uid', $args['uid'])->first();
        } else if (isset($args['email'])) {
            return User::where('email', $args['email'])->first();
        } else {
            return null;
        }
    }
}
