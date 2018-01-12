<?php

namespace App\Models\GraphQL\Queries;

use GraphQL;
use App\Models\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;

class UserQuery extends Query
{
    protected $attributes = [
        'name' => 'users'
    ];

    public function type()
    {
        return Type::listOf(GraphQL::type('User'));
    }

    public function args()
    {
        return [
            'uid' => ['name' => 'uid', 'type' => Type::id()],
            'nickname' => ['name' => 'nickname', 'type' => Type::string()],
            'email' => ['name' => 'email', 'type' => Type::string()],
            'score' => ['name' => 'score', 'type' => Type::int()],
            'avatar' => ['name' => 'avatar', 'type' => Type::int()],
            'ip' => ['name' => 'ip', 'type' => Type::string()],
            'permission' => ['name' => 'permission', 'type' => Type::int()],
        ];
    }

    public function resolve($root, array $args)
    {
        if (isset($args['uid'])) {
            return User::where('uid', $args['uid'])->get();
        } else if (isset($args['nickname'])) {
            return User::where('nickname', $args['nickname'])->get();
        } else if (isset($args['email'])) {
            return User::where('email', $args['email'])->get();
        } else if (isset($args['score'])) {
            return User::where('score', $args['score'])->get();
        } else if (isset($args['avatar'])) {
            return User::where('avatar', $args['avatar'])->get();
        } else if (isset($args['ip'])) {
            return User::where('ip', $args['ip'])->get();
        } else if (isset($args['permission'])) {
            return User::where('permission', $args['permission'])->get();
        } else {
            return User::all();
        }
    }
}
