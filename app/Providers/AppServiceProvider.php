<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     * @throws \Exception
     */
    public function register()
    {
        $className = 'App\Services\Cipher\\'.config('auth.cipher');

        if (class_exists($className)) {
            $this->app->singleton('cipher', $className);
        } else {
            throw new \Exception(sprintf(
                "No such encrypt method: [%s], please check your .env configuration.",
                config('secure.cipher')
            ));
        }

        $this->app->singleton('options', 'App\Services\Options');
    }
}
