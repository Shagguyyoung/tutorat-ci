<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('session_id')->constrained('sessions_tutorat')->cascadeOnDelete();
            $table->foreignUuid('payer_id')->constrained('users')->cascadeOnDelete();
            $table->decimal('montant', 10, 0);
            $table->decimal('commission', 10, 0)->default(0); // part de la plateforme
            $table->string('devise', 3)->default('XOF');
            $table->enum('provider', ['cinetpay', 'fedapay', 'orange_money', 'mtn_momo']);
            $table->string('provider_transaction_id')->nullable()->unique(); // ID retourné par le provider
            $table->enum('statut', ['en_attente', 'reussi', 'echoue', 'rembourse'])->default('en_attente');
            $table->json('provider_response')->nullable(); // réponse brute du provider
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
