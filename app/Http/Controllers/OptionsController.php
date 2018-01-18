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

    public function score(Options $options)
    {
        $info = [
            'signAfterZero' => $options->get('sign_after_zero'),
            'signGapTime' => $options->get('sign_gap_time'),
            'perPlayer' => $options->get('score_per_player'),
            'perStorage' => (int) $options->get('score_per_storage'),
            'returnScore' => (bool) $options->get('return_score'),
            'initial' => $options->get('user_initial_score'),
            'signScore' => $options->get('sign_score'),
        ];

        return response()->json($info);
    }
}
