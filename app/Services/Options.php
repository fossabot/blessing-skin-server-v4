<?php

namespace App\Services;

use DB;
use Illuminate\Support\Arr;
use Illuminate\Database\QueryException;

class Options
{
    /**
     * @var \Illuminate\Support\Collection
     */
    private $items;

    /**
     * @var \Illuminate\Support\Collection
     */
    private $modified;

    /**
     * Create a new option repository.
     *
     * @return void
     */
    public function __construct()
    {
        try {
            $options = DB::table('options')->get();
        } catch (QueryException $e) {
            $options = [];
        }
        $this->items = collect();
        $this->modified = collect();

        foreach ($options as $option) {
            $this->items->put($option->option_name, $option->option_value);
        }

    }

    /**
     * Get the specified option value.
     *
     * @param  string $key
     * @param  mixed $default
     * @param bool $raw $raw  return raw value without conversion
     * @return mixed
     */
    public function get($key, $default = null, $raw = false)
    {
        if (!$this->items->has($key) && Arr::has(config('options'), $key)) {
            $this->set($key, config("options.$key"));
        }

        $value = $this->items->get($key, $default);

        if ($raw) return $value;

        switch (strtolower($value)) {
            case 'true':
                return true;
            case 'false':
                return false;
            case 'null':
                return null;
            default:
                return $value;
                break;
        }
    }

    /**
     * Set a given option value.
     *
     * @param  array|string  $key
     * @param  mixed  $value
     * @return void
     */
    public function set($key, $value = null)
    {
        if (is_array($key)) {
            // If given key is an array
            $this->items->merge($key);
        } else {
            $this->items->put($key, $value);
        }
        $this->modified->put($key, $value);
    }

    /**
     * Do really save modified options to database.
     *
     * @return void
     */
    public function save()
    {
        try {
            $this->modified->each(function ($value, $key) {
                if (DB::table('options')->where('option_name', $key)->first()) {
                    DB::table('options')
                        ->where('option_name', $key)
                        ->update(['option_value' => $value]);
                } else {
                    DB::table('options')
                        ->insert(['option_name' => $key, 'option_value' => $value]);
                }
            });
            // clear the list
            $this->modified = collect();
        } catch (QueryException $e) {
            return;
        }
    }

    /**
     * Save all modified options into database
     */
    public function __destruct()
    {
        $this->save();
    }

}
