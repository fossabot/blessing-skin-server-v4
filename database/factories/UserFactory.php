<?php

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

$factory->define(App\Models\User::class, function (Faker $faker) {
    return [
        'nickname' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => str_random(),
        'remember_token' => null,
        'score' => random_int(0, 500),
        'avatar' => random_int(0, 50),
        'ip' => $faker->ipv4,
        'permission' => 0,
        'last_signed_at' => $faker->dateTime,
        'registered_at' => $faker->dateTime
    ];
});
