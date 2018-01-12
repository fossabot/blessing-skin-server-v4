<?php

namespace App\Models\GraphQL\Types;

use GraphQL;
use Carbon\Carbon;
use App\Models\Player;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class PlayerType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Player',
        'description' => 'A player',
        'model' => Player::class
    ];

    public function fields()
    {
        return [
            'pid' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'Player ID'
            ],
            'owner' => [
                'type' => GraphQL::type('User'),
                'description' => 'Entity of the owner.'
            ],
            'player_name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Player name'
            ],
            'preference' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Preference of the player. It should be "default" or "slim".'
            ],
            'steve' => [
                'type' => GraphQL::type('Texture'),
                'description' => 'Texture of "default" preference.'
            ],
            'alex' => [
                'type' => GraphQL::type('Texture'),
                'description' => 'Texture of "slim" preference.'
            ],
            'cape' => [
                'type' => GraphQL::type('Texture'),
                'description' => 'Texture of cape.'
            ],
            'last_modified' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Time of last modified.'
            ]
        ];
    }

    public function resolveLastModifiedField($root)
    {
        $last_modified = $root->last_modified;
        if ($last_modified instanceof Carbon) {
            return $last_modified->toDateTimeString();
        } else {
            return $last_modified;
        }
    }
}
