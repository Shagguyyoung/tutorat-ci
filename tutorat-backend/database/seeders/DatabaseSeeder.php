<?php

namespace Database\Seeders;

use App\Models\Message;
use App\Models\Payment;
use App\Models\Profile;
use App\Models\Review;
use App\Models\SessionTutorat;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        $admin = User::create([
            'email'    => 'admin@tutorat.ci',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        // Tuteurs
        $tuteurs = collect([
            ['nom' => 'Koné', 'prenom' => 'Ibrahim', 'matieres' => ['Mathématiques', 'Physique'], 'quartier' => 'Cocody', 'tarif' => 5000],
            ['nom' => 'Diabaté', 'prenom' => 'Aminata', 'matieres' => ['Français', 'Histoire'], 'quartier' => 'Plateau', 'tarif' => 4000],
            ['nom' => 'Coulibaly', 'prenom' => 'Moussa', 'matieres' => ['Anglais', 'Espagnol'], 'quartier' => 'Yopougon', 'tarif' => 3500],
        ])->map(function ($data) {
            $user = User::create([
                'email'    => strtolower($data['prenom']) . '.' . strtolower($data['nom']) . '@tutorat.ci',
                'password' => Hash::make('password'),
                'role'     => 'tuteur',
            ]);

            Profile::create([
                'user_id'    => $user->id,
                'nom'        => $data['nom'],
                'prenom'     => $data['prenom'],
                'bio'        => "Tuteur expérimenté en " . implode(' et ', $data['matieres']),
                'quartier'   => $data['quartier'],
                'ville'      => 'Abidjan',
                'tarif_heure' => $data['tarif'],
                'matieres'   => $data['matieres'],
                'niveaux'    => ['Collège', 'Lycée'],
                'disponible' => true,
            ]);

            return $user;
        });

        // Élèves
        $eleves = collect([
            ['email' => 'koffi.yao@gmail.com'],
            ['email' => 'marie.aka@gmail.com'],
        ])->map(fn($data) => User::create([
            'email'    => $data['email'],
            'password' => Hash::make('password'),
            'role'     => 'eleve',
        ]));

        // Une session + paiement + avis de démo
        $tuteurProfile = $tuteurs->first()->profile;
        $eleve = $eleves->first();

        $session = SessionTutorat::create([
            'tuteur_id'     => $tuteurProfile->id,
            'eleve_id'      => $eleve->id,
            'matiere'       => 'Mathématiques',
            'date_heure'    => now()->subDays(3),
            'duree_minutes' => 60,
            'montant'       => 5000,
            'statut'        => 'termine',
            'lieu'          => 'Cocody, Abidjan',
        ]);

        Payment::create([
            'session_id' => $session->id,
            'payer_id'   => $eleve->id,
            'montant'    => 5000,
            'commission' => 500,
            'provider'   => 'cinetpay',
            'statut'     => 'reussi',
            'paid_at'    => now()->subDays(3),
        ]);

        Review::create([
            'session_id'  => $session->id,
            'eleve_id'    => $eleve->id,
            'tuteur_id'   => $tuteurProfile->id,
            'note'        => 5,
            'commentaire' => 'Excellent tuteur, très pédagogue !',
        ]);
    }
}
