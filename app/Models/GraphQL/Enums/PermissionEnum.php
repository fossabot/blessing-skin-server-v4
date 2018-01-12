<?php

namespace App\Models\GraphQL\Enums;

use Rebing\GraphQL\Support\Type as GraphQLType;

class PermissionEnum extends GraphQLType
{
    protected $enumObject = true;

    protected $attributes = [
        'name' => 'Permission',
        'description' => 'The type of user permission.',
        'values' => [
            -1 => 'BANNED',
            0 => 'NORMAL',
            1 => 'ADMIN',
            2 => 'SUPER_ADMIN'
        ]
    ];
}
