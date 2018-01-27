<?php

namespace App\Models\GraphQL\Mutations;

use Auth;
use GraphQL;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;

class UpdateUserProfileMutation extends Mutation
{
    protected $attributes = [
        'name' => 'updateUserProfile'
    ];

    public function type()
    {
        return GraphQL::type('User');
    }

    public function args()
    {
        return [
            'old_password' => ['name' => 'old_password', 'type' => Type::string()],
            'new_password' => ['name' => 'new_password', 'type' => Type::string()],
            'nickname' => ['name' => 'nickname', 'type' => Type::string()],
            'email' => ['name' => 'email', 'type' => Type::string()],
            'current_password' =>
                ['name' => 'current_password', 'type' => Type::string()],
        ];
    }

    public function authorize(array $args)
    {
        return Auth::check();
    }

    protected function rules(array $args = [])
    {
        return [
            'old_password' => ['required_with:new_password', 'min:6', 'max:16'],
            'new_password' => ['required_with:old_password', 'min:8', 'max:16'],
            'nickname' => ['max:16'],
            'email' => ['required_with:current_password', 'email', 'unique:users'],
            'current_password' => ['required_with:email', 'min:6', 'max:16']
        ];
    }

    public function resolve($root, $args)
    {
        $user = Auth::user();

        if (isset($args['old_password']) && isset($args['new_password'])) {
            if (app('cipher')->verify(
                $args['old_password'],
                $user->getAuthPassword()
            )) {
                $user->password = app('cipher')->hash($args['new_password']);
                $user->save();
                Auth::logout();
                return $user;
            } else {
                return new Error(-1);
            }
        } elseif (isset($args['nickname'])) {
            $user->nickname = $args['nickname'];
            $user->save();
            return $user;
        } elseif (isset($args['email']) && isset($args['current_password'])) {
            if (app('cipher')->verify(
                $args['current_password'],
                $user->getAuthPassword()
            )) {
                $user->email = $args['email'];
                $user->save();
                Auth::logout();
                return $user;
            } else {
                return new Error(-1);
            }
        } else {
            return $user;
        }
    }
}
