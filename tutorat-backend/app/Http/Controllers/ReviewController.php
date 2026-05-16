<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\SessionTutorat;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'session_id'  => 'required|exists:sessions_tutorat,id',
            'note'        => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string|max:500',
        ]);

        $session = SessionTutorat::findOrFail($request->session_id);

        // Vérifier que la séance est terminée
        if ($session->statut !== 'termine') {
            return response()->json([
                'message' => 'Vous ne pouvez noter que les séances terminées.'
            ], 403);
        }

        // Vérifier que c'est bien l'élève de la séance
        if ($session->eleve_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas noter cette séance.'
            ], 403);
        }

        // Vérifier qu'il n'y a pas déjà un avis
        if (Review::where('session_id', $session->id)->exists()) {
            return response()->json([
                'message' => 'Vous avez déjà noté cette séance.'
            ], 403);
        }

        $review = Review::create([
            'session_id' => $session->id,
            'eleve_id'   => $request->user()->id,
            'tuteur_id'  => $session->tuteur_id,
            'note'       => $request->note,
            'commentaire' => $request->commentaire,
        ]);

        return response()->json($review, 201);
    }
}