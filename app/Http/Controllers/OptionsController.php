<?php

namespace App\Http\Controllers;

use App\Services\Options;
use Illuminate\Http\Request;

class OptionsController extends Controller
{
    public function announcement(Options $options)
    {
        return response($options->get('announcement'));
    }
}
