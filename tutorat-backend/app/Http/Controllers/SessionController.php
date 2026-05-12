<?php

namespace App\Http\Controllers;

use App\Models\SessionTutorat;
use App\Models\Profile;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'tuteur_id'     => 'required|exists:profiles,id',
            'matiere'       => 'required|string',
            'date_heure'    => 'required|date',
            'duree_minutes' => 'required|integer|min:30',
        ]);

        $tuteur = Profile::findOrFail($request->tuteur_id);

        $session = SessionTutorat::create([
            'tuteur_id'     => $request->tuteur_id,
            'eleve_id'      => $request->user()->id,
            'matiere'       => $request->matiere,
            'date_heure'    => $request->date_heure,
            'duree_minutes' => $request->duree_minutes,
            'montant'       => $tuteur->tarif_heure * ($request->duree_minutes / 60),
            'statut'        => 'en_attente',
            'lieu'          => $request->lieu ?? 'À définir',
        ]);

        return response()->json($session, 201);
    }

    public function mesSessions(Request $request)
    {
        $sessions = SessionTutorat::with('tuteur')
            ->where('eleve_id', $request->user()->id)
            ->orderByDesc('date_heure')
            ->get();

        return response()->json($sessions);
    }

    public function sessionsComeTuteur(Request $request)
{
    $profile = $request->user()->profile;

    if (!$profile) {
        return response()->json(['message' => 'Profil tuteur introuvable.'], 404);
    }

    $sessions = SessionTutorat::with(['eleve.profile'])
        ->where('tuteur_id', $profile->id)
        ->orderByDesc('date_heure')
        ->get();

    return response()->json($sessions);
}

public function updateStatut(Request $request, $id)
{
    $request->validate([
        'statut' => 'required|in:confirme,annule',
    ]);

    $profile = $request->user()->profile;
    $session = SessionTutorat::where('id', $id)
        ->where('tuteur_id', $profile->id)
        ->firstOrFail();

    $session->update(['statut' => $request->statut]);

    return response()->json($session);
}
}