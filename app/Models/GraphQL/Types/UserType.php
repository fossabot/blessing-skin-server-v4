<?php

namespace App\Models\GraphQL\Types;

use GraphQL;
use Carbon\Carbon;
use App\Models\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class UserType extends GraphQLType
{
    protected $attributes = [
        'name' => 'User',
        'description' => 'A user',
        'model' => User::class
    ];

    public function fields()
    {
        return [
            'uid' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'The unique user ID.'
            ],
            'nickname' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Nickname of a user.'
            ],
            'email' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Email address of a user. It is unique.'
            ],
            'score' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Score of a user.'
            ],
            'avatar' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Texture ID of a user's avatar."
            ],
            'ip' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'IP of which the user registered.'
            ],
            'permission' => [
                'type' => Type::nonNull(GraphQL::type('PermissionEnum')),
                'description' => 'Permission of a user.'
            ],
            'last_signed_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Timestamp of last time of signed.'
            ],
            'registered_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Timestamp of registered.'
            ],
            'players' => [
                'type' => Type::listOf(GraphQL::type('Player')),
                'description' => 'Players the user owned.'
            ],
            'closet' => [
                'type' => Type::listOf(GraphQL::type('ClosetItem'))
            ]
        ];
    }

    protected function resolvePermissionField($root)
    {
        return [
            -1 => 'BANNED',
            0 => 'NORMAL',
            1 => 'ADMIN',
            2 => 'SUPER_ADMIN'
        ][$root->permission];
    }

    protected function resolveLastSignedAtField($root)
    {
        $last_signed_at = $root->last_signed_at;
        if ($last_signed_at instanceof Carbon) {
            return $last_signed_at->toDateTimeString();
        } else {
            return $last_signed_at;
        }
    }

    protected function resolveRegisteredAtField($root)
    {
        $registered_at = $root->registered_at;
        if ($registered_at instanceof Carbon) {
            return $registered_at->toDateTimeString();
        } else {
            return $registered_at;
        }
    }
}
