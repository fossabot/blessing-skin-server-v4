<?php

namespace App\Models\GraphQL\Queries;

use GraphQL;
use App\Models\Texture;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;

class TextureQuery extends Query
{
    protected $attributes = [
        'name' => 'textures'
    ];

    public function type()
    {
        return Type::listOf(GraphQL::type('Texture'));
    }

    public function args()
    {
        return [
            'tid' => ['name' => 'tid', 'type' => Type::id()],
            'name' => ['name' => 'name', 'type' => Type::string()],
            'type' => ['name' => 'type', 'type' => Type::string()],
            'likes' => ['name' => 'likes', 'type' => Type::int()],
            'hash' => ['name' => 'hash', 'type' => Type::string()],
            'size' => ['name' => 'size', 'type' => Type::int()],
            'uploader' => ['name' => 'uploader', 'type' => Type::int()]
        ];
    }

    public function resolve($root, $args)
    {
        if (isset($args['tid'])) {
            return Texture::where('tid', $args['tid'])->get();
        } else if (isset($args['name'])) {
            return Texture::where('name', $args['name'])->get();
        } else if (isset($args['type'])) {
            return Texture::where('type', $args['type'])->get();
        } else if (isset($args['likes'])) {
            return Texture::where('likes', $args['likes'])->get();
        } else if (isset($args['hash'])) {
            return Texture::where('hash', $args['hash'])->get();
        } else if (isset($args['size'])) {
            return Texture::where('size', $args['size'])->get();
        } else if (isset($args['uploader'])) {
            return Texture::where('uploader_id', $args['uploader'])->get();
        } else {
            return Texture::all();
        }
    }
}
