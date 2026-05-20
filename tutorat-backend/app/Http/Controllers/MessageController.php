<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // Liste des conversations de l'utilisateur connecté
    public function conversations(Request $request)
    {
        $userId = $request->user()->id;

        $conversations = Message::where('from_id', $userId)
            ->orWhere('to_id', $userId)
            ->with(['expediteur.profile', 'destinataire.profile'])
            ->orderByDesc('created_at')
            ->get()
            ->groupBy(function ($message) use ($userId) {
                return $message->from_id === $userId
                    ? $message->to_id
                    : $message->from_id;
            })
            ->map(function ($messages) {
                return $messages->first();
            })
            ->values();

        return response()->json($conversations);
    }

    // Messages entre deux utilisateurs
    public function messages(Request $request, $userId)
    {
        $moi = $request->user()->id;

        $messages = Message::where(function ($q) use ($moi, $userId) {
                $q->where('from_id', $moi)->where('to_id', $userId);
            })
            ->orWhere(function ($q) use ($moi, $userId) {
                $q->where('from_id', $userId)->where('to_id', $moi);
            })
            ->with(['expediteur.profile', 'destinataire.profile'])
            ->orderBy('created_at')
            ->get();

        // Marquer les messages reçus comme lus
        Message::where('from_id', $userId)
            ->where('to_id', $moi)
            ->where('lu', false)
            ->update(['lu' => true, 'lu_at' => now()]);

        return response()->json($messages);
    }

    // Envoyer un message
    public function envoyer(Request $request)
    {
        $request->validate([
            'to_id'   => 'required|exists:users,id',
            'contenu' => 'required|string|max:1000',
        ]);

        $message = Message::create([
            'from_id'    => $request->user()->id,
            'to_id'      => $request->to_id,
            'contenu'    => $request->contenu,
            'session_id' => $request->session_id ?? null,
        ]);

        $message->load(['expediteur.profile', 'destinataire.profile']);

        return response()->json($message, 201);
    }

    // Nombre de messages non lus
    public function nonLus(Request $request)
    {
        $count = Message::where('to_id', $request->user()->id)
            ->where('lu', false)
            ->count();

        return response()->json(['count' => $count]);
    }
}