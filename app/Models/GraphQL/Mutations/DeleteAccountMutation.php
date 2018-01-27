<?php

namespace App\Models\GraphQL\Mutations;

use Auth;
use GraphQL;
use App\Models\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;

class DeleteAccountMutation extends Mutation
{
    protected $attributes = [
        'name' => 'deleteAccount'
    ];

    public function type()
    {
        return GraphQL::type('User');
    }

    public function args()
    {
        return [
            'password' => ['name' => 'password', 'type' => Type::string()]
        ];
    }

    public function authorize(array $args)
    {
        return Auth::check();
    }

    protected function rules(array $args = [])
    {
        return [
            'password' => ['required', 'min:6', 'max:16']
        ];
    }

    public function resolve($root, $args)
    {
        $user = Auth::user();

        if (!app('cipher')->verify(
            $args['password'],
            $user->getAuthPassword()
        ) || $user->permission >= User::ADMIN) {
            return $user;
        }

        try {
            $user->delete();
            return null;
        } catch (\Exception $exception) {
            return $user;
        }
    }
}
