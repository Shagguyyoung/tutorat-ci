<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('session_id')->constrained('sessions_tutorat')->cascadeOnDelete();
            $table->foreignUuid('eleve_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('tuteur_id')->constrained('profiles')->cascadeOnDelete();
            $table->unsignedTinyInteger('note');        // 1 à 5
            $table->text('commentaire')->nullable();
            $table->boolean('visible')->default(true);  // admin peut masquer
            $table->timestamps();

            $table->unique('session_id'); // un seul avis par séance
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('from_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('to_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('session_id')->nullable()->constrained('sessions_tutorat')->nullOnDelete();
            $table->text('contenu');
            $table->boolean('lu')->default(false);
            $table->timestamp('lu_at')->nullable();
            $table->timestamps();

            $table->index(['from_id', 'to_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
        Schema::dropIfExists('reviews');
    }
};
