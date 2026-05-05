<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sessions_tutorat', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tuteur_id')->constrained('profiles')->cascadeOnDelete();
            $table->foreignUuid('eleve_id')->constrained('users')->cascadeOnDelete();
            $table->string('matiere');
            $table->timestamp('date_heure');
            $table->unsignedInteger('duree_minutes')->default(60);
            $table->decimal('montant', 10, 0);
            $table->enum('statut', [
                'en_attente',   // demande envoyée par l'élève
                'confirme',     // tuteur accepte
                'annule',       // annulé par l'une des parties
                'termine',      // séance terminée
                'litige',       // problème signalé
            ])->default('en_attente');
            $table->string('lieu')->nullable();         // adresse ou "en ligne"
            $table->text('notes_eleve')->nullable();    // instructions de l'élève
            $table->text('notes_tuteur')->nullable();   // retour du tuteur après séance
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions_tutorat');
    }
};
