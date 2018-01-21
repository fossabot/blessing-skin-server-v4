<?php

use App\Models\User;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'nickname' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => app('cipher')->hash(str_random(10)),
        'remember_token' => null,
        'score' => random_int(0, 500),
        'avatar' => random_int(0, 50),
        'ip' => $faker->ipv4,
        'permission' => 0,
        'last_signed_at' => $faker->dateTime,
        'registered_at' => $faker->dateTime
    ];
});

$factory->state(User::class, 'admin', function (Faker $faker) {
    return [
        'nickname' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => app('cipher')->hash(str_random(10)),
        'remember_token' => null,
        'score' => random_int(0, 500),
        'avatar' => random_int(0, 50),
        'ip' => $faker->ipv4,
        'permission' => 1,
        'last_signed_at' => $faker->dateTime,
        'registered_at' => $faker->dateTime
    ];
});

$factory->state(User::class, 'superAdmin', function (Faker $faker) {
    return [
        'nickname' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => app('cipher')->hash(str_random(10)),
        'remember_token' => null,
        'score' => random_int(0, 500),
        'avatar' => random_int(0, 50),
        'ip' => $faker->ipv4,
        'permission' => 2,
        'last_signed_at' => $faker->dateTime,
        'registered_at' => $faker->dateTime
    ];
});

$factory->state(User::class, 'banned', function (Faker $faker) {
    return [
        'nickname' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => app('cipher')->hash(str_random(10)),
        'remember_token' => null,
        'score' => random_int(0, 500),
        'avatar' => random_int(0, 50),
        'ip' => $faker->ipv4,
        'permission' => -1,
        'last_signed_at' => $faker->dateTime,
        'registered_at' => $faker->dateTime
    ];
});
