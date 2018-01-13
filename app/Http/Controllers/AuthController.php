<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\ThrottlesLogins;

class AuthController extends Controller
{
    use ThrottlesLogins;

    /*
     * Please DO NOT remove this method. It will be used for some traits.
     */
    public function username()
    {
        return 'email';
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'identification' => 'required',
            'password' => 'required|max:64'
        ]);

        $credentials = $request->only(['identification', 'password']);
        $isEmail = !validator($credentials, ['identification' => 'email'])->fails();

        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        $user = $isEmail
            ? User::where('email', $credentials['identification'])->first()
            : Player::where('player_name', $credentials['identification'])
                ->first()->owner;

        if (app('cipher')->verify($credentials['password'], $user->password)) {
            $this->clearLoginAttempts($request);

            return response()->json(['code' => 0, 'token' => Auth::login($user)], 201);
        }

        $this->incrementLoginAttempts($request);
        return response()->json(['code' => -1], 400);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json(['code' => 0]);
    }
}
