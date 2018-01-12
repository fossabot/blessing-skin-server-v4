<?php

namespace App\Models\GraphQL\Types;

use GraphQL;
use App\Models\Texture;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class TextureType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Texture',
        'description' => 'A texture',
        'model' => Texture::class
    ];

    public function fields()
    {
        return [
            'tid' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'Texture ID'
            ],
            'name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Texture name'
            ],
            'type' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Texture type. Must be one of {steve|alex|cape}.'
            ],
            'likes' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Likes count of a texture.'
            ],
            'hash' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Texture hash'
            ],
            'size' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'File size of texture. Unit is KB.'
            ],
            'uploader' => [
                'type' => GraphQL::type('User'),
                'description' => 'Entity of the uploader.'
            ],
            'public' => [
                'type' => Type::nonNull(Type::boolean()),
                'description' => 'Privacy of a texture.'
            ]
        ];
    }
}
