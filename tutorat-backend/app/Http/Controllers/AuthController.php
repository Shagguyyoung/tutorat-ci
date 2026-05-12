<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function inscription(Request $request)
    {
        $request->validate([
            'prenom'      => 'required|string|max:100',
            'nom'         => 'required|string|max:100',
            'email'       => 'required|email|unique:users',
            'mot_de_passe' => 'required|min:8',
            'role'        => 'required|in:eleve,tuteur',
        ]);

        $user = User::create([
            'email'    => $request->email,
            'password' => Hash::make($request->mot_de_passe),
            'role'     => $request->role,
        ]);

        Profile::create([
            'user_id' => $user->id,
            'prenom'  => $request->prenom,
            'nom'     => $request->nom,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => [
                'id'    => $user->id,
                'email' => $user->email,
                'role'  => $user->role,
                'prenom' => $request->prenom,
                'nom'    => $request->nom,
            ]
        ], 201);
    }

    public function connexion(Request $request)
    {
        $request->validate([
            'email'       => 'required|email',
            'mot_de_passe' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->mot_de_passe, $user->password)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect.'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

return response()->json([
    'token' => $token,
    'user'  => [
        'id'     => $user->id,
        'email'  => $user->email,
        'role'   => $user->role,
        'prenom' => $user->profile?->prenom ?? '',
        'nom'    => $user->profile?->nom ?? '',
    ]
]);
    }

    public function deconnexion(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté avec succès.']);
    }
}