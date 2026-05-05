<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->string('nom');
            $table->string('prenom');
            $table->string('telephone', 20)->nullable();
            $table->string('photo_url')->nullable();
            $table->text('bio')->nullable();
            $table->string('quartier')->nullable();
            $table->string('ville')->default('Abidjan');
            // Tuteur uniquement
            $table->decimal('tarif_heure', 8, 0)->nullable();
            $table->json('matieres')->nullable();   // ex: ["Maths", "Physique"]
            $table->json('niveaux')->nullable();    // ex: ["Lycée", "Université"]
            $table->decimal('note_moyenne', 3, 2)->default(0.00);
            $table->unsignedInteger('nb_avis')->default(0);
            $table->unsignedInteger('nb_seances')->default(0);
            $table->boolean('disponible')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
