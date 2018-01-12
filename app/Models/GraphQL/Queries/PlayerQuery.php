<?php

namespace App\Models\GraphQL\Queries;

use GraphQL;
use App\Models\Player;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;

class PlayerQuery extends Query
{
    protected $attributes = [
        'name' => 'players'
    ];

    public function type()
    {
        return Type::listOf(GraphQL::type('Player'));
    }

    public function args()
    {
        return [
            'pid' => ['name' => 'pid', 'type' => Type::id()],
            'uploader' => ['name' => 'uploader', 'type' => Type::int()],
            'player_name' => ['name' => 'player_name', 'type' => Type::string()],
            'preference' => ['name' => 'preference', 'type' => Type::string()],
            'steve' => ['name' => 'steve', 'type' => Type::int()],
            'alex' => ['name' => 'alex', 'type' => Type::int()],
            'cape' => ['name' => 'cape', 'type' => Type::int()]
        ];
    }

    public function resolve($root, $args)
    {
        if (isset($args['pid'])) {
            return Player::where('pid', $args['pid'])->get();
        } else if (isset($args['uploader'])) {
            return Player::where('uid', $args['uploader'])->get();
        } else if (isset($args['player_name'])) {
            return Player::where('player_name', $args['player_name'])->get();
        } else if (isset($args['preference'])) {
            return Player::where('preference', $args['preference'])->get();
        } else if (isset($args['steve'])) {
            return Player::where('tid_steve', $args['steve'])->get();
        } else if (isset($args['alex'])) {
            return Player::where('tid_alex', $args['alex'])->get();
        } else if (isset($args['cape'])) {
            return Player::where('tid_cape', $args['cape'])->get();
        } else {
            return Player::all();
        }
    }
}
