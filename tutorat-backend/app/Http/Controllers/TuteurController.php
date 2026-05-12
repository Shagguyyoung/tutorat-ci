<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class TuteurController extends Controller
{
    public function index(Request $request)
    {
        $query = Profile::with('user')
            ->whereHas('user', fn($q) => $q->where('role', 'tuteur'));

        if ($request->matiere) {
            $query->whereJsonContains('matieres', $request->matiere);
        }
        if ($request->quartier) {
            $query->where('quartier', $request->quartier);
        }
        if ($request->tarif_max) {
            $query->where('tarif_heure', '<=', $request->tarif_max);
        }

        return response()->json($query->orderByDesc('note_moyenne')->get());
    }

        public function show($id)
    {
        $profile = Profile::with(['user', 'reviews.eleve.profile'])->findOrFail($id);
        return response()->json($profile);
    }
}