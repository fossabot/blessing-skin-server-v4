<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAllTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('uid');
            $table->string('nickname')->default('');
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('score')->default(0);
            $table->integer('avatar')->default(0);
            $table->ipAddress('ip');
            $table->integer('permission')->default(0);
            $table->rememberToken();
            $table->timestamp('last_signed_at');
            $table->timestamp('registered_at');
        });

        Schema::create('players', function (Blueprint $table) {
            $table->increments('pid');
            $table->integer('uid');
            $table->string('player_name')->unique();
            $table->string('preference')->default('default');
            $table->integer('tid_steve')->default(0);
            $table->integer('tid_alex')->default(0);
            $table->integer('tid_cape')->default(0);
            $table->timestamp('last_modified');
        });

        Schema::create('textures', function (Blueprint $table) {
            $table->increments('tid');
            $table->string('name');
            $table->string('type');
            $table->integer('likes')->default(0);
            $table->string('hash');
            $table->integer('size');
            $table->integer('uploader_id');
            $table->boolean('public')->default(true);
            $table->timestamp('uploaded_at');
        });

        Schema::create('closets', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('uid');
            $table->integer('tid');
            $table->string('item_name');
        });

        Schema::create('options', function (Blueprint $table) {
            $table->increments('id');
            $table->string('option_name');
            $table->longText('option_value');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
