<?php

namespace App\Models\GraphQL\Types;

use GraphQL;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class ClosetItemType extends GraphQLType
{
    protected $attributes = [
        'name' => 'ClosetItem'
    ];

    public function fields()
    {
        return [
            'texture' => [
                'type' => GraphQL::type('Texture'),
                'description' => 'Texture entity of closet item.'
            ],
            'item_name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Name of a item in closet. It can be different from texture name.'
            ]
        ];
    }

    protected function resolveTextureField($root)
    {
        return $root;
    }

    protected function resolveItemNameField($root)
    {
        return $root->pivot->item_name;
    }
}
