<?php

if (!function_exists('option')) {
    /**
     * @param array|string $key
     * @param mixed $default
     * @return mixed|null
     */
    function option($key, $default = null) {
        if (is_array($key)) {
            app('options')->set($key);
            return null;
        } else {
            try {
                return app('options')->get($key, $default);
            } catch (\Illuminate\Container\EntryNotFoundException $e) {
                return $default;
            }
        }
    }
}
