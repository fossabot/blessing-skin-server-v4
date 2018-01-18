<?php

namespace App\Models\GraphQL\Mutations;

use Auth;
use GraphQL;
use Carbon\Carbon;
use Rebing\GraphQL\Support\Mutation;

class UserSignMutation extends Mutation
{
    protected $attributes = [
        'name' => 'UserSign'
    ];

    public function type()
    {
        return GraphQL::type('User');
    }

    public function authorize(array $args)
    {
        return Auth::check();
    }

    public function resolve()
    {
        $user = Auth::user();

        $lastSign = Carbon::parse($user->last_signed_at)->setTimezone('Asia/Shanghai');
        $now = Carbon::now();
        if ($this->signRemainingTime($lastSign) <= 0) {
            $user->last_signed_at = $now->setTimezone('Asia/Shanghai')->toDateTimeString();
            $scoreLimits = explode(',', option('sign_score'));
            $attainedScore = rand($scoreLimits[0], $scoreLimits[1]);
            $user->score += $attainedScore;
            $user->save();
        }

        return $user;
    }

    /**
     * Get remaining time before next signing is available.
     *
     * @param Carbon $lastSignTime
     * @return int Time in seconds.
     */
    private function signRemainingTime($lastSignTime)
    {
        if (option('sign_after_zero')) {
            return Carbon::now()->diffInSeconds(
                ($lastSignTime <= Carbon::today()
                    ? $lastSignTime
                    : Carbon::tomorrow()),
                false
            );
        }

        return Carbon::now()->diffInSeconds(
            $lastSignTime->addSeconds(option('sign_gap_time') * 3600),
            false
        );
    }
}
