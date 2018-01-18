<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Validation\UnauthorizedException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class RefreshToken extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     * @throws JWTException
     */
    public function handle($request, Closure $next)
    {
        // Check if token is existed
        $this->checkForToken($request);

        try {
            // Token is valid
            if ($this->auth->parseToken()->authenticate()) {
                return $next($request);
            }

            throw new UnauthorizedException('Unauthorized.');
        } catch (TokenExpiredException $e) {
            try {
                $token = $this->auth->refresh();
                Auth::onceUsingId(
                    $this
                        ->auth
                        ->manager()
                        ->getPayloadFactory()
                        ->buildClaimsCollection()
                        ->toPlainArray()['sub']
                );
            } catch (JWTException $e) {
                throw new UnauthorizedException('Token has expired. Please re-login.');
            }
        }

        $response = $next($request);
        $response->headers->set('Access-Control-Expose-Headers', 'Authorization');
        return $this->setAuthenticationHeader($response, $token);
    }
}
